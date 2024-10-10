const { Schema, model, Types } = require('mongoose');

const imageSchema = new Schema({
  filename: {
    type: String
  }
});

const Image = model('Image', imageSchema);

module.exports = Image;
