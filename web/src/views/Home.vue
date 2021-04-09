<template>
  <div id="home">
    <aside class="sidebar">
      <Logo />
      <h2 class="title">Joined</h2>

      <div
        v-if="user !== null && user !== undefined && mySpaces.length !== 0"
        class="spaces"
      >
        <Spacebox :key="space.space" v-for="space in mySpaces" :space="space" />
      </div>

      <div v-if="mySpaces.length === 0" class="empty-state">
        <span class="material-icons-outlined"> forum </span>
        <p>Spaces you join will appear here</p>
      </div>

      <div class="toolbar-container">
        <Toolbar :active="'home'" :user="user" />
      </div>
    </aside>

    <main class="main">
      <h2 class="title">Spaces</h2>
      <div class="spaces">
        <Spacebox
          :key="space.space"
          v-for="space in otherSpaces"
          :space="space"
        />
      </div>
    </main>

    <Preloader v-if="spaces.length === 0" />
  </div>
</template>

<script>
import Logo from "../components/Logo";
import Toolbar from "../components/Toolbar";
import Spacebox from "../components/Spacebox";
import Preloader from '../components/Preloader'
export default {
  name: "Home",
  components: {
    Logo,
    Toolbar,
    Spacebox,
    Preloader
  },
  data() {
    return {
      spaces: [],
      user: this.$attrs.user,
    };
  },

  computed: {
    otherSpaces: function () {
      let otherSpaces = [];

      if (this.user !== null && this.user !== undefined) {
        this.spaces.forEach((space) => {
          const userInSpace =
            space.users.filter((item) => item.id === this.user.id).length === 0;
          if (userInSpace) {
            otherSpaces.push(space);
          }
        });
      } else {
        otherSpaces = this.spaces;
      }

      return otherSpaces;
    },

    mySpaces: function () {
      const mySpaces = [];
      
      if (this.user !== null && this.user !== undefined) {
        this.spaces.forEach((space) => {
          const userInSpace =
            space.users.filter((item) => item.id === this.user.id).length !== 0;
          if (userInSpace) {
            mySpaces.push(space);
          }
        });
      }

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

.empty-state {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 3.8rem 3rem 0;
  opacity: 0.5;

  @media screen and (max-width: 900px) {
    padding: 2rem 1rem;
    background-color: #373d4963;
    border-radius: 15px;
    margin-bottom: 1rem;
    cursor: pointer;
    border: 1px solid #eb7b4f1a;
    margin-top: 2rem;
  }

  span {
    font-size: 3.5rem;

    @media screen and (max-width: 900px) {
      font-size: 3rem;
    }
  }

  p {
    font-size: 1.2rem;
    padding: 0 10%;

    @media screen and (max-width: 900px) {
      font-size: 0.8rem;
      text-align: center;
    }
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

  @media screen and (max-width: 600px) {
    padding: 2rem 1rem 0;
  }

  .title {
    margin-top: 2rem;
    font-size: 1.2rem;
    margin-bottom: auto;

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
      padding: 1rem 3rem;
      z-index: 100;
    }

    @media screen and (max-width: 600px) {
      padding: 1rem 2rem;
    }

    @media screen and (max-width: 350px) {
      padding: 1rem;
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

  @media screen and (max-width: 600px) {
    padding: 2rem 1rem;
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
</style>
