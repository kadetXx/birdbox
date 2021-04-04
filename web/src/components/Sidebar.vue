<template>
  <aside class="sidebar">
    <div class="header">
      <div to="/" class="header__link">
        <Bird :user="user" :withName="true" />
      </div>
      <form class="header__search">
        <i class="fa fa-search header__search-icon"></i>
        <input
          type="search"
          class="header__search-input"
          placeholder="Search users"
        />
      </form>
    </div>

    <div class="users">
      <Bird
        :user="user"
        :withName="true"
        v-bind:key="user.id"
        v-for="user in users.filter(item => item.id !== user.id)"
      />
    </div>
  </aside>
</template>

<script>
import Bird from "./Bird";
export default {
  name: "Sidebar",
  components: {
    Bird,
  },
  props: {
    boxName: String,
    user: Object
  },

  data() {
    return {
      users: []
    }
  },

  created() {
    this.sockets.subscribe("spaceUsers", (data) => {
      this.users = data.users;
    });
  }
};
</script>

<style lang="scss" scoped>
.sidebar {
  width: 25%;
  background-color: #eff4f5;
  border-right: 1px solid #d4d4d4;
}

.header {
  width: 100%;
  padding: 1rem 0.5rem;
  border-bottom: 1px solid #d4d4d4;

  .header__link {
    font-size: 1.2rem;
    font-weight: bold;
    text-decoration: none;

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
    margin: 0.5rem 0 0;
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    background-color: #ffffff;
    padding: 0.5rem;
  }

  .header__search-input {
    flex-grow: 1;
    border: none;
    outline: none;

    &::placeholder {
      color: #bdbdbd;
    }
  }

  .header__search-icon {
    font-size: 0.7rem;
    margin-right: 0.5rem;
    color: #868686;
  }
}

.users {
  padding: 1rem;
}
</style>
