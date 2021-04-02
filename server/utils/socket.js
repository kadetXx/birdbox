class SocketHandler {
  constructor(io, socket, helper, botName) {
    this.io = io;
    this.socket = socket;
    this.helper = helper;
    this.botName = botName;
  }

  joinRoom(username, room) {
    const user = this.helper.userJoin(this.socket.id, username, room);
    this.socket.join(user.room);

    // send message to single user
    this.socket.emit(
      "message",
      this.helper.formatMsg(this.botName, `Welcome ${user.username}`, "left")
    );

    // send message to all other users
    this.socket.broadcast
      .to(user.room)
      .emit(
        "message",
        this.helper.formatMsg(this.botName, `${user.username} has joined`, "left")
      );

    // send room users info
    this.io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: this.helper.getRoomUsers(user.room),
    });
  }

  newChat(msg) {
    let user = this.helper.getCurrentUser(this.socket.id);
    this.socket.emit(
      "message",
      this.helper.formatMsg(`${user.username}`, msg, "right")
    );
    this.socket.broadcast
      .to(user.room)
      .emit("message", this.helper.formatMsg(`${user.username}`, msg, "left"));
  }

  handleDisconnection(connectedUsers) {
    connectedUsers = connectedUsers - 1;
    const user = this.helper.userLeaves(this.socket.id);

    if (user) {
      //notify members of leave
      this.io
        .to(user.room)
        .emit(
          "message",
          this.helper.formatMsg(this.botName, `${user.username} just left`, "left")
        );

      // send room users info
      this.io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: this.helper.getRoomUsers(user.room),
      });
    }
  }
}

module.exports = SocketHandler;
