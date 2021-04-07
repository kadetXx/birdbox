<template>
  <div class="toolbar">
    <router-link
      :to="user !== null && user !== undefined ? '#' : '/sign-in'"
      @click="forLogout"
      class="toolbar__icon"
    >
      <span class="material-icons-outlined">
        {{
          user !== null && user !== undefined ? "power_settings_new" : "vpn_key"
        }}
      </span>
    </router-link>

    <router-link to="#" @click="forFunds" class="toolbar__icon">
      <span class="material-icons-outlined"> credit_card </span>
    </router-link>

    <router-link
      to="/"
      :class="`toolbar__icon ${active === 'home' && 'toolbar__icon--active'}`"
    >
      <span class="material-icons-outlined"> roofing </span>
    </router-link>
    <router-link to="#" @click="forRandom" class="toolbar__icon">
      <span class="material-icons-outlined"> control_point_duplicate </span>
    </router-link>
    <router-link
      :to="`/space/${space === undefined ? lastSpace : space}`"
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
    user: Object
  },

  data() {
    return {
      showAlert: false,
      lastSpace: sessionStorage.getItem('lastSpace'),
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
        icon: "control_point_duplicate",
        color: "#61D258",
        title: "New Space",
        text: "Create a new birdbox space",
        state: this.setAlert,
        links: [
          {
            text: "Proceed",
            url: '/create-space',
            action: () => {
              return;
            },
          },
        ],
      };

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

      this.user !== null && this.user !== undefined && this.setAlert(true);
    },

    setAlert: function (condition) {
      this.showAlert = condition;
    },

    logout: function () {
      auth.signOut();
      this.showAlert(false)
    },
  },
};
</script>

<style lang="scss" scoped>
.toolbar {
  padding: 0.5rem;
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
