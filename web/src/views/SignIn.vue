<template>
  <div class="authpage">
    <h1 class="authpage__header">
      <span class="close__icon material-icons-outlined">https</span>
    </h1>

    <form class="form">
      <button @click.prevent="signInGoogle()" class="form__btn">
        <i class="fab fa-google form__btn-icon"></i> Sign in
      </button>
    </form>

    <Alert v-if="showAlert === true" v-bind:alertData="alertData" />
  </div>
</template>

<script>
import { signInWithGoogle } from "../firebase/firebase";
import Alert from "../components/Alert";

export default {
  name: "SignIn",
  components: {
    Alert,
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
              window.location = '/'
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
          !res.additionalUserInfo.isNewUser && this.setAlert(true)
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
              this.setAlert(false)
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
