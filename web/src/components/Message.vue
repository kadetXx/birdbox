<template>
  <div ref="message" :class="`${message.class} message`">
    <Bird :user="message.user" :withName="false" />

    <div class="message__content-wrapper">
      <p class="message__username">
        {{ message.user.username }}
        <span v-if="message.user.admin" class="message__isadmin">(admin)</span>
      </p>
      <p class="message__content">
        {{ message.message }}
      </p>
    </div>
  </div>
</template>

<script>
import Bird from "./Bird";
export default {
  name: "Messages",
  components: {
    Bird,
  },
  props: {
    message: Object,

  },

  mounted() {
    console.log(this.$refs.message);
    this.$refs.message.scrollIntoView({behavior: 'smooth'});
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
