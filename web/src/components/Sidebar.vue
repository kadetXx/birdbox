<template>
  <aside class="sidebar">
    <div class="header">
      <div to="/" class="header__link">
        <Bird v-if="birds.length !== 0" :bird="birds[0]" :withName="true" />
      </div>
      <form class="header__search">
        <i class="fa fa-search header__search-icon"></i>
        <input
          type="search"
          class="header__search-input"
          placeholder="Search birds"
        />
      </form>
    </div>

    <div class="birds">
      <Bird
        :bird="bird"
        :withName="true"
        v-bind:key="bird.id"
        v-for="bird in birds.slice(1)"
      />
    </div>
  </aside>
</template>

<script>
import Bird from "./Bird";
export default {
  name: "Sidebar",
  components: {
    Bird,
  },
  props: {
    boxName: String,
  },

  data() {
    return {
      birds: []
    }
  },

  created() {

    this.sockets.subscribe("roomUsers", (data) => {
      console.log('hollop');
      this.birds = data.users;
    });

  }
};
</script>

<style lang="scss" scoped>
.sidebar {
  width: 25%;
  background-color: #eff4f5;
  border-right: 1px solid #d4d4d4;
}

.header {
  width: 100%;
  padding: 1rem 0.5rem;
  border-bottom: 1px solid #d4d4d4;

  .header__link {
    font-size: 1.2rem;
    font-weight: bold;
    text-decoration: none;

    display: flex;
    align-items: flex-start;

    span {
      font-size: 0.8rem;
    }
  }

  .header__search {
    width: 100%;
    display: flex;
    align-items: center;
    margin: 0.5rem 0 0;
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    background-color: #ffffff;
    padding: 0.5rem;
  }

  .header__search-input {
    flex-grow: 1;
    border: none;
    outline: none;

    &::placeholder {
      color: #bdbdbd;
    }
  }

  .header__search-icon {
    font-size: 0.7rem;
    margin-right: 0.5rem;
    color: #868686;
  }
}

.birds {
  padding: 1rem;
}
</style>
