<template>
  <div
    v-if="message.user.id !== undefined"
    ref="message"
    :class="`${message.timeStamp} ${message.class} ${message.user.id} message ${
      hasSibling === true ? 'tweak-border' : ''
    }`"
  >
    <Bird :user="message.user" :withName="false" />

    <div class="message__content-wrapper">
      <p :class="`message__content ${message.user.gender}`">
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

        <span class="message__link" v-if="isLink" v-html="url"></span>

        <span v-else>{{ message.message }} </span>
      </p>
      <p class="message__timestamp">
        {{ message.timeStamp }}
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
    triggerAlert: Function,
    withSmoothScroll: Boolean,
  },

  data() {
    return {
      hasSibling: false,
    };
  },

  computed: {
    isLink: function () {
      let isLink = false;
      const urlMatchers = [
        "https://",
        "http://",
        ".com",
        ".dev",
        ".org",
        ".edu",
        ".net",
        ".co",
      ];

      urlMatchers.forEach((matcher) => {
        if (this.message.message.includes(matcher)) {
          isLink = true;
        }
      });

      return isLink;
    },

    url: function () {
      let html = `<a href='${this.message.message}' target='_blank'> ${this.message.message} </a>`;

      const includesHttpProtocol = this.message.message.includes("http://");
      const includesHttpsProtocol = this.message.message.includes("https://");

      if (!includesHttpProtocol && !includesHttpsProtocol) {
        html = `<a href='http://${this.message.message}' target='_blank'> ${this.message.message} </a>`;
      }

      return html;
    },
  },

  mounted() {
    if (this.$refs.message !== undefined) {
      // get previous message from dom
      // const currentMsg = this.$refs.message;
      const previousMsg = this.$refs.message.previousSibling;

      // check if timestamp from previous message is the same with current timestamp
      if (previousMsg.classList !== undefined) {
        const previousTime = `${previousMsg.classList[0]} ${previousMsg.classList[1]} ${previousMsg.classList[2]} ${previousMsg.classList[3]}`;

        // add spacing to message accordingly
        if (
          previousTime ===
          `${this.message.timeStamp} ${this.message.class} ${this.message.user.id}`
        ) {
          previousMsg.style.margin = '0 0 0.2rem 0';
          previousMsg.querySelector(".message__timestamp").style.display = 'none';
          previousMsg.querySelector(".user").style.visibility = 'hidden';
          this.hasSibling = true;
        } else {
          this.hasSibling = false;
        }
      }

      // scroll to last message
      this.withSmoothScroll &&
        this.$refs.message.scrollIntoView({ behavior: "smooth" });
    } else {
      this.triggerAlert(true);
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

  /* START CSS WORD WRAP FOR MESSAGES - BY CSS TRICKS */

  /* These are technically the same, but use both */
  overflow-wrap: break-word;
  word-wrap: break-word;

  -ms-word-break: break-all;
  /* This is the dangerous one in WebKit, as it breaks things wherever */
  word-break: break-all;
  /* Instead use this non-standard one: */
  word-break: break-word;

  /* Adds a hyphen where the word breaks, if supported (No Blink) */
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;

  /* END CSS WORD WRAP FOR MESSAGES - BY CSS TRICKS */

  .message__link {
    text-decoration: underline;
  }

  &__right {
    flex-direction: row-reverse;
    padding-left: 40%;

    @media screen and (max-width: 600px) {
      padding-left: 20%;
    }

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

    @media screen and (max-width: 600px) {
      padding-right: 20%;
    }

    .message__content {
      padding: 0.7rem 1.2rem 0.9rem;
      border-radius: 15px 15px 15px 0;
      background-color: #343943;
      color: #d3d4e6;
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
