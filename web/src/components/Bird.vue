<template>
  <div class="bird">
    <div
      :class="
        bird.gender === 'male'
          ? 'bird__avatar bird__avatar--male'
          : 'bird__avatar bird__avatar--female'
      "
    >
      <span class="bird__avatar-text">{{ bird.username.slice(0, 1) }}</span>
      <span class="bird__avatar-icon">
        <i v-if="bird.gender === 'male'" class="fas fa-mars"></i>
        <i v-else-if="bird.gender === 'female'" class="fas fa-venus"></i>
      </span>
    </div>
    <p v-if="withName" class="bird__username">
      {{ bird.username }}
      <span v-if="bird.admin" class="bird__isadmin">(admin)</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "Bird",
  props: {
    bird: Object,
    withName: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.bird {
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
</style>
