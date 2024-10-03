const { Schema, model, Types } = require('mongoose');
const bcrypt = require('bcrypt');

const entrySchema = new Schema(
    {
        author: {
            type: Types.ObjectId,
            ref: 'User',
        },
        title: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        picture: {
            type: String,
        },
        content: {
            type: String,
            required: true,
        },
    })
    const Entry = model('Entry', entrySchema);

    module.exports = Entry;