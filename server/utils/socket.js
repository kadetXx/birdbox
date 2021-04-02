class SocketHandler {
  constructor(io, socket, helper, bot) {
    this.io = io;
    this.socket = socket;
    this.helper = helper;
    this.bot = bot;
  }

  joinRoom(newUser) {

    const user = this.helper.userJoin(newUser);

    this.socket.join(user.room);

    // send message to single user
    this.socket.emit(
      "message",
      this.helper.formatMsg(this.bot, `Welcome ${user.username}`, "message__left", false)
    );

    // send message to all other users
    this.socket.broadcast
      .to(user.room)
      .emit(
        "message",
        this.helper.formatMsg(this.bot, `${user.username} has joined`, "left", true)
      );

    // send room users info
    this.io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: this.helper.getRoomUsers(user.room),
    }); 
  }

  newChat(msg) {
    let user = this.helper.getCurrentUser(msg.id);
    console.log(msg);

    this.socket.emit(
      "message",
      this.helper.formatMsg(user, msg.message, "message__right")
    );
    this.socket.broadcast
      .to(user.room)
      .emit("message", this.helper.formatMsg(user, msg.message, "message__left"));
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
          this.helper.formatMsg(this.bot, `${user.username} just left`, "left")
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
