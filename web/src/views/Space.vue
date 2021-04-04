<template>
  <div class="main-wrapper">
    <Sidebar :boxName="boxName" />
    <Box v-bind:boxName="boxName" />
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
    const isAuthenticated = typeof(this.$attrs.user) === "object";

    if (!isAuthenticated) {
      this.$router.push("/sign-in");
    } else {

      const user = {
        ...this.user,
        admin: false,
      };

      const room = this.boxName;

      // emit joinRoom event to server
      this.$socket.emit("joinRoom", { ...user, room });
    }
  },
};
</script>

<style lang="scss" scoped>
.main-wrapper {
  display: flex;
  justify-content: space-between;
  height: 100%;
}
</style>
