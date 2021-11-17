const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'A game must have players'],
  }, 
  matched: {
    type: Boolean,
    require: [true, 'A game must have status'],
    default: false
  },
});

const gameSchema = new mongoose.Schema({
  players: {
    type: [String],
    require: [true, 'A game must have players']
  }, 
  start: {
    type: Date,
    default: Date.now()
  },
  end: {
    type: Date,
    default: new Date(new Date().getTime() + 1*60000)
  },
  cards: [cardSchema],
  time: {
    type: Number,
    default: 60
  }
});
const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
