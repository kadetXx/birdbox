<template>
  <div :class="`${message.class} message`">
    <div class="bird">
      <div
        :class="
          message.bird.gender === 'male'
            ? 'bird__avatar bird__avatar--male'
            : 'bird__avatar bird__avatar--female'
        "
      >
        <span class="bird__avatar-text">{{
          message.bird.username.slice(0, 1)
        }}</span>
        <span class="bird__avatar-icon">
          <i v-if="message.bird.gender === 'male'" class="fas fa-mars"></i>
          <i
            v-else-if="message.bird.gender === 'female'"
            class="fas fa-venus"
          ></i>
        </span>
      </div>
    </div>

    <div class="message__content-wrapper">
      <p class="message__username">
        {{ message.bird.username }}
        <span v-if="message.bird.admin" class="message__isadmin">(admin)</span>
      </p>
      <p class="message__content">
        {{ message.message }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Messages",
  props: {
    message: Object,
  },
};
</script>

<style lang="scss" scoped>
.message {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  width: 100%;

  &__right {
    flex-direction: row-reverse;
    text-align: right;
    padding-left: 20%;

    .message__content-wrapper {
      border-radius: 15px 15px 0 15px;
    }
  }

  &__left {
    justify-content: flex-start;
    padding-right: 20%;

    .message__content-wrapper {
      border-radius: 15px 15px 15px 0;
    }
  }
}

.bird {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  width: fit-content;

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

    .bird__avatar-icon {
      color: #3e76b6;
    }
  }

  &__avatar--female {
    // border: 2px solid rosybrown;
    background-color: rosybrown;

    .bird__avatar-icon {
      color: rosybrown;
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

.message__content-wrapper {
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;
  background-color: #eff4f5;
  border-radius: 10px;
  width: fit-content;
  margin-bottom: 22.5px;

  .message__username {
    margin: 0;
    font-size: 0.8rem;
    color: grey;
  }

  .message__isadmin {
    color: red;
    font-size: 0.7rem;
  }
}
</style>
