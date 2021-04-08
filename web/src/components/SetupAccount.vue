<template>
  <div class="setup-account">
    <Template :pageType="'auth'" :gender="formData.gender">
      <div class="title">
        <h1 class="title__heading">One more step</h1>
        <p class="title__subheading">Finish setting up your account.</p>
      </div>

      <form class="form">
        <input
          @input="setInputInvalid(false)"
          v-model="formData.username"
          type="text"
          :class="`form__input ${inputInvalid ? 'form__input--invalid' : ''}`"
          placeholder="Username"
          required
        />

        <select
          @change="setSelectInvalid(false)"
          v-model="formData.gender"
          :class="`form__input ${selectInvalid ? 'form__input--invalid' : ''}`"
          name="gender"
        >
          <option value="" disabled hidden>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Non binary">Non binary</option>
        </select>

        <div class="form__btn-wrap">
          <button
            @click.prevent="signUp()"
            :class="`form__btn ${formData.gender}`"
          >
            Continue
          </button>
        </div>
      </form>
    </Template>
  </div>
</template>

<script>
import { createUserDocument } from "../firebase/firebase";
import Template from "./FormpageTemplate";
export default {
  name: "SignIn",
  components: {
    Template,
  },
  props: {
    userData: Object,
  },

  data() {
    return {
      formData: {
        username: "",
        gender: "",
      },
      inputInvalid: false,
      selectInvalid: false,
    };
  },

  methods: {

    setInputInvalid(value) {
      this.inputInvalid = value;
    },

    setSelectInvalid(value) {
      this.selectInvalid = value;
    },

    async signUp() {
      const { username, gender } = this.formData;

      if (this.formData.username.trim().length == 0) {
        this.setInputInvalid(true);
      } else if (this.formData.gender.length == 0) {
        this.setSelectInvalid(true);
      } else {
        try {
          const user = this.userData;

          createUserDocument(user, { username, gender });

          this.formData = {
            username: "",
            gender: "",
          };
        } catch (error) {
          console.log(error.message);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.setup-account {
  width: 100%;
  height: 100%;
}
</style>
