// setup server

const http = require('http');
const express = require('express'); 
const path = require('path');
const socketio = require('socket.io'); 
const game = require('./game');
const socketHandler = require('./socket');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

let botName = 'GameBot'
let connectedUsers = 0;

let resetBoard = [
  '','','',
  '','','',
  '','',''
]

// run when client connects
io.on('connection', socket => {
  connectedUsers++
  console.log(`Connected Users: ${connectedUsers}`);

  const handler = new socketHandler(io, socket);
  let handlerParams = {
    botName, 
    game,
    connectedUsers, 
    resetBoard
  }

  // join room
  socket.on('joinRoom', ({username, room}) => {
    handler.joinRoom({...handlerParams}, username, room);
  })

  // listen for chat message
  socket.on('chatMessage', msg => {
    handler.newChat({...handlerParams}, msg)
  })


  //call turn function 
  socket.on('entry', move => {

    handler.playerTurn({...handlerParams}, move)
    
  })

  // update player move
  socket.on('state-change', combinations => {
    handler.updatePlayerMove({...handlerParams}, combinations)
  })

  //game over
  socket.on('gameOver', data => {

    handler.endGame({...handlerParams}, data);
  })
  
  // handle disconnection
  socket.on('disconnect', () => {
    handler.handleDisconnection({...handlerParams});
  })
})

// set static folder 
app.use(express.static(path.join(__dirname, '../client')))

const PORT = process.env.PORT || 3000 ;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})