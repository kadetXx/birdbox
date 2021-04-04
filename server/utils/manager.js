
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

    Object.values(spaces).forEach(space => {
      const userInspace = space.filter(item => item.id === id)

        
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
}

module.exports = Manager;
