class SocketHandler {
  constructor(io, socket, manager, bot) {
    this.io = io;
    this.socket = socket;
    this.manager = manager;
    this.bot = bot;
  }

  joinSpace(newUser) {

    const user = this.manager.userJoin(newUser);

    this.socket.join(user.space); 

    // check if user joined for the first time
    if (!user.reconnected) {
      // send message to single user
      this.socket.emit(
        "message",
        this.manager.formatMsg(this.bot, `Welcome ${user.username}`, "message__left", false)
      );

      // send message to all other users
      this.socket.broadcast
        .to(user.space)
        .emit(
          "message",
          this.manager.formatMsg(this.bot, `${user.username} has joined`, "left", true)
        );
    }

    // check if user reconnected
    if (user.reconnected) {
      // send message to other users
      this.socket.broadcast.to(user.space).emit(
        "message",
        this.manager.formatMsg(this.bot, `${user.username} is back!`, "message__left", false)
      );
    }

    // send space users info
    this.io.to(newUser.space).emit("spaceUsers", {
      space: newUser.space,
      users: this.manager.getSpaceUsers(newUser.space),
    });

  }

  newChat(msg) {
    let user = this.manager.getCurrentUser(msg);

    this.socket.emit(
      "message",
      this.manager.formatMsg(user, msg.message, "message__right")
    );
    this.socket.broadcast
      .to(msg.space)
      .emit("message", this.manager.formatMsg(user, msg.message, "message__left"));
  }

  handleDisconnection() {

    const user = this.manager.userLeaves(this.socket.handshake.query['id']);

    if (user.space.length !== 0) {

      user.space.forEach(space => {
        
        // send message to all other users
        this.socket.broadcast
        .to(space)
        .emit(
          "message",
          this.manager.formatMsg(this.bot, `${user.username} left the space`, "left", true)
        );

        // change user status to offline and broadcast room users
      })
    }
  }

  handleLeave(user) {
    const userWhoLeft = this.manager.removeUserFromSpace(user);

    // send message to all other users
    this.socket.broadcast
    .to(userWhoLeft.space)
    .emit(
      "message",
      this.manager.formatMsg(this.bot, `${userWhoLeft.username} left the space`, "left", true)
    );
  }
}

module.exports = SocketHandler;
