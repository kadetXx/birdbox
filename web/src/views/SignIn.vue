<template>
  <div class="sign-in">
    <Template :pageType="'auth'" :gender="'unknown'">
      <h1 class="header">
        <span class="close__icon material-icons-outlined">https</span>
      </h1>

      <form class="form">
        <button @click.prevent="signInGoogle()" class="form__btn">
          <i class="fab fa-google form__btn-icon"></i> Sign in
        </button>
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
        color: "#61d258",
        title: "Oporr 🚀",
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
          console.log(err);
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