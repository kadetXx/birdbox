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
  box-sizing: border-box;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 50px;
  padding: 3rem 0.3rem 2rem 3rem;
  background-color: #2E333D;
}
</style>
