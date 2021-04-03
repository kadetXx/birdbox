
let rooms = {};

class Manager {

  static formatMsg(user, message, className) {
    return {
      bird: {...user},
      message,
      class: className,
    };
  }

  static userJoin(user) {
      
      if (!rooms[`${user.room}`]) {
        rooms = {
          ...rooms,
          [user.room]: [
            user,
          ]
        }

        return {...user, justJoined: true}
      } 
      else if (rooms[`${user.room}`].filter(item => item.id === user.id).length === 0) {
        rooms = {
          ...rooms,
          [user.room]: [
            ...rooms[`${user.room}`],
            user,
          ]
        }

        return user
      }

      return user
  }

  static getCurrentUser(msg) {
    const currentUser = rooms[`${msg.room}`].filter(item => item.id === msg.id);
    return currentUser[0];
  }

  // static userLeaves(id) {
  //   const index = users.findIndex((user) => user.id == id);

  //   if (index !== -1) {
  //     return users.splice(index, 1)[0];
  //   }
  // }

  static getRoomUsers(room) {
    return rooms[room];
  }
}

module.exports = Manager;
