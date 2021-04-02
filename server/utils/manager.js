let users = [];
let rooms = {};

sample = {
  roomOne: [
    {
      id: 'c892a8c7-d33f-487e-9bbb-5aa363090658',
      username: 'Ethel',
      gender: 'female',
      admin: false,
      room: 'kiki'
    }
  ],
  roomTwo: [
    {
      id: 'c892a8c7-d33f-487e-9bbb-5aa363090658',
      username: 'Ethel',
      gender: 'female',
      admin: false,
      room: 'tola'
    }
  ]
}


const val = rooms['what'];
console.log(val);

class Manager {
  constructor() {
    this.currentUser = null;
    this.toPlay = true;
  }

  static formatMsg(user, message, className) {
    return {
      bird: {...user},
      message,
      class: className,
    };
  }

  static userJoin(user) {

      users.push(user);
      
      if (!rooms[`${user.room}`]) {
        rooms = {
          ...rooms,
          [user.room]: [
            user,
          ]
        }
        
        return user
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

      return false
  }

  static getCurrentUser(msg) {
    const currentUser = rooms[`${msg.room}`].filter(item => item.id === msg.id);
   
    return currentUser[0];
  }

  static userLeaves(id) {
    const index = users.findIndex((user) => user.id == id);

    if (index !== -1) {
      return users.splice(index, 1)[0];
    }
  }

  static getRoomUsers(room) {
    console.log(rooms[room]);
    return rooms[room];
  }
}

module.exports = Manager;
