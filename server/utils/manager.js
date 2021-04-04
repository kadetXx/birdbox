
let spaces = {};

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
            user,
          ]
        }

        return user
      }

      else if (spaces[`${user.space}`].filter(item => item.id === user.id).length === 0) {
        spaces = {
          ...spaces,
          [user.space]: [
            ...spaces[`${user.space}`],
            user,
          ]
        }

        return user
      }

      return {...user, reconnected: true}
  }

  static getCurrentUser(msg) {
    const currentUser = spaces[`${msg.space}`].filter(item => item.id === msg.id);
    return currentUser[0];
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

  static setOffline(user, space) {

    const index = spaces[`${space}`].findIndex(item => item.id == user.id);

    spaces[`${space}`][index].online = false

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
