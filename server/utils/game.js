let users = [];

class game {
  constructor() {
    this.currentUser = null;
    this.toPlay = true
  }

  static formatMsg(username, text, position) {
    return {
      username,
      text,
      position
    }
  }

  static userJoin(id, username, room) {
    const user = {id, username, room};

    users.push(user);
    return user;
    
  }

  static getCurrentUser(id) {
    users.forEach(person => {
      if (person.id == id) {
        this.currentUser = person;
      }
    })

    return this.currentUser;
  }

  static userLeaves(id) {
    const index = users.findIndex(user => user.id == id);

    if (index !== -1) {
     return users.splice(index, 1)[0];
    }
  }

  static getRoomUsers(room) {
    return users.filter(user => user.room == room);
  }

  static changeTurn(feedback, className) {
    return {
      feedback,
      className,
    }
  }
}


module.exports = game;

