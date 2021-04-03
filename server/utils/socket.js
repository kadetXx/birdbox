class SocketHandler {
  constructor(io, socket, manager, bot) {
    this.io = io;
    this.socket = socket;
    this.manager = manager;
    this.bot = bot;
  }

  joinRoom(newUser) {

    const user = this.manager.userJoin(newUser);

    this.socket.join(user.room);

    // send room users info
    this.io.to(newUser.room).emit("roomUsers", {
      room: newUser.room,
      users: this.manager.getRoomUsers(newUser.room),
    }); 

    // check if user joined for the first time
    if (user.isNewUser) {
      // send message to single user
      this.socket.emit(
        "message",
        this.manager.formatMsg(this.bot, `Welcome ${user.username}`, "message__left", false)
      );

      // send message to all other users
      this.socket.broadcast
        .to(user.room)
        .emit(
          "message",
          this.manager.formatMsg(this.bot, `${user.username} has joined`, "left", true)
        );
    }

    // check if user reconnected
    if (user.reconnected) {
      // send message to other users
      this.socket.broadcast.to(user.room).emit(
        "message",
        this.manager.formatMsg(this.bot, `${user.username} is back!`, "message__left", false)
      );
    }

  }

  newChat(msg) {
    let user = this.manager.getCurrentUser(msg);

    this.socket.emit(
      "message",
      this.manager.formatMsg(user, msg.message, "message__right")
    );
    this.socket.broadcast
      .to(msg.room)
      .emit("message", this.manager.formatMsg(user, msg.message, "message__left"));
  }

  handleDisconnection() {
    console.log('one disconnected');

    const user = this.manager.userLeaves(this.socket.handshake.query['id']);

    if (user.room && user.room.length !== 0) {

      user.room.forEach(room => {
        
        // send message to all other users
        this.socket.broadcast
        .to(room)
        .emit(
          "message",
          this.manager.formatMsg(this.bot, `${user.username} left the space`, "left", true)
        );
      })
    }
  }
}

module.exports = SocketHandler;
