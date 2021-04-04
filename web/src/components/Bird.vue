<template>
  <div class="user">
    <div
      :class="
        user.gender === 'male'
          ? 'user__avatar user__avatar--male'
          : user.gender === 'female' ? 'user__avatar user__avatar--female'
          : 'user__avatar user__avatar--bot'
      "
    >
      <span v-if="user.gender !== 'bot' " class="user__avatar-text">{{ user.username.slice(0, 1) }}</span>
      <span v-else class="user__avatar-text"><i  class="fas fa-robot"></i></span>

      <span class="user__avatar-icon">
        <i v-if="user.gender === 'male'" class="fas fa-mars"></i>
        <i v-else-if="user.gender === 'female'" class="fas fa-venus"></i>
        <i v-else class="far fa-smile-beam"></i>
      </span>
    </div>
    <p v-if="withName" class="user__username">
      {{ user.username }}
      <span v-if="user.admin" class="user__isadmin">(admin)</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "user",
  props: {
    user: Object,
    withName: Boolean,
  },

  created() {
    console.log(this.user);
  }
};
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;

  &__avatar {
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    margin: 0 0.5rem;
    position: relative;
    color: #fff;

    &-icon {
      position: absolute;
      bottom: -10px;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #eff4f5;
      border-radius: 100%;
    }
  }

  &__avatar--male {
    // border: 2px solid #3e76b6;
    background-color: #3e76b6;

    .user__avatar-icon {
      color: #3e76b6;
    }
  }

  &__avatar--female {
    // border: 2px solid rosybrown;
    background-color: rosybrown;

    .user__avatar-icon {
      color: rosybrown;
    }
  }

  &__avatar--bot {
    background-color: grey;

    .user__avatar-icon {
      color: grey;
    }
  }

  &__username {
    font-size: 1.1rem;
    color: #505050;
    display: flex;
    align-items: center;
  }

  &__isadmin {
    font-size: 0.8rem;
    color: #71a61c;
    text-transform: lowercase;
    margin-left: 0.5rem;
    font-weight: normal;
  }
}
</style>
