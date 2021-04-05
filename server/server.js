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

const bot = {
  id: 0,
  username: "Parrot (bot)",
  gender: "bot",
  admin: false,
  online: true
};

// run when client connects
io.on("connection", (socket) => {

  const handler = new socketHandler(io, socket, manager, bot);

  // join Space
  socket.on("joinSpace", (data) => {
    handler.joinSpace({...data});
  });

  // listen for chat message
  socket.on("chatMessage", (msg) => {
    handler.newChat(msg);
  });

  // handle disconnection
  socket.on("disconnect", () => {
    handler.handleDisconnection();
  });

  // handle leave space
  socket.on("leaveSpace", (user) => {
    handler.handleLeave(user)
  })
});

// set static folder
app.use(express.static(path.join(__dirname, "./public")));

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
