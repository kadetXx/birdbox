<template>
  <div id="home">
    <aside class="sidebar">
      <Logo />
      <h2 class="title">My Spaces</h2>

      <div class="spaces">
        <div :key="space.space" v-for="space in spaces" class="space">
          <router-link :to="`/space/${space.space}`">
            <h3 class="space__title">
              {{ space.space.charAt(0).toUpperCase() + space.space.slice(1) }}
            </h3>

            <div class="space__details">
              <p class="space__total">
                Users: <span> {{ space.total }}</span>
              </p>
              <p class="space__online">
                Online: <span> {{ space.online }}</span>
              </p>
            </div>
          </router-link>
        </div>
      </div>
      <Toolbar :active="'home'" />
    </aside>

    <main class="main">
      <h2 class="title">Available Spaces</h2>
      <div class="spaces">
        <div :key="space.space" v-for="space in spaces" class="space">
          <router-link :to="`/space/${space.space}`">
            <h3 class="space__title">
              {{ space.space.charAt(0).toUpperCase() + space.space.slice(1) }}
            </h3>

            <div class="space__details">
              <p class="space__total">
                Users: <span> {{ space.total }}</span>
              </p>
              <p class="space__online">
                Online: <span> {{ space.online }}</span>
              </p>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Logo from "../components/Logo";
import Toolbar from "../components/Toolbar";
export default {
  name: "Home",
  components: {
    Logo,
    Toolbar,
  },
  data() {
    return {
      spaces: [],
      user: this.$attrs.user,
    };
  },

  computed: {
    mySpaces: function () {
      const mySpaces = [];

      this.spaces.forEach((space) => {
        const userInSpace =
          space.users.filter((item) => item.id === this.user.id).length !== 0;
        if (userInSpace) {
          mySpaces.push(space);
        }
      });

      return mySpaces;
    },
  },

  created() {
    this.sockets.subscribe("allSpaces", (data) => {
      this.spaces = [...data];
    });

    this.$socket.emit("connected");
  },
};
</script>
<style lang="scss" scoped>
#home {
  height: 100%;
  display: flex;
  justify-content: space-between;
  height: 100%;
}

.sidebar {
  width: 35%;
  padding: 2rem;
  border-right: 2px solid rgba(255, 255, 255, 0.041);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .title {
    margin-top: 2rem;
    font-size: 1.2rem;
  }
}

.main {
  width: 65%;
  padding: 2rem;
  overflow: hidden;
}

.spaces {
  height: 100%;
  overflow: auto;
  padding: 1rem 2rem 1rem 0;
  margin-bottom: 1rem;
}

.title {
  font-size: 2rem;
  margin: 0 0 1rem;
}

.space {
  text-decoration: none;
  padding: 1rem 2rem;
  width: 100%;
  background-color: #373d49;
  margin-bottom: 1rem;

  a {
    all: unset;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  &__title {
    margin: 0 0 0.4rem;
  }

  &__details {
    display: flex;
    align-items: center;

    p {
      margin: 0;
    }
  }
}
</style>
