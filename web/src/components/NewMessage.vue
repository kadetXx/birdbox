<template>
  <div class="new-chat">
    <form class="form">
      <input
        v-model="message"
        class="form__input"
        type="text"
        placeholder="Start typing"
      />
      <div class="form__btn-container">
        <button class="form__btn" @click.prevent="clickButton()">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "NewMessage",

  props: {
    user: String,
  },

  data() {
    return {
      message: "",
    };
  },

  methods: {
    clickButton: function () {
      const space = this.$route.params.space;

      // $socket is socket.io-client instance
      this.$socket.emit("chatMessage", {
        ...this.user,
        message: this.message,
        space: space,
      });
      this.message = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.new-chat {
  display: flex;
  align-items: center;
  padding: 1rem 0rem;
  margin-right: 3rem;
}

.form {
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-radius: 10px;
  background-color: #373d49;
  padding: 0;
}

.form__input {
  flex-grow: 1;
  background-color: transparent;
  border: none;
  outline: none;
  color: #c5c5c5;
  padding: 0.8rem 1rem;
  // border-right: 1px solid #2e333d;

  &::placeholder {
    color: #919398;
    font-size: 0.9rem;
    font-weight: 600;
  }
}

.form__btn-container {
  width: 10rem;
  padding: 0.4rem ;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  
  .form__btn {
    flex-grow: 1;
    background-color: #ffffff;
    border: none;
    color: #373d49;
    outline: none;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    padding: 0.7rem 0;
    

    i {
      position: relative;
      left: -0.1rem;
      top: -0.05rem;
    }
  }
}
</style>
