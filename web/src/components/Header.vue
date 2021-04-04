<template>
  <div class="header">
    <h2 class="header__heading">{{ boxName }}</h2>
    <p class="header__text">
      <i class="fas fa-users header__icon"></i> {{ users.length }}
      <span class="header__text-inner">online</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    boxName: String,
  },

  data() {
    return {
      users: [],
    };
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
  // position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid #d4d4d4;
  padding: 1rem 2rem;
}

.header__heading {
  margin: 0;
  text-transform: uppercase;
  color: #505050;
  font-size: 1.3rem;
}

.header__text {
  color: #505050;
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
}

.header__text-inner {
  color: #71A61C;
  font-weight: bold;
}
</style>
