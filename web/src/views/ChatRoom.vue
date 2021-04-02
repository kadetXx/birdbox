<template>
  <div class="main-wrapper">
    <Sidebar :birds="birds" :boxName="boxName"  />
    <Box v-bind:boxName="boxName"  />
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import Box from "../components/Box.vue"

export default {
  components: { Sidebar, Box },

  data() {
    return {
      boxName: this.$route.params.box,
      birds: [
        {
          id: 1,
          username: 'Kadet',
          gender: 'male',
          admin: true
        },
        {
          id: 2,
          username: 'Ethel',
          gender: 'female',
          admin: false
        },
        {
          id: 3,
          username: 'Daniel',
          gender: 'male',
          admin: false
        },
        {
          id: 4,
          username: 'Allen',
          gender: 'male',
          admin: false
        }
      ]
    }
  }
};
</script>

<style lang="scss" scoped >
.main-wrapper {
  display: flex;
  justify-content: space-between;
  height: 100%;
}
</style>
