const mongoose = require('mongoose');

const playerschema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'A player must have a name'],
    trim: true,
    unique: true
  },
  flag: {
    type: String,
    default: 'none'
  },
  time: {
    type: Number,
    default: 60 
  },
  isplaying: {
    type: Boolean,
    default: false,
  }
});
const Player = mongoose.model('Player', playerschema);
module.exports = Player;
