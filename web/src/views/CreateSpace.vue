<template>
  <div class="create">
    <Template :pageType="'create'" :gender="user.gender">
      <div class="title">
        <h1 class="title__heading">Create Space 🐣 </h1>
        <p class="title__subheading">Just a topic for your space and zoom</p>
      </div>
      <form class="form">
        <input
          v-model="space"
          type="text"
          class="form__input"
          placeholder="Name your space"
        />

        <button @click.prevent="createSpace()" :class="`form__btn ${user.gender}`">Create</button>
      </form>
    </Template>
  </div>
</template>

<script>
import Template from "../components/FormpageTemplate";
export default {
  name: "SignIn",
  components: {
    Template,
  },
  data() {
    return {
      space: "",
      user: this.$attrs.user,
    };
  },

  methods: {
    createSpace() {
      const user = {
        ...this.user,
        online: true,
      };

      const space = this.space.toLowerCase();

      // emit joinSpace event to server
      this.$socket.emit("joinSpace", { ...user, space });
      this.$router.push(`/space/${this.space.toLowerCase()}`);
    },
  },

  created() {
    const isAuthenticated = this.user !== null && this.user !== undefined;

    if (!isAuthenticated) {
      this.$router.push("/sign-in");
    }
  },
};
</script>

<style lang="scss" scoped>
.create {
  width: 100%;
  height: 100%;
}
</style>
