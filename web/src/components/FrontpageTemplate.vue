<template>
  <div class="frontpage-template">
    <Logo :gender="'neutral'" />
    <slot></slot>
  </div>
</template>

<script>
import Logo from "./Logo";
export default {
  name: "Template",
  components: {
    Logo,
  },
};
</script>

<style lang="scss" scoped>
.frontpage-template {
  // margin-top: 6rem;
  padding: 8rem 4% 2rem;
  position: relative;
}
</style>
