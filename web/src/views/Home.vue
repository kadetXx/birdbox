<template>
  <div class="home">
    <Template>
      <h3>Actions</h3>
      <nav>
        <ul>
          <li><router-link to="/sign-in">Sign In</router-link></li>
          <li><router-link to="/create-space">Create Space</router-link></li>
        </ul>
      </nav>

      <h3>Available Spaces</h3>
      <nav>
        <ul>
          <li><router-link to="/space/general">General</router-link></li>
          <li><router-link to="/space/sports">Sports</router-link></li>
        </ul>
      </nav>
    </Template>
  </div>
</template>

<script>
import Template from "../components/FrontpageTemplate";
export default {
  name: "Home",
  components: {
    Template,
  },
};
</script>
<style lang="scss" scoped>
li {
  margin: 0.5rem 0;
}
</style>
