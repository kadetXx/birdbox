<template>
  <div class="create">
    <Template>
      <h1 class="header">Create Space</h1>
      <form class="form">
        <input
          v-model="space"
          type="text"
          class="form__input"
          placeholder="Name your space"
        />

        <button @click.prevent="createSpace()" class="form__btn">Create</button>
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

      const space = this.space;

      // emit joinSpace event to server
      this.$socket.emit("joinSpace", { ...user, space });
      this.$router.push(`/space/${this.space}`);
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
