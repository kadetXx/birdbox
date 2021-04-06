
let spaces = {
  "general": [],
  "sports": [],
  "tech": [],
  "lagos": [],
  "singles": [],
};

class Manager {

  static formatMsg(user, message, className) {
    return {
      user: {...user},
      message,
      class: className,
    };
  }

  static userJoin(user) {
      
    if (!spaces[`${user.space}`]) {
      spaces = {
        ...spaces,
        [user.space]: [
          {...user, admin: true},
        ]
      }

      return {...user, admin: true}
    }

    else if (spaces[`${user.space}`].filter(item => item.id === user.id).length === 0) {
      spaces = {
        ...spaces,
        [user.space]: [
          ...spaces[`${user.space}`],
          {...user, admin: false},
        ]
      }

      return user
    }

    return {...user, reconnected: true}
  }

  static getCurrentUser(msg) {
    if (spaces[`${msg.space}`] !== undefined) {
      const currentUser = spaces[`${msg.space}`].filter(item => item.id === msg.id);
      return currentUser[0];
    }
  }

  static userLeaves(id) {

    let user = {
      space: []
    }

    // iterate through all spaces
    Object.values(spaces).forEach(space => {

      // check if user object is present in the space
      const userInspace = space.filter(item => item.id === id);
      
      // return new user object containing user's current spaces array if user is present
      if (userInspace.length !== 0) {
        user = {
          ...userInspace[0],
          space: [...user.space, userInspace[0].space]
        }
      }
      
    });

    return user
  }

  static getSpaceUsers(space) {
    return spaces[space];
  }

  static getSpaces() {
    const allSpaces = []

    for (const space in spaces) {
     
      const newSpace = {
        space: space,
        users: spaces[space],
        total: spaces[space].length,
        online: spaces[space].filter(item => item.online).length,
        offline: spaces[space].filter(item => !item.online).length
      }

      allSpaces.push(newSpace)
    }
   
    return allSpaces
  }

  static setOnline(user, space, status) {

    const index = spaces[`${space}`].findIndex(item => item.id == user.id);

    spaces[`${space}`][index].online = status

    return spaces[`${space}`]
  }

  static removeUserFromSpace(user) {
    const index = spaces[`${user.space}`].findIndex(item => item.id == user.id);

    if (index !== -1) {
      return spaces[`${user.space}`].splice(index, 1)[0];
    }
  }
}

module.exports = Manager;
