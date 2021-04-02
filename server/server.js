// setup server

const http = require("http");
const express = require("express");
const path = require("path");
const socketio = require("socket.io");
const manager = require("./utils/manager");
const socketHandler = require("./utils/socket");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

let connectedUsers = 0;

const bot = {
  id: 0,
  username: "Parrot (bot)",
  gender: "bot",
  admin: false,
};

// run when client connects
io.on("connection", (socket) => {
  connectedUsers++;

  const handler = new socketHandler(io, socket, manager, bot);

  // join room
  socket.on("joinRoom", (data) => {
    handler.joinRoom({...data});
  });

  // listen for chat message
  socket.on("chatMessage", (msg) => {
    handler.newChat(msg);
  });

  // handle disconnection
  socket.on("disconnect", () => {
    handler.handleDisconnection(connectedUsers);
  });
});

// set static folder
app.use(express.static(path.join(__dirname, "./public")));

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
