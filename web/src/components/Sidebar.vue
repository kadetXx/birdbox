<template>
  <aside class="sidebar">
    <div class="header">
      <div to="/" class="header__link">
        <div class="bird">
          <div
            :class="
              birds[0].gender === 'male'
                ? 'bird__avatar bird__avatar--male'
                : 'bird__avatar bird__avatar--female'
            "
          >
            <span class="bird__avatar-text">{{
              birds[0].username.slice(0, 1)
            }}</span>
            <span class="bird__avatar-icon">
              <i v-if="birds[0].gender === 'male'" class="fas fa-mars"></i>
              <i v-else-if="birds.gender === 'female'" class="fas fa-venus"></i>
            </span>
          </div>
          <p class="bird__username">
            {{ birds[0].username }}
            <span v-if="birds[0].admin" class="bird__isadmin">(admin)</span>
          </p>
        </div>
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
      <div class="bird" v-bind:key="bird.id" v-for="bird in birds.slice(1)">
        <div
          :class="
            bird.gender === 'male'
              ? 'bird__avatar bird__avatar--male'
              : 'bird__avatar bird__avatar--female'
          "
        >
          <span class="bird__avatar-text">{{ bird.username.slice(0, 1) }}</span>
          <span class="bird__avatar-icon">
            <i v-if="bird.gender === 'male'" class="fas fa-mars"></i>
            <i v-else-if="bird.gender === 'female'" class="fas fa-venus"></i>
          </span>
        </div>
        <p class="bird__username">
          {{ bird.username }}
          <span v-if="bird.admin" class="bird__isadmin">(admin)</span>
        </p>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    boxName: String,
    birds: Array,
  },
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

.bird {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;

  &__avatar {
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    margin-right: 0.5rem;
    position: relative;
    color: #fff;

    &-icon {
      position: absolute;
      bottom: -10px;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #eff4f5;
      border-radius: 100%;
    }
  }

  &__avatar--male {
    // border: 2px solid #3e76b6;
    background-color: #3e76b6;

    .bird__avatar-icon {
      color: #3e76b6;
    }
  }

  &__avatar--female {
    // border: 2px solid rosybrown;
    background-color: rosybrown;

    .bird__avatar-icon {
      color: rosybrown;
    }
  }

  &__username {
    font-size: 1.1rem;
    color: #505050;
    display: flex;
    align-items: center;
  }

  &__isadmin {
    font-size: 0.8rem;
    color: #71a61c;
    text-transform: lowercase;
    margin-left: 0.5rem;
    font-weight: normal;
  }
}
</style>
