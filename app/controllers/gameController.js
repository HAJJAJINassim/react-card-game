const Game = require("../models/game");
const Player = require("../models/player");


exports.getGame =  async (game, player) => {
  try {
    const retrivedplayer = await Player.findOne({_id: player})
    const retrivedGame = await Game.findOne({_id: game})
    if(retrivedplayer.id == retrivedGame.players[0]){
      retrivedplayer.time = retrivedplayer.time -1
    await Player.findOneAndUpdate({_id: player},{time: retrivedplayer.time}, { new: true })
    const updatedGame = await Game.findOneAndUpdate({_id: game},{time: retrivedplayer.time}, { new: true })
    return updatedGame
    } else {
      return null
    }
    
  } catch(err) {
    console.log(err)
  }
}


exports.createGame = async (dataGame) => {
    try {
        const newGame = await Game.create(dataGame);
        /* res.status(201).json({
          status: 'success',
          data: {
            player: newPlayer
          }
        }); */
        return newGame
      } catch (err) {
        /* res.status(400).send({
          status: 'fail',
          message: err
        }); */
      }
}

exports.checkCards = async (game, card1, card2) => {
  try {
      console.log('game id', game)
      const retrivedGame = await Game.findOne({_id: game});
      const cards = retrivedGame.cards.filter(card => card.name === card1 && card.name === card2 )
      if (cards.length === 2 ) {
          for(const card of retrivedGame.cards) {
            if (card.name == card1)
              card.matched = true
          }
          const newGame = await Game.findByIdAndUpdate(game, { cards: retrivedGame.cards }, {
            new: true
          });
          console.log(newGame.cards)
          return newGame
      } else {
        return null
      }
    
    } catch (err) {
      return null
    }
}

exports.updateTimer = async (game, time) => {
  Game.findOneAndUpdate(game,{time})
}