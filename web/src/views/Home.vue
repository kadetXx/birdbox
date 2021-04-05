<template>
  <div class="home">
    <nav>
      <ul>
        <li><router-link to="/sign-in">Sign In</router-link></li>
        <li><router-link to="/create-space">Create Space</router-link></li>
      </ul>
    </nav>

    <h3>Available Spaces</h3>
    <ul>
      <li><router-link to="/space/general">General</router-link></li>
      <li><router-link to="/space/sports">Sports</router-link></li>
    </ul>
    
  </div>
</template>

<script>

export default {
  name: "Home",
};
</script>
<style lang="scss" scoped>

</style>
