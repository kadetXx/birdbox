<template>
  <div class="create">
    <h1 class="create__header">Register Current Client</h1>
    <form class="form">
      <input
        v-model="user.username"
        type="text"
        class="form__input"
        placeholder="Username"
      />
      <select
        v-model="user.gender"
        class="form__input"
        placeholder="Select Gender"
      >
        <option value="male">male</option>
        <option value="female">female</option>
      </select>

      <button @click.prevent="register()" class="form__btn">Register</button>
    </form>
  </div>
</template>

<script>
import { uuid } from "vue-uuid";
export default {
  name: "SignIn",

  data() {
    return {
      user: {
        id: uuid.v4(),
        username: "",
        gender: "female",
      },
    };
  },

  methods: {
    register() {
      localStorage.setItem("user", JSON.stringify(this.user));
      this.user.username = "";

      this.$router.push('create-space')
    },
  },
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
