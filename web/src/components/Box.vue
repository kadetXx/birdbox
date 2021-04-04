<template>
  <div class="box">
    <Header :boxName="boxName" :user="user" />
    <Messages />
    <NewMessage :user="user" />
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
    user: Object
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
