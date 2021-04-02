<template>
  <div class="box">
    <Header :boxName="boxName" />
    <Messages />
    <NewMessage />
  </div>
</template>

<script>
import Header from "./Header.vue";
import NewMessage from "./NewMessage";
import Messages from "./Messages";

export default {
  name: "BoxContainer",
  components: { Header, NewMessage, Messages },
  props: {
    boxName: String,
  },
};
</script>

<style lang="scss" scoped>
.box {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
