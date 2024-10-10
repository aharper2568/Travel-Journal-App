const GraphQLUpload = require('graphql-upload/GraphQLUpload.js');
const { User, Entry } = require('../models');
const { signToken } = require('../utils/auth');
const cloudinary = require('../config/cloudinary');
const { finished } = require('node:stream');
const { promisify } = require('util');
const path = require('path');

const finish = promisify(finished);

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    searchUsers: async (_parent, args) => {
      const search = args.term;
      const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
      const searchRgx = rgx(search);
      return User.find({
        $or: [
          {
            email: {
              $regex: searchRgx,
              $options: "i",
            },
          },
          {
            username: {
              $regex: searchRgx,
              $options: "i",
            },
          },
        ],
      });
    },
    users: async () => {
      return User.find().populate("entries");
    },
    user: async (_, args) => {
      return User.findOne({ _id: args.id }).populate("entries");
    },
    me: async (_, _args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new Error("You need to be logged in!");
    },
    entries: async () => {
      return Entry.find({}).populate("author");
    },
    entry: async (_, { entryId }) => {
      return Entry.findById(entryId).populate("author");
    },
  },

  Mutation: {
    addUser: async (_, args) => {
      const user = await User.create({
        ...args,
        isAdmin: args.isAdmin || false,
      });
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, username, password }) => {
      const user = await User.findOne(email ? { email } : { username });

      if (!user) {
        throw new Error("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new Error("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addEntry: async (
      _,
      { title, location, date, picture, content },
      context
    ) => {
      if (context.user) {
        const entry = await Entry.create({
          title,
          location,
          date,
          picture,
          content,
          author: context.user._id,
        });
        await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { entries: entry._id } },
          { new: true }
        ).populate("entries");
        console.log("entry submitted");
        return entry;
      }
    },
    removeEntry: async (_, { entryId }, context) => {
      if (!context.user) {
        throw new Error("You need to be logged in to remove an entry!");
      }

      const entry = await Entry.findById(entryId);
      if (!entry) {
        throw new Error("No entry found with this ID.");
      }

      if (context.user.isAdmin || entry.author.equals(context.user._id)) {
        await Entry.findByIdAndDelete(entryId);

        await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { entries: entryId } },
          { new: true }
        );

        return entry;
      } else {
        throw new Error("You are not authorized to remove this entry.");
      }
    },
    removeUser: async (_, { _id }, context) => {
      if (!context.user) {
        throw new Error(
          "You need to be logged in and an admin to remove a user!"
        );
      }

      try {
        const user = await User.findByIdAndDelete(_id);

        if (!user) {
          throw new Error("No user found with this ID.");
        }

        return user;
      } catch (error) {
        throw new Error("Failed to remove user. Please try again.");
      }
    },
    uploadImage: async (_, { id, image }, context) => {
      const { filename, createReadStream } = await image;
      console.log(`Uploading ${filename}...`);
      const stream = createReadStream();
      // Promisify the stream and store the file, then…
      const newImage = { id, filename };

      console.log('DIRNAME', __dirname);

      const dest = path.resolve(__dirname, '..', 'uploads', 'temp-image');

      const out = require('fs').createWriteStream(dest);

      stream.pipe(out);
      await finish(out);

      const result = await cloudinary.uploader
        .upload(dest, {
          folder: 'journal-images',
          unique_filename: true,
        })
        .catch((error) => {
          console.log(error);
        });

      console.log(result);

      return newImage;
    },
    updateEntry: async (
      _,
      { entryId, title, location, date, picture, content },
      context
    ) => {
      if (!context.user) {
        throw new Error("You need to be logged in to update an entry!");
      }

      const entry = await Entry.findById(entryId);
      if (!entry) {
        throw new Error("No entry found with this ID.");
      }

      if (!entry.author.equals(context.user._id) && !context.user.isAdmin) {
        throw new Error("You are not authorized to update this entry.");
      }

      const updatedEntry = await Entry.findByIdAndUpdate(
        entryId,
        { title, location, date, picture, content },
        { new: true }
      ).populate("author");

      return updatedEntry;
    },
  },
};

module.exports = resolvers;
