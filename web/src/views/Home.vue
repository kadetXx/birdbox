<template>
  <div id="home">
    <aside class="sidebar">
      <Logo />
      <h2 class="title">Joined</h2>

      <div class="spaces">
        <div :key="space.space" v-for="space in mySpaces" class="space">
          <router-link :to="`/space/${space.space}`">
            <h3 class="space__title">
              {{ space.space.charAt(0).toUpperCase() + space.space.slice(1) }}
            </h3>

            <div class="space__details">
              <p class="space__info">
                <span class="material-icons-outlined space__infoicon orange">
                  people
                </span>
                <span class="space__infotext"> {{ space.total }}</span>
              </p>
              <p class="space__info">
                <span class="material-icons space__infoicon green">
                  fiber_manual_record
                </span>
                <span class="space__infotext"> {{ space.online }} </span>
              </p>

              <p class="space__info">
                <span class="material-icons space__infoicon-lg blue"> male </span>
                <span class="space__infotext"> {{ space.males }} </span>
              </p>

              <p class="space__info">
                <span class="material-icons space__infoicon-lg pink"> female </span>
                <span class="space__infotext"> {{ space.females }} </span>
              </p>

              <p class="space__info">
                <i class="fas fa-venus-mars space__infoicon purple"></i>
                <span class="space__infotext"> {{ space.nonBinary }} </span>
              </p>
            </div>
          </router-link> 
        </div>
      </div>
      <div class="toolbar-container">
        <Toolbar :active="'home'" />
      </div>
    </aside>

    <main class="main">
      <h2 class="title">Spaces</h2>
      <div class="spaces">
        <div :key="space.space" v-for="space in spaces" class="space">
          <router-link :to="`/space/${space.space}`">
            <h3 class="space__title">
              {{ space.space.charAt(0).toUpperCase() + space.space.slice(1) }}
            </h3>

            <div class="space__details">
              <p class="space__info">
                <!-- <span class="material-icons-outlined space__infoicon orange">
                  people
                </span> -->
                <span class="space__infotext"> {{ space.total }} members</span>
              </p>
              <!-- <p class="space__info">
                <span class="material-icons space__infoicon green">
                  fiber_manual_record
                </span>
                <span class="space__infotext"> {{ space.online }} online </span>
              </p> -->

              <p class="space__info">
                <span class="material-icons space__infoicon-lg blue"> male </span>
                <span class="space__infotext"> {{ space.males }} </span>
              </p>

              <p class="space__info">
                <span class="material-icons space__infoicon-lg pink"> female </span>
                <span class="space__infotext"> {{ space.females }} </span>
              </p>

              <p class="space__info">
                <i class="fas fa-venus-mars space__infoicon purple"></i>
                <span class="space__infotext"> {{ space.nonBinary }} </span>
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
  padding: 2rem 0.2rem 2rem 4rem;
  border-right: 2px solid rgba(255, 255, 255, 0.041);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .title {
    margin-top: 2rem;
    font-size: 1.2rem;
  }

  .toolbar-container {
    margin-right: 3.8rem;
  }
}

.main {
  width: 65%;
  padding: 2rem;
  overflow: hidden;
  margin-bottom: 1rem;
}

.spaces {
  height: 100%;
  overflow: auto;
  padding: 1rem 3.8rem 1rem 0;
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
  background-color: #373d4963;
  border-radius: 15px;
  margin-bottom: 1rem;
  cursor: pointer;
  border: 1px solid #eb7b4f1a;

  a {
    all: unset;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  &__title {
    margin: 0 0 0.4rem;
    font-size: 1rem;
  }

  &__details {
    display: flex;
    align-items: center;
    opacity: 0.8;

    .space__info {
      margin: 0 0.7rem 0 0;
      font-size: 0.8rem;
      display: flex;
      align-items: center;

      &:nth-child(3) {
        margin-left: auto;
      }

      &icon {
        font-size: 0.9rem;
        margin-right: 0.2rem;
      }

      &icon-lg {
        font-size: 1.2rem;
        margin-right: 0.1rem;
      }
    }
  }
}
</style>
