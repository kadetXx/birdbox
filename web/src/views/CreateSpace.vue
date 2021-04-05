<template>
  <div class="create">
    <h1 class="create__header">Create Space</h1>
    <form class="form">
      <input
        v-model="space"
        type="text"
        class="form__input"
        placeholder="Name your space"
      />

      <button @click.prevent="createSpace()" class="form__btn">Create</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignIn",

  data() {
    return {
      space: "",
      user: this.$attrs.user
    };
  },

  methods: {
    createSpace() {

      const user = {
        ...this.user,
        online: true
      }

      const space = this.space;

      // emit joinSpace event to server
      this.$socket.emit("joinSpace", { ...user, space });
      this.$router.push(`/space/${this.space}`)
    },
  },

  created() {
    const isAuthenticated = this.user !== null && this.user !== undefined;

    if (!isAuthenticated) {
      this.$router.push("/sign-in");
    } 
  }
};
</script>

<style lang="scss" scoped>
.create {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  &__header {
    margin-bottom: 2rem;
    // text-transform: uppercase;
    color: #fff;
  }

  .form {
    width: 50%;
    display: flex;
    flex-direction: column;
  }

  .form__input {
    padding: 0 1.5rem;
    border: none;
    width: 100%;
    outline: none;
    margin-bottom: 0.5rem;
    background-color: #373d49;
    color: #ffffff;
    border-radius: 30px;
    height: 3.5rem;

    &::placeholder {
      color: #7e8596;
      font-weight: bold;
    }
  }

  .form__checkbox-wrapper {
    display: flex;
    align-items: center;

    input[type="checkbox"] {
      margin: 0;
    }

    .form__checkbox-text {
      text-transform: lowercase;
      margin-left: 0.3rem;
      opacity: 0.7;
    }
  }

  .form__btn {
    padding: 0 5rem;
    margin-bottom: 0.5rem;
    background-color: #557ade;
    color: #fff;
    border: 1px solid #557ade;
    text-transform: uppercase;
    font-weight: 600;
    border-radius: 30px;
    height: 3.5rem;
    width: 100%;

    &-icon {
      margin-right: 0.5rem;
    }
  }
}
</style>
