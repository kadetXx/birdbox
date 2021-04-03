
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

        return {...user, isNewUser: true}
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

      return {...user, reconnected: true}
  }

  static getCurrentUser(msg) {
    const currentUser = rooms[`${msg.room}`].filter(item => item.id === msg.id);
    return currentUser[0];
  }

  static userLeaves(id) {

    let user = {
      rooms: []
    }

    Object.values(rooms).forEach(room => {
      const userInRoom = room.filter(item => item.id === id)

        
      if (userInRoom.length !== 0) {
        user = {
          ...userInRoom[0],
          room: [...user.rooms, userInRoom[0].room]
        }
      }
      
    });

    return user
  }

  static getRoomUsers(room) {
    return rooms[room];
  }
}

module.exports = Manager;
