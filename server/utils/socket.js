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
      // send welcome message to single user
      this.socket.emit(
        "message",
        this.manager.formatMsg(
          this.bot,
          `Hello ${user.username}`,
          "message__left",
          false
        )
      );

      // send message to all other users
      this.socket.broadcast
        .to(user.space)
        .emit(
          "message",
          this.manager.formatMsg(
            this.bot,
            `${user.username} joined the space`,
            "message__left",
            true
          )
        );
    }

    // check if user reconnected
    if (user.reconnected) {
      // change user status to online
      const newSpaceData = this.manager.setOnline(user, user.space, true);

      // resend space data to each space the user is in
      this.io.to(user.space).emit("spaceUsers", {
        space: user.space,
        users: newSpaceData,
      });
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
      .emit(
        "message",
        this.manager.formatMsg(user, msg.message, "message__left")
      );

    this.manager.storeMessage(user, msg, "");
  }

  handleDisconnection() {
    const user = this.manager.userLeaves(this.socket.handshake.query["id"]);

    if (user.space.length !== 0) {
      user.space.forEach((space) => {
        // change user status to offline
        const newSpaceData = this.manager.setOnline(user, space, false);

        // resend space data to each space the user is in
        this.io.to(space).emit("spaceUsers", {
          space: space,
          users: newSpaceData,
        });

        // change user status to offline and broadcast room users
      });
    }
  }

  handleLeave(user) {
    const userWhoLeft = this.manager.removeUserFromSpace(user);

    // send message to all other users
    this.socket.broadcast
      .to(userWhoLeft.space)
      .emit(
        "message",
        this.manager.formatMsg(
          this.bot,
          `${userWhoLeft.username} left the space`,
          "message__left",
          true
        )
      );
  }

  getOldMessages(space) {
    const messages = this.manager.getMessages(space);

    const formatedMessages = messages.map((msg) => {
      return msg;
    });

    // send space users info
    this.io.to(space).emit("oldMessages", formatedMessages);
  }
}

module.exports = SocketHandler;
