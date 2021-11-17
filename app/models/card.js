const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'A card must have a name'],
    unique: true
  }
});
const Card = mongoose.model('Card', cardSchema);
module.exports = Card;
