<template>
  <div class="box">
    <Header :space="space" :user="user" />
    <Messages :space="space" />
    <NewMessage :user="user" />
  </div>
</template>

<script>
import Header from "./BoxHeader.vue";
import NewMessage from "./NewMessage";
import Messages from "./Messages";

export default {
  name: "BoxContainer",
  components: { Header, NewMessage, Messages },
  props: {
    space: String,
    user: Object
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 55%;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 50px;
  padding: 2rem 0.3rem 1rem 3rem;
  background-color: #2E333D;
}
</style>
