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
        admin: true
      }

      const room = this.space;

      // emit joinRoom event to server
      this.$socket.emit("joinRoom", { ...user, room });
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
    text-transform: uppercase;
  }

  .form {
    width: 50%;
    display: flex;
    flex-direction: column;
  }

  .form__input {
    padding: 1rem;
    border: 1px solid grey;
    width: 100%;
    outline: none;
    margin-bottom: 0.5rem;
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
    padding: 1rem 5rem;
    margin-bottom: 0.5rem;
    background-color: crimson;
    color: #fff;
    border: 1px solid crimson;
    text-transform: uppercase;
    font-weight: 600;
  }
}
</style>
