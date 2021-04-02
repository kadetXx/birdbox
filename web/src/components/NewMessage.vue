<template>
  <div class="new-chat">
    <form class="form">
      <input class="form__input" type="text" placeholder="Send a chat">
      <button class="form__btn">Send</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "NewMessage",
};
</script>

<style lang="scss" scoped>
.new-chat {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem 4rem;
}

.form {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.form__input {
  flex-grow: 1;
  margin-right: 0.5rem;
  padding: 0.8rem;
  background-color: #eff4f5;
  border: 1px solid #d4d4d4;
  outline: none;
}

.form__btn {
  padding: 0.5rem 3rem;
  background-color: #71a61c;
  border: 1px solid #d4d4d4;
  color: #fff;
  outline: none;
}
</style>
