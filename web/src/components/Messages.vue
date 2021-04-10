<template>
  <div class="messages">
    <div ref="scroll" class="messages__container">
      <div v-if="oldMessages !== null">
        <Message
          :withSmoothScroll="false"
          :triggerAlert="setAlert"
          v-bind:key="message.id"
          v-for="message in oldMessages"
          :message="message"
        />
      </div>

      <Message
        :withSmoothScroll="true"
        :triggerAlert="setAlert"
        v-bind:key="message.id"
        v-for="message in messages"
        :message="message"
      />
    </div>
    <Preloader v-if="loading" />
    <Alert v-if="showAlert === true" v-bind:alertData="alertData" />
  </div>
</template>

<script>
import Message from "./Message";
import Alert from "./Alert";
import Preloader from "./Preloader";
export default {
  name: "Messages",
  props: {
    space: String,
    user: Object,
  },
  components: {
    Message,
    Alert,
    Preloader,
  },

  data() {
    return {
      loading: true,
      messages: [],
      oldMessages: null,
      alertData: {
        icon: "info",
        color: "#FFCA48",
        title: "E Choke",
        text:
          "Something happened, We're not sure what exactly it is but a simple refresh should fix it",
        state: this.setAlert,
        links: [
          {
            text: "Reload Now",
            url: "#",
            action: () => {
              window.location = `/space/${this.space}`;
            },
          },
        ],
      },
    };
  },

  methods: {
    setAlert: function (condition) {
      this.showAlert = condition;
    },
  },

  watch: {
    oldMessages() {
      setTimeout(() => {
        this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight;
        this.loading = false;
      }, 500);
    },
  },

  created() {
    this.$socket.emit("getOldMessages", this.space.toLowerCase());

    this.sockets.subscribe("message", (data) => {
      this.messages.push(data);
    });

    this.sockets.subscribe("oldMessages", (data) => {
      const messages = data.map((item) => {
        return {
          ...item,
          class:
            item.user.id !== this.user.id ? "message__left" : "message__right",
        };
      });

      this.oldMessages = messages;
    });
  },
};
</script>

<style lang="scss" scoped>
.messages {
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;

  ::-webkit-scrollbar-track {
    background-color: #2e333d;
  }
}

.messages__container {
  height: 100%;
  overflow: auto;
  padding: 1rem 2.6rem 0 0;

  @media screen and (max-width: 600px) {
    padding: 1rem 0.5rem 0 0;
  }
}
</style>
