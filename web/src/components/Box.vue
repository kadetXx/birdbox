<template>
  <div class="box">
    <Header :space="space" :user="user" :sidebar="sidebar" :setSidebar="setSidebar" />
    <Messages :space="space" :user="user" />
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
    user: Object,
    sidebar: Boolean,
    setSidebar: Function
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
  background-color: #2e333d;

  @media screen and (max-width: 999px) {
    width: 60%;
  }

  @media screen and (max-width: 900px) {
    width: 100%;
    overflow: hidden;
    border-radius: 0;

    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  @media screen and (max-width: 600px) {
    padding-top: 1.5rem;
    padding-left: calc(0.8rem + 5.5px);
  }
}
</style>
