<template>
  <div id="app">
    <div v-if="user === false" class="loader">
      <p>Loading...</p>
    </div>
    <SignUp v-else-if="pendingAccount !== false" :userData="pendingAccount" />
    <router-view v-else :user="user" />
  </div>
</template>

<script>
import { auth, checkIfUserExists } from "./firebase/firebase.js";
import SignUp from './components/SetupAccount.vue'

export default {
  components: {
    SignUp
  },

  data() {
    return {
      user: false,
      pendingAccount: false 
    };
  },

  methods: {
    setState(state) {
      this.user = state;
    },
  },

  watch: {
    user() {
      if (this.user) {
        sessionStorage.setItem('userId', this.user.id)
      }
    }
  },

  created() {

    auth.onAuthStateChanged(async (userAuth) => {
      // check if there's an authenticated user
      if (userAuth) {
        // create user document and get back the user ref from firebase
        const userRef = await checkIfUserExists(userAuth);

        if (userRef === false) {
          this.setState(null);
          this.pendingAccount = userAuth;
        } else {
          this.pendingAccount = false;
          
          // proceed to set user state if they exist
          userRef.onSnapshot((snapShot) => {
            const user = {
              id: snapShot.id,
              ...snapShot.data(),
            };

            this.setState(user);
          });
        }
      } else {
        this.setState(null)
      }
    });
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;

  ::-webkit-scrollbar {
		width: 5.5px;
		border: none;
	}

	::-webkit-scrollbar-track {
		border-radius: 0px;
		background-color: #272b34;
	}

	::-webkit-scrollbar-thumb {
		border-radius: 0px;
		background-color: #5B5E65;
    border-radius: 8rem;
	}
}

html,
body {
  height: 100%;
  margin: 0;
  background-color: #272b34;
  color: #FFFFFF;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;

  a {
    font-weight: 500;
    color: #FFFFFF;
    text-decoration: none;

    &.router-link-exact-active {
      color: #557ADE;
    }
  }

  ul {
    padding: 0;
    list-style: none;
  }
  
  .orange {
    color: #EB7A4F;
  }

  .blue {
    color: #557ADE;
  }

  .pink {
    color: #f2507b;
  }

  .purple {
    color: #9764c9;
  }

  .green {
    color: #61d258;
  }

  .lightblue {
    color: #A6A7B2;
  }
}
</style>
