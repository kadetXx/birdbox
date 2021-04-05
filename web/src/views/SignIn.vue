<template>
  <div class="authpage">
    <h1 class="authpage__header">Welcome Back!</h1>

    <form class="form">
      <button @click.prevent="signInGoogle()" class="form__btn">
        <i class="fab fa-google form__btn-icon"></i> Sign in
      </button>
    </form>
  </div>
</template>

<script>
import { signInWithGoogle } from "../firebase/firebase";

export default {
  name: "SignIn",

  data() {
    return {
      user: this.$attrs.user
    }
  },

   methods: {
    signInGoogle() {
      signInWithGoogle();
    },
  },

  created() {
    this.user !== null && this.user !== undefined && this.$router.push('/');
  },

};
</script>

<style lang="scss" scoped>
.authpage {
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
