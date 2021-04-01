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
    this.socket.emit(
      "message",
      game.formatMsg(`${user.username}`, msg, "right")
    );
    this.socket.broadcast
      .to(user.room)
      .emit("message", game.formatMsg(`${user.username}`, msg, "left"));
  }

  handleDisconnection({ botName, connectedUsers, game }) {
    connectedUsers = connectedUsers - 1;
    const user = game.userLeaves(this.socket.id);

    if (user) {
      //notify members of leave
      this.io
        .to(user.room)
        .emit(
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
