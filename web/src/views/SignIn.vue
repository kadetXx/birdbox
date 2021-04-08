<template>
  <div class="sign-in">
    <Template :pageType="'auth'" :gender="'unknown'">
      <div class="title title--icon">
        <div class="title__icon">
          <span class="material-icons-outlined"> https </span>
        </div>
        <h2 class="title__heading">Heloooo 👋🏼</h2>
        <p class="title__subheading">Sign in to your birdbox account</p>
      </div>

      <form class="form">
        <button
          @click.prevent="signInGoogle()"
          class="form__btn form__btn--extra-pad"
        >
          Sign in
        </button>
        <small class="form__footer"
          >Powered By
          <a href="https://firebase.google.com/products/auth" target="_blank" rel="noreferrer noopener"
            >Google</a
          ></small
        >
      </form>

      <Alert v-if="showAlert === true" v-bind:alertData="alertData" />
    </Template>
  </div>
</template>

<script>
import { signInWithGoogle } from "../firebase/firebase";
import Template from "../components/FormpageTemplate";
import Alert from "../components/Alert";

export default {
  name: "SignIn",
  components: {
    Alert,
    Template,
  },

  data() {
    return {
      user: this.$attrs.user,
      showAlert: false,
      alertData: {
        icon: "lock_open",
        color: "#a6a7b2",
        title: "Oporrrr ⚡",
        text: "Authentication was successful",
        state: this.setAlert,
        links: [
          {
            text: "Go To Spaces",
            url: "#",
            action: () => {
              window.location = "/";
            },
          },
        ],
      },
    };
  },

  methods: {
    signInGoogle() {
      signInWithGoogle()
        .then((res) => {
          !res.additionalUserInfo.isNewUser && this.setAlert(true);
        })
        .catch((err) => {
          console.log(err.message);
          this.showError();
        });
    },

    showError() {
      (this.alertData = {
        icon: "info",
        color: "#FFCA48",
        title: "Opps!",
        text: "Something went wrong, please try again",
        state: this.setAlert,
        links: [
          {
            text: "Proceed",
            url: "/sign-in",
            action: () => {
              this.setAlert(false);
            },
          },
        ],
      }),
        this.setAlert(true);
    },

    setAlert: function (condition) {
      this.showAlert = condition;
    },
  },

  created() {
    this.user !== null && this.user !== undefined && this.$router.push("/");
  },
};
</script>

<style lang="scss" scoped>
.sign-in {
  height: 100%;
  width: 100%;
}
</style>
