<template>
  <div ref="message" :class="`${message.class} message`">
    <Bird :user="message.user" :withName="false" />

    <div class="message__content-wrapper">
      <p class="message__content">
        {{ message.message }}
      </p>
      <p :class="`message__username ${message.user.gender}`">
        {{
          message.user.username.charAt(0).toUpperCase() +
          message.user.username.slice(1)
        }}
        <span v-if="message.user.admin" class="message__isadmin">(admin)</span>
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
    this.$refs.message.scrollIntoView({ behavior: "smooth" });
  },
};
</script>

<style lang="scss" scoped>
.message {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  width: 100%;
  margin-bottom: 22.5px;

  &__right {
    flex-direction: row-reverse;
    text-align: right;
    padding-left: 20%;

    .message__content {
      border-radius: 15px 15px 0 15px;
      background-color: #60cf57;
      background-color: #557ade;
      color: #ffffff;
    }

    .user {
      display: none;
    }
  }

  &__left {
    justify-content: flex-start;
    padding-right: 20%;

    .message__content {
      border-radius: 15px 15px 15px 0;
      background-color: #343943;
      color: #a6a7b2;
    }

    .user {
      margin-right: 0.5rem;
    }

    .message__username {

      &.Male {
        color: #557ade;
      }

      &.Female {
        color: #f2507b;
      }
    }
  }
}

.message__content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  .message__username {
    margin: 0.1rem 0;
    font-size: 0.8rem;
    color: grey;
  }

  .message__content {
    padding: 0.7rem 1.2rem;
    width: fit-content;
    margin: 0;
    font-size: 0.9rem;
  }

  .message__isadmin {
    color: red;
    font-size: 0.7rem;
  }
}
</style>
