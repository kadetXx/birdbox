<template>
  <div class="logo">
    <div :class="`logo__wrap ${gender}`">
      <i class="fab fa-earlybirds logo__icon"></i>
      <span class="logo__fake-eye"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    gender: String
  }
}
</script>

<style lang="scss" scoped>
.logo {
  position: absolute;
  left: 4%;
  top: 2rem;
  display: flex;
  align-items: center;
  width: fit-content;

  .logo__wrap {
    position: relative;
    font-size: 2.5rem;
    color: #557ADE;
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #557ADE;
    border-radius: 15px;

    &.Female {
      background-color: #f2507b;
    }

    &.Non {
      background-color: #9764c9;
    }
  }

  .logo__icon {
    z-index: 5;
    color: #272B34;
  }

  .logo__fake-eye {
    width: 1.6rem;
    height: 0.9rem;
    background-color: #FFF;
    opacity: 0.8;
    position: absolute;
    margin-bottom: 0.6rem;
  }
}
</style>