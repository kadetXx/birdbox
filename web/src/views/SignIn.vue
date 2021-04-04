<template>
  <div class="create">
    <h1 class="create__header">Welcome Back!</h1>

    <form class="form">
      <input
        v-model="user.email"
        type="text"
        class="form__input"
        placeholder="Email Address"
      />

      <input
        v-model="user.password"
        type="text"
        class="form__input"
        placeholder="Password"
      />

      <div class="form__btn-wrap">
        <button @click.prevent="signIn()" class="form__btn">Sign In</button>
        <button @click.prevent="signInGoogle()" class="form__btn">
          <i class="fab fa-google form__btn-icon"></i> Google
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { signInWithGoogle } from "../firebase/firebase";

export default {
  name: "SignIn",

  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    signIn() {
      console.log("nothing");
    },

    signInGoogle() {
      signInWithGoogle();
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

  .form__btn-wrap {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
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
    width: 49%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;

    &-icon {
      margin-right: 0.5rem;
    }

    &:first-child {
      background-color: #61d258;
      border-color: #61d258;
    }
  }
}
</style>
