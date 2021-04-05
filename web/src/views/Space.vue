<template>
  <div v-if="user !== null" class="main-wrapper">
    <Sidebar :boxName="boxName" :user="user" />
    <Box :boxName="boxName" :user="user" />
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import Box from "../components/Box.vue";

export default {
  components: { Sidebar, Box },

  data() {
    return {
      boxName: this.$route.params.space,
      user: this.$attrs.user,
    };
  },

  created() {
    const isAuthenticated = this.user !== null && this.user !== undefined;
  
    if (!isAuthenticated) {
      this.$router.push("/sign-in");
    } else {
      const user = {
        ...this.user,
        admin: false,
        online: true
      };

      this.user = user;

      const space = this.boxName;

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
  padding: 1.2rem;
}
</style>
