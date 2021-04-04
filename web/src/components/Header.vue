<template>
  <div class="header">
    <div>
      <h2 class="header__heading">{{ boxName }}</h2>
      <p class="header__text">
        <i class="fas fa-users header__icon"></i> {{ users.length }}
        <span class="header__text-inner">online</span>
      </p>
    </div>

    <div class="header__btns">
      <router-link to="/">
        <button @click="leaveSpace">Exit Space</button>
      </router-link>
      <router-link to='/'>
        <button @click="logOut">Logout</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import {auth} from '../firebase/firebase.js'

export default {
  name: "Header",
  props: {
    boxName: String,
    user: Object
  },

  data() {
    return {
      users: [],
    };
  },

  methods: {
    leaveSpace() {
      this.$socket.emit("leaveSpace", {...this.user, space: this.boxName});
    },

    logOut() {
      this.leaveSpace();

      auth.signOut().then(function () {
        console.log('signed out');
      }).catch(function (err) {
        console.log(err);
      });
    }
  },

  created() {
    this.sockets.subscribe("spaceUsers", (data) => {
      this.users = data.users;
    });
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #d4d4d4;
  padding: 1rem 2rem;
}

.header__heading {
  margin: 0;
  text-transform: uppercase;
  color: #505050;
  font-size: 1.3rem;
}

.header__text {
  color: #505050;
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
}

.header__text-inner {
  color: #71a61c;
  font-weight: bold;
}
</style>
