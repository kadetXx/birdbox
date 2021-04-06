<template>
  <div class="header">
    <div class="header__main">
      <div class="header__icon-wrap">
        <span class="material-icons"> forum </span>
      </div>
      <div class="header__text-wrap">
        <h2 class="header__heading">
          {{ space.charAt(0).toUpperCase() + space.slice(1) }}
        </h2>
        <p class="header__text">
          <!-- <i class="fas fa-users header__text-icon"></i> -->
          {{ users.length }} members, {{ online.length }} online
        </p>
      </div>
    </div>

    <div class="header__btns">
      <button
        title="Exit This Space"
        class="header__btn"
        @click="setAlert(true)"
      >
        <span class="material-icons-outlined"> logout </span>
      </button>
    </div>
    <Alert v-if="showAlert === true" v-bind:alertData="alertData" />
  </div>
</template>

<script>
import Alert from "./Alert";

export default {
  name: "Header",
  props: {
    space: String,
    user: Object,
  },
  components: {
    Alert,
  },

  data() {
    return {
      users: [],
      showAlert: false,
      alertData: {
        icon: "logout",
        color: "#FFCA48",
        title: "Exit Space",
        text: "You're about to leave this space",
        state: this.setAlert,
        links: [
          {
            text: "Proceed",
            url: "/",
            action: () => {
              this.leaveSpace();
            },
          },
        ],
      },
    };
  },

  computed: {
    online: function () {
      return this.users.filter((item) => item.online === true);
    },
  },

  methods: {
    leaveSpace() {
      this.$socket.emit("leaveSpace", { ...this.user, space: this.space });
    },

    setAlert: function (condition) {
      this.showAlert = condition;
    },
  },

  created() {
    this.sockets.subscribe("spaceUsers", (data) => {
      this.users = data.users;
    });
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #363c48;
  padding: 0 0 1.2rem;
  margin-right: 3rem;
  box-sizing: border-box;
}

.header__main {
  flex-grow: 1;
  display: flex;
}

.header__icon-wrap {
  display: none;
  margin-right: 0.8rem;
  background-color: #61d258;
  // display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem;
  border-radius: 10px;

  span {
    font-size: 3rem;
    color: #ffffff;
  }
}

.header__heading {
  margin: 0;
  width: 100%;
  color: #ffffff;
  font-size: 1.8rem;
}

.header__text {
  color: #919398;
  margin: 0.5rem 1rem 0 0;
  font-size: 0.9rem;
}

.header__text-icon {
  color: #61d158;
  margin-right: 0.1rem;
}

.header__btn {
  color: #aeb0b4;
  background-color: #343943;
  padding: 0.8rem 0.8rem;
  border: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  i {
    transform: scale(1.3);
  }
}
</style>
