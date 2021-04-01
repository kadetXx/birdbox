// setup server

const http = require('http');
const express = require('express'); 
const path = require('path');
const socketio = require('socket.io'); 
const helper = require('./helper');
const socketHandler = require('./socket');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

let botName = 'Parrot (bot)'
let connectedUsers = 0;

// run when client connects
io.on('connection', socket => {
  connectedUsers++
  console.log(`Connected Users: ${connectedUsers}`);

  const handler = new socketHandler(io, socket, helper, botName);

  // join room
  socket.on('joinRoom', ({username, room}) => {
    handler.joinRoom({...handlerParams}, username, room);
  })

  // listen for chat message
  socket.on('chatMessage', msg => {
    handler.newChat({...handlerParams}, msg)
  })
  
  // handle disconnection
  socket.on('disconnect', () => {
    handler.handleDisconnection({...handlerParams});
  })
})

// set static folder 
// app.use(express.static(path.join(__dirname, '../client')));

const PORT = process.env.PORT || 4000 ;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})