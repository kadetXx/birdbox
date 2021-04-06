<template>
  <div
    :class="
      current === true
        ? 'user user--current'
        : withName === true
        ? 'user user--withname'
        : 'user'
    "
  >
    <div
      :class="
        user.gender === 'Male'
          ? 'user__avatar user__avatar--male'
          : user.gender === 'Female'
          ? 'user__avatar user__avatar--female'
          : user.gender === 'Non binary'
          ? 'user__avatar user__avatar--non'
          : 'user__avatar user__avatar--bot'
      "
    >
      <span v-if="user.gender !== 'bot'" class="user__avatar-text">{{
        user.username.slice(0, 1)
      }}</span>
      <span v-else class="user__avatar-text"><i class="fas fa-robot"></i></span>

      <span
        v-if="withName === true"
        :class="
          user.online ? 'user__avatar-icon online' : 'user__avatar-icon offline'
        "
      >
      </span>
    </div>
    <div v-if="withName" class="user__details">
      <p class="user__username">
        {{ user.username.charAt(0).toUpperCase() + user.username.slice(1) }}
        <span v-if="user.admin" class="material-icons user__isadmin"
          >verified</span
        >
      </p>

      <span v-if="current === true" class="user__displayname">
        {{ user.displayName }}
      </span>
      <span v-else class="user__displayname">
        {{ user.online ? "active now" : "offline" }}
      </span>

      <i v-if="user.gender === 'Male'" class="fas fa-mars user__gender"></i>
      <i v-else-if="user.gender === 'Female'" class="fas fa-venus user__gender"></i>
      <i v-else class="fas fa-venus-mars user__gender"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "user",
  props: {
    user: Object,
    withName: Boolean,
    current: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  align-items: center;

  &__avatar {
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    margin: 0;
    position: relative;
    color: #fff;

    &-text {
      text-transform: uppercase;
      font-weight: bold;
    }

    &-icon {
      position: absolute;
      bottom: 0rem;
      right: 0rem;
      width: 0.6rem;
      height: 0.6rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1.5px solid #272b34;
      border-radius: 100%;

      font-size: 0.7rem;

      &.online {
        background-color: #61d258;
      }

      &.offline {
        background-color: #6a7488;
      }
    }
  }

  &__avatar--male {
    background-color: #557ade;
  }

  &__avatar--female {
    background-color: #f2507b;
  }

  &__avatar--bot {
    background-color: #5b5e65;
  }

  &__avatar--non {
    background-color: #9764C9;
  }

  &__details {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-left: 1rem;

    i {
      margin-top: 0.2rem;
      color: #6a7488;
    }
  }

  &__username {
    font-size: 1.1rem;
    color: #ffffff;
    display: flex;
    align-items: center;
    margin: 0;
    width: 100%;
  }

  &__displayname {
    color: #919398;
    margin: 0.2rem 0.5rem 0 0;
    font-weight: normal;
  }

  &__gender {
    position: relative;
    top: -0.1rem;
    font-size: 1.1rem;
  }

  &__isadmin {
    font-size: 0.8rem;
    color: #919398;
    text-transform: lowercase;
    margin-left: 0.5rem;
    font-weight: normal;
  }
}

.user--withname {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
}

.user--current {
  border-bottom: none;

  margin-bottom: 1rem;
  padding-bottom: 0;

  .user__username {
    font-size: 1.2rem;
  }
}
</style>
