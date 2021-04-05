<template>
  <div class="authpage">
    <h1 class="authpage__header">Finish Setting Up Your Account</h1>

    <form class="form">
      <input
        v-model="formData.username"
        type="text"
        class="form__input"
        placeholder="Username"
        required
      />

      <select required v-model="formData.gender" class="form__input" name="gender">
        <option value="" disabled hidden>Select Gender</option>
        <option value="male">Male</option>
        <option value="Female">Female</option>
        <option value="Non binary">Non binary</option>
      </select>

      <div class="form__btn-wrap">
        <button @click.prevent="signUp()" class="form__btn"> Continue </button>
      </div>
    </form>
  </div>
</template>

<script>
import { createUserDocument } from "../firebase/firebase";

export default {
  name: "SignIn",

  props: {
    userData: Object
  },

  data() {
    return {
      formData: {
        username: "",
        gender: "",
      },

      // user: this.$attrs.user
    };
  },

  methods: {
    async signUp() {
      const { username, gender } = this.formData;

      try {
        const user = this.userData
        
        createUserDocument(user, { username, gender });

        this.formData = {
          username: "",
          gender: "",
        };
        
      } catch (error) {
        console.log('error'); // add alert here
        console.log(error);
      }
    },
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

    -webkit-appearance: none;
    -moz-appearance: none;

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
    width: 100%;

    &-icon {
      margin-right: 0.5rem;
    }
  }
}
</style>
