<template>
  <div class="toolbar">
   
    
    <router-link to="/" class="toolbar__icon">
      <span class="material-icons-outlined"> power_settings_new </span>
    </router-link>

    <router-link to="/" class="toolbar__icon">
      <span class="material-icons-outlined"> credit_card </span>
    </router-link>
    
     <router-link to="/" class="toolbar__icon">
      <span class="material-icons-outlined"> roofing </span>
    </router-link>
    <router-link to="/" class="toolbar__icon">
      <span class="material-icons-outlined"> shuffle </span>
    </router-link>
    <router-link to="/" class="toolbar__icon toolbar__icon--active">
      <span class="material-icons-outlined"> sms </span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Toolbar",
  props: {
    active: String,
    space: String,
    nextSpace: String,
  },
};
</script>

<style lang="scss" scoped>
.toolbar {
  padding: 0.5rem ;
  margin: 1rem 3rem;
  background-color: #2e333d;
  border-radius: 30px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: stretch;
}

.toolbar__icon {
  padding: 0.5rem 0;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  width: 18%;
  
  span {
    font-size: 1.6rem;
    color: #a6a7b2;
  }

  &--active {
    background-color: #272b34;

    span {
      font-size: 1.15rem;
      color: #FFFFFF;
    }
  }
}
</style>
