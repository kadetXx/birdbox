<template>
  <div class="messages">
    <div class="messages__container">
      <Message
        :triggerAlert="setAlert"
        v-bind:key="message.id"
        v-for="message in messages"
        :message="message"
      />
    </div>

    <Alert v-if="showAlert === true" v-bind:alertData="alertData" />
  </div>
</template>

<script>
import Message from "./Message";
import Alert from "./Alert";
export default {
  name: "Messages",
  props: {
    space: String,
  },
  components: {
    Message,
    Alert
  },

  data() {
    return {
      messages: [],
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

  created() {
    this.sockets.subscribe("message", (data) => {
      this.messages.push(data);
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
}
</style>
