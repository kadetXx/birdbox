<template>
  <div v-if="user !== null" class="main-wrapper">
    <Sidebar :space="space" :user="user" :sidebar="sidebar" :setSidebar="setSidebar" />
    <Box :space="space" :user="user" :sidebar="sidebar" :setSidebar="setSidebar" />
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import Box from "../components/Box.vue";

export default {
  components: { Sidebar, Box },

  data() {
    return {
      space: this.$route.params.space,
      user: this.$attrs.user,
      sidebar: false,
      setSidebar: (value) => this.showSidebar(value)
    };
  },

  methods: {
    showSidebar(value) {
      this.sidebar = value
    }
  },

  mounted() {
    this.sockets.subscribe("spaceUsers", (data) => {
      const user = data.users.filter(item => item.id === this.user.id);
      this.user = user[0];
    });
    
    const lastSpace = this.space
    sessionStorage.setItem('lastSpace', lastSpace);
  },

  created() {
    const isAuthenticated = this.user !== null && this.user !== undefined;
  
    if (!isAuthenticated) {
      this.$router.push("/sign-in");
    } else {
      const user = {
        ...this.user,
        online: true
      };

      this.user = user;

      const space = this.space.toLowerCase();

      // emit joinSpace event to server
      this.$socket.emit("joinSpace", { ...user, space });
    }
  },
};
</script>

<style lang="scss" scoped>
.main-wrapper {
  display: flex;
  justify-content: space-between;
  height: 100%;
  padding: 1.5rem;

   @media screen and (max-width: 900px) {
    flex-wrap: wrap;
    position: relative;
    padding: 0;
    overflow: hidden;
  }
}
</style>
