const Player = require('../models/player')

exports.getPlayers = async (query) => {
  try {
    const players = await Player.find(query).sort();
    return players
  } catch(e){
    throw new Error('get players')
  }
}


exports.createPlayer = async (dataplayer) => {
    try {
        const newPlayer = await Player.create(dataplayer);
        return newPlayer
        /* res.status(201).json({
          status: 'success',
          data: {
            player: newPlayer
          }
        }); */
      } catch (err) {
        throw new Error('create player')
      }
}

exports.editPlayer = async (id,data) => {
  try {
    const editedPlayer = await Player.findByIdAndUpdate(id, data, {
      new: true
    });
    return editedPlayer
  } catch (e) {
    throw new Error('edit player')
  }
}