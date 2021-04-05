<template>
  <div class="messages">
    <div class="messages__container">
      <Message
        v-bind:key="message.id"
        v-for="message in messages"
        :message="message"
      />
    </div>
  </div>
</template>

<script>
import Message from "./Message";
export default {
  name: "Messages",
  components: {
    Message,
  },

  data() {
    return {
      messages: [],
    };
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
		background-color: #2E333D;
	}
}

.messages__container {
  height: 100%;
  overflow: auto;
  padding: 1rem 2.6rem 0 0;
  
}
</style>
