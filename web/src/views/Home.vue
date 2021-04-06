<template>
  <div class="home">
    <Template>
      <aside class="sidebar">
        <div v-if="user !== null" class="spaces-container">
          <h3>Spaces you're currently in</h3>

          <div class="spaces">
            <div
              :key="space.space"
              v-for="space in mySpaces"
              class="spaces_space"
            >
              {{ space.space }}
            </div>
          </div>
        </div>
        <h3>Actions</h3>
        <nav>
          <ul>
            <li><router-link to="/sign-in">Sign In</router-link></li>
            <li><router-link to="/create-space">Create Space</router-link></li>
          </ul>
        </nav>
      </aside>

      <main class="container">
        <h3>Available Spaces</h3>
        <div class="spaces">
          <div :key="space.space" v-for="space in spaces" class="spaces_space">
            {{ space.space }}
          </div>
        </div>
      </main>
    </Template>
  </div>
</template>

<script>
import Template from "../components/FrontpageTemplate";
export default {
  name: "Home",
  components: {
    Template,
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
        if (
          space.users.filter((item) => item.id === this.user.id).length !== 0
        ) {
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
li {
  margin: 0.5rem 0;
}
</style>
