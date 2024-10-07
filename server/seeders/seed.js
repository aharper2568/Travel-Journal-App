const db = require('../config/connection');
const { User, Entry } = require('../models');
const userSeeds = require('./userSeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await Entry.deleteMany({})
    // await User.create(userSeeds);

    for (let user of userSeeds) {
      const createdUser = await User.create(user);
      if (user.entries) {
        for (let entry of user.entries) {
          await Entry.create({...entry, author: createdUser._id});
        }
      }
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  process.exit(0);
});
