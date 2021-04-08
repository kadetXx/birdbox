<template>
  <aside :class="`sidebar ${sidebar ? 'sidebar--show' : 'sidebar--hide'}`">
    <div class="header">
      <div class="header__main">
        <Bird :user="user" :withName="true" :current="true" />
        <button @click="setSidebar(false)" class="header__icon--mobile">
          <span class="material-icons-outlined"> expand_more </span>
        </button>
      </div>
      <form class="header__search">
        <input
          v-model="findUser"
          type="text"
          class="header__search-input"
          placeholder="Search users"
        />

        <span class="material-icons-outlined header__search-icon">search</span>
      </form>
    </div>

    <div class="users">
      <Bird
        :user="user"
        :withName="true"
        v-bind:key="user.id"
        v-for="user in filteredUsers"
      />
    </div>

    <div class="toolbar__container">
      <Toolbar
        :active="'space'"
        :space="space"
        :nextSpace="'/sports'"
        :user="user"
      />
    </div>
  </aside>
</template>

<script>
import Bird from "./Bird";
import Toolbar from "./Toolbar";

export default {
  name: "Sidebar",
  components: {
    Bird,
    Toolbar,
  },
  props: {
    space: String,
    user: Object,
    sidebar: Boolean,
    setSidebar: Function,
  },

  data() {
    return {
      users: [],
      findUser: "",
    };
  },

  computed: {
    filteredUsers: function () {
      let filter = new RegExp(this.findUser, "i");
      const usersWithoutCurrentUser = this.users.filter(
        (item) => item.id !== this.user.id
      );

      return usersWithoutCurrentUser.filter((user) =>
        user.username.match(filter)
      );
    },
  },

  created() {
    this.sockets.subscribe("spaceUsers", (data) => {
      this.users = data.users;
    });
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  width: 45%;
  padding: 2rem 1rem 0 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  overflow: hidden;

  @media screen and (max-width: 1061px) {
    padding: 1rem 1rem 0;
  }

  @media screen and (max-width: 999px) {
    width: 40%;
  }

  @media screen and (max-width: 900px) {
    width: 100%;
    background-color: #272b34;
    transition: transform 0.3s ease-out;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;

    &--hide {
      transform: translateY(100vh);
    }

    &--show {
      transform: translateY(0);
    }
  }
}

.header {
  width: 100%;
  padding: 1rem 5rem 1rem 2rem;

  @media screen and (max-width: 1061px) {
    padding: 1rem 2rem;
  }

  @media screen and (max-width: 999px) {
    padding: 1rem 2rem 1rem 0;
  }

  @media screen and (max-width: 900px) {
    padding: 1rem;
  }

  @media screen and (max-width: 600px) {
    padding: 1rem 0;
  }

  .header__main {
    font-weight: bold;
    text-decoration: none;
    height: fit-content;

    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .header__icon--mobile {
      color: #aeb0b4;
      background-color: #343943;
      padding: 0.8rem 0.8rem;
      border: none;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 0.5rem;
      outline: none;
      display: none;

      @media screen and (max-width: 900px) {
        padding: 0.6rem;
        display: inline-block;
      }
    }
  }

  .header__search {
    width: 100%;
    display: flex;
    align-items: center;
    margin: 1rem 0 0;
    border: none;
    border-radius: 30px;
    background-color: #373d49;
    padding: 1rem;
  }

  .header__search-input {
    flex-grow: 1;
    border: none;
    outline: none;
    background-color: transparent;
    color: #c5c5c5;
    font-size: 16px;

    &::placeholder {
      color: #919398;
      font-size: 0.9rem;
      font-weight: 500;
    }
  }

  .header__search-icon {
    font-size: 1.3rem;
    margin-right: 0.5rem;
    color: #ffffff;
  }
}

.users {
  padding: 2rem 5rem 0 2rem;
  flex-grow: 1;
  overflow: auto;

  @media screen and (max-width: 1061px) {
    padding: 1rem 2rem;
  }

  @media screen and (max-width: 999px) {
    padding: 1rem 2rem 1rem 0;
  }

  @media screen and (max-width: 900px) {
    padding: 1rem;
  }

  @media screen and (max-width: 600px) {
    padding: 1rem 0;
  }

  .user {
    margin-right: 0.1rem;
    margin-left: 0.1rem;
  }
}

.toolbar__container {
  padding: 1rem 6rem 1rem 3rem;

  @media screen and (max-width: 1061px) {
    padding: 1rem 3rem;
  }

  @media screen and (max-width: 999px) {
    padding: 1rem 2rem 1rem 0;
  }

  @media screen and (max-width: 900px) {
    padding: 1rem 5rem;
  }

  @media screen and (max-width: 600px) {
    padding: 1rem;
  }

  @media screen and (max-width: 365px) {
    padding: 1rem;
  }
}
</style>
