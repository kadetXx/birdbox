<template>
  <div
    v-if="message.user.id !== undefined"
    ref="message"
    :class="`${timeStamp} ${message.class} ${
      hasSibling === true ? 'tweak-border' : ''
    } message`"
  >
    <Bird :user="message.user" :withName="false" />

    <div class="message__content-wrapper">
      <p class="message__content">
        <small :class="`message__username ${message.user.gender}`">
          {{
            message.user.username.charAt(0).toUpperCase() +
            message.user.username.slice(1)
          }}
          <span v-if="message.user.gender === 'bot'" class="message__isbot"
            >• bot</span
          >
          <span
            v-if="message.user.admin"
            class="material-icons message__isadmin"
            >verified</span
          >
        </small>

        <span
          v-if="
            message.message.includes(
              'https://' ||
                'http://' ||
                '.com' ||
                '.dev' ||
                '.org' ||
                '.net' ||
                '.co.uk'
            )
          "
          v-html="
            `<a href='${message.message}'> 
          ${message.message} </a>`
          "
        ></span>

        <span v-else>{{ message.message }} </span>
      </p>
      <p class="message__timestamp">
        {{ timeStamp }}
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
    triggerAlert: Function
  },

  data() {
    return {
      timeStamp: null,
      hasSibling: false,
    };
  },

  mounted() {
    // fetch message timestamp is created
    const date = new Date();
    const hours = date.getHours();
    const mins = String(date.getMinutes());

    // create timestamp string
    const time = `${hours}:${mins.length < 2 ? "0" + mins : mins} ${
      hours < 12 ? "AM" : "PM"
    }`;

    // set message timestamp to timestamp string
    this.timeStamp = time;

    if (this.$refs.message !== undefined) {
      // get previous message from dom
      const previousMsg = this.$refs.message.previousSibling;

      // check if timestamp from previous message is the same with current timestamp
      if (previousMsg.classList !== undefined) {
        const previousTime = `${previousMsg.classList[0]} ${previousMsg.classList[1]} ${previousMsg.classList[2]}`;

        // add spacing to message accordingly
        if (previousTime === `${this.timeStamp} ${this.message.class}`) {
          previousMsg.classList.add("no-space");
          this.hasSibling = true;
        } else {
          this.hasSibling = false;
        }
      }

      // scroll to last message
      this.$refs.message.scrollIntoView({ behavior: "smooth" });
    } else {
      console.log('reload');
      this.triggerAlert(true)
    }
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
  overflow-wrap: anywhere;

  &__right {
    flex-direction: row-reverse;
    padding-left: 40%;

    .message__content {
      padding: 0.7rem 1.2rem 0.8rem;
      border-radius: 15px 15px 0 15px;
      background-color: #557ade;
      color: #ffffff;

      &.Male {
        background-color: #557ade;
      }

      &.Female {
        background-color: #f2507b;
      }

      &.Non {
        background-color: #9764c9;
      }
    }

    .user {
      display: none;
    }

    .message__username {
      display: none;
    }

    .message__timestamp {
      text-align: right;
    }
  }

  &__left {
    justify-content: flex-start;
    padding-right: 40%;

    .message__content {
      padding: 0.7rem 1.2rem 0.9rem;
      border-radius: 15px 15px 15px 0;
      background-color: #343943;
      color: #a6a7b2;
    }

    .user {
      margin-right: 0.5rem;
    }

    .message__username {
      display: flex;
      align-items: center;

      &.Male {
        color: #557ade;
      }

      &.Female {
        color: #f2507b;
      }

      &.Non {
        color: #9764c9;
      }

      &.bot {
        color: #ffffff;
      }
    }
  }
}

.message__content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  .message__username {
    margin: 0 0 0.4rem;
    font-size: 0.8rem;
    color: grey;
  }

  .message__content {
    width: fit-content;
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .message__timestamp {
    margin: 0.3rem 0;
    font-size: 0.65rem;
    color: grey;
  }

  .message__isadmin {
    color: grey;
    margin-left: 0.3rem;
    font-size: 0.7rem;
  }

  .message__isbot {
    color: grey;
    margin-left: 0.2rem;
  }
}

.message__right.no-space {
  margin-bottom: 0.2rem;

  .message__timestamp {
    display: none;
  }
}

.message__right.tweak-border {
  .message__content {
    border-radius: 15px 0 0 15px;
  }
}

.message__left.no-space {
  margin-bottom: 0.2rem;

  .message__timestamp {
    display: none;
  }

  .user {
    visibility: hidden;
  }
}

.message__left.tweak-border {
  .message__content {
    border-radius: 0 15px 15px 0;
  }
}
</style>
