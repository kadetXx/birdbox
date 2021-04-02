<template>
  <div class="messages">
    <div class="messages__container">
      <Message v-bind:key="message.id" v-for="message in messages" :message="message" />
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
      messages: [
        {
          id: 1,
          bird: {
            id: 1,
            username: "Kadet",
            gender: "male",
            admin: true,
          },
          message: "Hello world",
          class: "message__right"
        },
        {
          id: 2,
          bird: {
            id: 2,
            username: "Ethel",
            gender: "female",
            admin: false,
          },
          message: "Another opportunity to be world class",
          class: "message__left"
        },
        {
          id: 2,
          bird: {
            id: 2,
            username: "Ethel",
            gender: "female",
            admin: false,
          },
          message: "Another opportunity to be world class",
          class: "message__left"
        },
        {
          id: 2,
          bird: {
            id: 2,
            username: "Ethel",
            gender: "female",
            admin: false,
          },
          message: "Another opportunity to be world class",
          class: "message__left"
        },
        {
          id: 2,
          bird: {
            id: 2,
            username: "Ethel",
            gender: "female",
            admin: false,
          },
          message: "Another opportunity to be world class",
          class: "message__left"
        },
        {
          id: 2,
          bird: {
            id: 2,
            username: "Ethel",
            gender: "female",
            admin: false,
          },
          message: "Another opportunity to be world class",
          class: "message__left"
        },
        {
          id: 2,
          bird: {
            id: 2,
            username: "Ethel",
            gender: "female",
            admin: false,
          },
          message: "Another opportunity to be world class",
          class: "message__left"
        },
        {
          id: 2,
          bird: {
            id: 2,
            username: "Ethel",
            gender: "female",
            admin: false,
          },
          message: "Another opportunity to be world class",
          class: "message__left"
        },
        {
          id: 2,
          bird: {
            id: 2,
            username: "Ethel",
            gender: "female",
            admin: false,
          },
          message: "Another opportunity to be world class",
          class: "message__left"
        },
        {
          id: 2,
          bird: {
            id: 2,
            username: "Ethel",
            gender: "female",
            admin: false,
          },
          message: "Another opportunity to be world class",
          class: "message__left"
        },
        {
          id: 2,
          bird: {
            id: 2,
            username: "Ethel",
            gender: "female",
            admin: false,
          },
          message: "Another opportunity to be world class",
          class: "message__left"
        },
      ],
    };
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
}

.messages__container {
  height: 100%;
  overflow: auto;
  padding: 1rem 4rem;
}
</style>
