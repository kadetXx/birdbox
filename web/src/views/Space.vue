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
      currentUser: null
    };
  },

  created() {
    const isRegistered = !!localStorage.getItem("user");

    if (!isRegistered) {
      this.$router.push("register");
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
