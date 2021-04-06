<template>
  <div class="setup-account">
    <Template>
      <h1 class="header">One more step</h1>

      <form class="form">
        <input
          v-model="formData.username"
          type="text"
          class="form__input"
          placeholder="Username"
          required
        />

        <select
          required
          v-model="formData.gender"
          class="form__input"
          name="gender"
        >
          <option value="" disabled hidden>Select Gender</option>
          <option value="male">Male</option>
          <option value="Female">Female</option>
          <option value="Non binary">Non binary</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>

        <div class="form__btn-wrap">
          <button @click.prevent="signUp()" class="form__btn">Continue</button>
        </div>
      </form>
    </Template>
  </div>
</template>

<script>
import { createUserDocument } from "../firebase/firebase";
import Template from "./FormPageTemplate";
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

      // user: this.$attrs.user
    };
  },

  methods: {
    async signUp() {
      const { username, gender } = this.formData;

      try {
        const user = this.userData;

        createUserDocument(user, { username, gender });

        this.formData = {
          username: "",
          gender: "",
        };
      } catch (error) {
        alert("an error occured");
        console.log(error.message);
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
