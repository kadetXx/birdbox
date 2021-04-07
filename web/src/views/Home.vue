<template>
  <div id="home">
    <aside class="sidebar">
      <Logo />
      <h2 class="title">Joined</h2>

      <div v-if="(user !== null) & (user !== undefined)" class="spaces">
        <div :key="space.space" v-for="space in mySpaces" class="space">
          <router-link :to="`/space/${space.space}`">
            <h3 class="space__title">
              {{ space.space.charAt(0).toUpperCase() + space.space.slice(1) }}
            </h3>

            <ul v-if="space.total !== 0" class="space__users">
              <li
                :key="user.id + index"
                v-for="(user, index) in space.users"
                class="space__user"
              >
                {{ user.username }}
                <span v-if="user.admin" class="material-icons user__isadmin"
                  >verified</span
                >
                <span v-if="index + 1 !== space.users.length">,</span>
              </li>
            </ul>

            <div class="space__details">
              <p class="space__info">
                <span class="material-icons-outlined space__infoicon orange">
                  people
                </span>
                <span class="space__infotext">
                  {{ space.total }}
                  {{ space.total === 1 ? "member" : "members" }}</span
                >
              </p>

              <p class="space__info">
                <span class="material-icons space__infoicon-lg blue">
                  male
                </span>
                <span class="space__infotext"> {{ space.males }} </span>
              </p>

              <p class="space__info">
                <span class="material-icons space__infoicon-lg pink">
                  female
                </span>
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
        <Toolbar :active="'home'" :user="user" />
      </div>
    </aside>

    <main class="main">
      <h2 class="title">Spaces</h2>
      <div class="spaces">
        <div :key="space.space" v-for="space in otherSpaces" class="space">
          <router-link :to="`/space/${space.space}`">
            <h3 class="space__title">
              {{ space.space.charAt(0).toUpperCase() + space.space.slice(1) }}
            </h3>

            <ul v-if="space.total !== 0" class="space__users">
              <li
                :key="user.id + index"
                v-for="(user, index) in space.users"
                class="space__user"
              >
                {{ user.username }}
                <span v-if="user.admin" class="material-icons user__isadmin"
                  >verified</span
                >
                <span v-if="index + 1 !== space.users.length">,</span>
              </li>
            </ul>

            <div class="space__details">
              <p class="space__info">
                <span class="material-icons-outlined space__infoicon orange">
                  people
                </span>
                <span class="space__infotext">
                  {{ space.total }}
                  {{ space.total === 1 ? "member" : "members" }}</span
                >
              </p>

              <p class="space__info">
                <span class="material-icons space__infoicon-lg blue">
                  male
                </span>
                <span class="space__infotext"> {{ space.males }} </span>
              </p>

              <p class="space__info">
                <span class="material-icons space__infoicon-lg pink">
                  female
                </span>
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
    otherSpaces: function () {
      const otherSpaces = [];

      this.spaces.forEach((space) => {
        const userInSpace =
          space.users.filter((item) => item.id === this.user.id).length === 0;
        if (userInSpace) {
          otherSpaces.push(space);
        }
      });

      return otherSpaces;
    },

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

  @media screen and (max-width: 900px) {
    flex-wrap: wrap;
  }
}

.sidebar {
  width: 40%;
  padding: 2rem 0.2rem 2rem 4rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: 1035px) {
    width: 50%;
  }

  @media screen and (max-width: 900px) {
    width: 100%;
    padding: 2rem 2rem 0;
  }

  .title {
    margin-top: 2rem;
    font-size: 1.2rem;

    @media screen and (max-width: 900px) {
      font-size: 1.5rem;
    }
  }

  .toolbar-container {
    margin-right: 3.8rem;

    @media screen and (max-width: 900px) {
      margin-right: 0;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #272b34;
      padding: 1rem 2rem;
      z-index: 100;
    }
  }
}

.main {
  width: 60%;
  padding: 2rem;
  overflow: hidden;
  margin-bottom: 2rem;
  margin-top: 1rem;

  @media screen and (max-width: 1035px) {
    width: 50%;
  }

  @media screen and (max-width: 900px) {
    width: 100%;
    margin-top: 0;
    padding-top: 0;

    .spaces {
      padding-bottom: 5rem;
    }
  }
}

.spaces {
  height: 100%;
  overflow: auto;
  padding: 1rem 3.8rem 3rem 0;
  margin-bottom: 1rem;

  @media screen and (max-width: 900px) {
    padding: 1rem 0;
  }
}

.row {
  display: flex;
  align-items: center;
}

.title {
  font-size: 1.8rem;
  margin: 0 0 1rem;

  @media screen and (max-width: 900px) {
    font-size: 1.5rem;
  }
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
    font-size: 1.1rem;
  }

  &__users {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 1.5rem 0;

    .space__user {
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      margin-right: 0.5rem;
      // color: #A6A7B2;
      color: #fff;
      opacity: 0.8;
      line-height: 1.5;

      span,
      i {
        font-size: 0.8rem;
        margin-left: 0.2rem;
      }
    }
  }

  &__details {
    display: flex;
    align-items: center;
    opacity: 0.8;

    .space__info:nth-child(2) {
      margin-left: auto;
    }

    .space__info {
      margin: 0 0.7rem 0 0;
      font-size: 0.8rem;
      display: flex;
      align-items: center;

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
