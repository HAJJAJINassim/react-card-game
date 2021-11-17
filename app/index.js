var express = require('express')
var socket = require('socket.io')
const cors = require('cors')
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const Player = require('./models/player');
const { createPlayer, getPlayers, editPlayer } = require('./controllers/playerController');
const { createGame, checkCards, updateTimer, getGame } = require('./controllers/gameController');
dotenv.config({ path: './.env' });

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('We are connected to db');
  });
/*
const playersRouter = require('./routes/playerRoute');
const gamesRouter = require('./routes/gameRoute');
const toursRouter = require('./routes/tourRoute');
*/
var app = express()
app.use(cors())
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }
app.get('/', (req, res) => {
    res.send({ok:'ok'})
})

const port = process.env.PORT || 3000;
//console.log(port)

var server = app.listen(port,() => {
    console.log('listening on '+port)
})

var io = socket(server,{
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})



const beggin = new Date()
const end    = new Date(beggin.getTime() + 1*60000);
const cards =  [
  { name: "A-P.jpg" },
  { name: "J-P.jpg" },
  { name: "10-P.jpg" },
  { name: "K-P.jpg" },
  { name: "Q-P.jpg" },
  { name: "A-P.jpg" },
  { name: "J-P.jpg" },
  { name: "10-P.jpg" },
  { name: "K-P.jpg" },
  { name: "Q-P.jpg" }
]


io.on('connection', (socket) => {
    socket.on('player',async (data)=> {
      console.log(data)
      try {
        // test if there is a user who wants to play
        const players = await getPlayers({flag: 'ready'})
        if(!players.length) {
          socket.emit('newPlayer', { player: await createPlayer({...data, flag: 'ready'})})
        } else {
          if(!players.find(v => v.name == data.name)){
            const player2 = await createPlayer({...data, flag: 'playing'})
            socket.emit('newPlayer', { player: player2 })
            const player1 = await editPlayer(players[0]._id, {flag: 'playing'})
            const game = await createGame({players: [player1._id, player2._id], cards: cards.sort(() => Math.random() - 0.5)})
            io.sockets.emit('newGame', { game })
          }   

        }
        // if true create a game
        // else wait until another user appairs
      } catch(e){
        console.log()
        socket.emit('oops', {error: e})
      }
    })
    socket.on('oops', (error) => {
      console.log('*-*-*-*-*')
      console.log(error)
      console.log('*-*-*-*-*')
    })
    socket.on('play', (data) => {
        let now = new Date()
        if(now <end && now > beggin) {
            console.log(now.getSeconds())
            console.log(beggin.getSeconds())
            let second = now.getSeconds()*1 - beggin.getSeconds()*1 
            console.log(second)
            console.log((Math.trunc(second/5)+1)%2)
          }
        console.log('------------')
        socket.emit('played', {data: 'data'})
    })
    socket.on('test', async (data) => {
      const newGame = await checkCards(data.game, data.choiceOne, data.choiceTwo)
      if(newGame) {
        io.sockets.emit('newGame', { game: newGame })
      }
    })
    socket.on('getgame', async (data) => {
      const game = await getGame(data.game, data.player)
      // if (game) io.sockets.emit('newGame',{game})
    })
})