<template>
  <aside class="sidebar">
    <div class="header">
      <div to="/" class="header__link">
        <Bird :user="user" :withName="true" :current="true" />
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
      <Toolbar :active="'space'" :space="space" :nextSpace="'/sports'" :user="user" /> 
    </div>
  </aside>
</template>

<script>
import Bird from "./Bird";
import Toolbar from './Toolbar';

export default {
  name: "Sidebar",
  components: {
    Bird,
    Toolbar
  },
  props: {
    space: String,
    user: Object,
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
  // background-color: #eff4f5;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  overflow: hidden;
}

.header {
  width: 100%;
  padding: 1rem 5rem 1rem 2rem;

  .header__link {
    font-weight: bold;
    text-decoration: none;
    height: fit-content;

    display: flex;
    align-items: flex-start;

    span {
      font-size: 0.8rem;
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

  .user {
    margin-right: 0.1rem;
    margin-left: 0.1rem;
  }
}

.toolbar__container {
  padding: 1rem 6rem 1rem 3rem;
}
</style>
