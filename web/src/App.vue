<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { auth, checkIfUserExists } from "./firebase/firebase";

export default {
  data() {
    return {
      user: null,
    };
  },

  methods: {
    setState(state) {
      this.user = state;
      console.log(this.user);
    },
  },

  created() {
    auth.onAuthStateChanged(async (userAuth) => {
      // check if there's an authenticated user
      if (userAuth) {
        // create user document and get back the user ref from firebase
        const userRef = await checkIfUserExists(userAuth);

        if (userRef === false) {
          alert('user does not exist');
        } else {
          // proceed to set user state if they exist
          userRef.onSnapshot((snapShot) => {
            const user = {
              id: snapShot.id,
              ...snapShot.data(),
            };

            this.setState(user);
          });
        }
      }
    });
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  margin: 0;
  background-color: #272b34;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
