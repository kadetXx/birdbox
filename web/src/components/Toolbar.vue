<template>
  <div class="toolbar">
    <router-link to="#" @click="forLogout" class="toolbar__icon">
      <span class="material-icons-outlined"> power_settings_new </span>
    </router-link>

    <router-link to="#" @click="forFunds" class="toolbar__icon">
      <span class="material-icons-outlined"> credit_card </span>
    </router-link>

    <router-link to="/" class="toolbar__icon">
      <span class="material-icons-outlined"> roofing </span>
    </router-link>
    <router-link to="#" @click="forRandom" class="toolbar__icon">
      <span class="material-icons-outlined"> shuffle </span>
    </router-link>
    <router-link
      :to="`/space/${space}`"
      :class="`toolbar__icon ${active === 'space' && 'toolbar__icon--active'}`"
    >
      <span class="material-icons-outlined"> sms </span>
    </router-link>

    <Alert v-if="showAlert === true" v-bind:alertData="alertData" />
  </div>
</template>

<script>
import { auth } from "../firebase/firebase";
import Alert from "./Alert";

export default {
  name: "Toolbar",
  components: {
    Alert,
  },
  props: {
    active: String,
    space: String,
  },

  data() {
    return {
      showAlert: false,
      nextSpace: this.space,

      alertData: {
        icon: "info",
        color: "#FFCA48",
        title: "Warning",
        text: "Opps, Something went wrong",
        state: this.setAlert,
        links: [
          {
            text: "Proceed",
            url: "/",
            action: () => {
              this.logout();
            },
          },
        ],
      },
    };
  },

  methods: {
    forFunds: function () {
      this.alertData = {
        icon: "monetization_on",
        color: "#A6A7B2",
        title: "Send Funds 🤲🏽",
        text: "Support Birdbox On NFT",
        state: this.setAlert,
        links: [
          {
            text: "Proceed",
            url: "#0",
            action: () => {
              return;
            },
          },
        ],
      };

      this.setAlert(true);
    },

    forRandom: function () {
      this.alertData = {
        icon: "shuffle",
        color: "#61D258",
        title: "Random Space",
        text: "You'll be added to a random birdbox space",
        state: this.setAlert,
        links: [
          {
            text: "Proceed",
            url: this.random(),
            action: () => {
              return;
            },
          },
        ],
      };

      this.random()
      this.setAlert(true);
    },

    forLogout: function () {
      this.alertData = {
        icon: "power_settings_new",
        color: "#FFCA48",
        title: "Sign Out",
        text: "You'll be signed out of Birdbox on all devices",
        state: this.setAlert,
        links: [
          {
            text: "Proceed",
            url: "/",
            action: () => {
              this.logout();
            },
          },
        ],
      };

      this.setAlert(true);
    },

    setAlert: function (condition) {
      this.showAlert = condition;
    },

    random: function () {
      return "/wahala dey";
    },

    logout: function () {
      auth.signOut();
    },
  },
};
</script>

<style lang="scss" scoped>
.toolbar {
  padding: 0.5rem;
  margin: 1rem 3rem;
  background-color: #2e333d;
  border-radius: 30px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: stretch;
}

.toolbar__icon {
  padding: 0.5rem 0;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  width: 18%;

  span {
    font-size: 1.6rem;
    color: #a6a7b2;
  }

  &--active {
    background-color: #272b34;

    span {
      font-size: 1.15rem;
      color: #ffffff;
    }
  }
}
</style>
