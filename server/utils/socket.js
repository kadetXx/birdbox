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
    if (user.justJoined) {
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

    // const user = this.manager.userLeaves(this.socket.id);

    // if (user) {
    //   //notify members of leave
    //   this.io
    //     .to(user.room)
    //     .emit(
    //       "message",
    //       this.manager.formatMsg(this.bot, `${user.username} just left`, "left")
    //     );

    //   // send room users info
    //   this.io.to(user.room).emit("roomUsers", {
    //     room: user.room,
    //     users: this.manager.getRoomUsers(user.room),
    //   });
    // }
  }
}

module.exports = SocketHandler;
