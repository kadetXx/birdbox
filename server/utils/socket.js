class SocketHandler {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
  }

  joinRoom({ botName, game }, username, room) {
    const user = game.userJoin(this.socket.id, username, room);
    this.socket.join(user.room);

    // send message to single user
    this.socket.emit(
      "message",
      game.formatMsg(botName, `Welcome ${user.username}`, "left")
    );

    // send message to all other users
    this.socket.broadcast
      .to(user.room)
      .emit(
        "message",
        game.formatMsg(botName, `${user.username} has joined`, "left")
      );

    // send room users info
    this.io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: game.getRoomUsers(user.room),
    });
  }

  newChat({ botName, game }, msg) {
    let user = game.getCurrentUser(this.socket.id);

    if (!user) {
      this.socket.emit(
        "message",
        game.formatMsg(botName, "Please reload 🙂", "left")
      );
      this.socket.emit("reload", "An error occured");
    } else {
      let user = game.getCurrentUser(this.socket.id);
      this.socket.emit(
        "message",
        game.formatMsg(`${user.username}`, msg, "right")
      );
      this.socket.broadcast
        .to(user.room)
        .emit("message", game.formatMsg(`${user.username}`, msg, "left"));
    }
  }

  playerTurn({botName, game}, move) {

    let user = game.getCurrentUser(this,socket.id);

    //check if the server restarted
    if (!user) {
      this.socket.emit("reload", "An error occured");
    } else {
      let users = game.getRoomUsers(user.room);

      //check if there is a second player to start game
      if (user.id == users[0].id && users[1]) {
        this.socket.emit(
          "changeTurn",
          game.changeTurn(users[1].username, "disable")
        );
        this.socket.broadcast
          .to(user.room)
          .emit("changeTurn", game.changeTurn(users[1].username, "enable"));

        this.io.to(user.room).emit("entry", [move, "X"]);
      } else if (users[1] && user.id == users[1].id) {
        this.socket.emit(
          "changeTurn",
          game.changeTurn(users[0].username, "disable")
        );
        this.socket.broadcast
          .to(user.room)
          .emit("changeTurn", game.changeTurn(users[1].username, "enable"));
        this.io.to(user.room).emit("entry", [move, "O"]);
      } else if (!users[1]) {
        this.socket.emit(
          "message",
          game.formatMsg(
            botName,
            "Hang on, someone will join soon 😇😇",
            "left"
          )
        );
      } else {
        this.socket.emit(
          "message",
          game.formatMsg(botName, "Hand's off, you are spectating", "left")
        );
      }
    }
  }

  updatePlayerMove({game}, combinations) {

    let user = game.getCurrentUser(this.socket.id);
    let users = game.getRoomUsers(user.room);

    if (
      user.username == users[0].username ||
      user.username == users[1].username
    ) {
      this.io.to(user.room).emit("state-change", [...combinations]);
    }
  }

  endGame({game}) {

    let user = game.getCurrentUser(socket.id);
    // let users = game.getRoomUsers(user.room);

    this.io.to(user.room).emit("state-change", resetBoard);
    this.io.to(user.room).emit("gameOver", `${data} reload to play again`);
    this.io.to(user.room).emit("changeTurn", game.changeTurn("", "disable"));
  }

  handleDisconnection({botName, connectedUsers, game}) {

    connectedUsers = connectedUsers - 1;
    const user = game.userLeaves(this.socket.id);

    if (user) {
      //notify members of leave
      this.io.to(user.room).emit(
        "message",
        game.formatMsg(botName, `${user.username} just left`, "left")
      );

      // send room users info
      this.io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: game.getRoomUsers(user.room),
      });
    }
  }
}

module.exports = SocketHandler;
