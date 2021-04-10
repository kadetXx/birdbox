<template>
  <div class="space">
    <router-link :to="`/space/${space.space}`">
      <h3 class="space__title">
        {{ space.space.charAt(0).toUpperCase() + space.space.slice(1) }}
      </h3>

      <ul v-if="space.total !== 0" class="space__users">
        <li
          :key="user.id + index"
          v-for="(user, index) in space.users.slice(0, 6)"
          class="space__user"
        >
          {{ user.username }}
          <span v-if="user.admin" class="material-icons user__isadmin"
            >verified</span
          >
          <span v-if="index + 1 !== space.users.slice(0, 6).length">,</span>
          <span v-else-if="index + 1 > 5">...</span>
        </li>
      </ul>

      <div class="space__details">
        <p class="space__info">
          <span class="material-icons-outlined space__infoicon orange">
            people
          </span>
          <span class="space__infotext">
            {{ space.total }}
            {{ space.total === 1 ? "member" : "members" }}</span
          >
        </p>

        <p class="space__info">
          <span class="material-icons space__infoicon-lg blue"> male </span>
          <span class="space__infotext"> {{ space.males }} </span>
        </p>

        <p class="space__info">
          <span class="material-icons space__infoicon-lg pink"> female </span>
          <span class="space__infotext"> {{ space.females }} </span>
        </p>

        <p class="space__info">
          <i class="fas fa-venus-mars space__infoicon purple"></i>
          <span class="space__infotext"> {{ space.nonBinary }} </span>
        </p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    space: Object
  }
}
</script>

<style lang="scss" scoped>
.space {
  text-decoration: none;
  padding: 1rem 2rem;
  width: 100%;
  background-color: #373d4963;
  border-radius: 15px;
  margin-bottom: 1rem;
  cursor: pointer;
  border: 1px solid #eb7b4f1a;

  a {
    all: unset;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  &__title {
    margin: 0 0 0.4rem;
    font-size: 1.1rem;
  }

  &__users {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 1.5rem 0;

    .space__user {
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      margin-right: 0.5rem;
      // color: #A6A7B2;
      color: #fff;
      opacity: 0.7;
      line-height: 1.5;

      span,
      i {
        font-size: 0.8rem;
        margin-left: 0.2rem;
      }
    }
  }

  &__details {
    display: flex;
    align-items: center;
    opacity: 0.8;

    .space__info:nth-child(2) {
      margin-left: auto;
    }

    .space__info {
      margin: 0 0.7rem 0 0;
      font-size: 0.8rem;
      display: flex;
      align-items: center;

      &icon {
        font-size: 0.9rem;
        margin-right: 0.2rem;
      }

      &icon-lg {
        font-size: 1.2rem;
        margin-right: 0.1rem;
      }
    }
  }
}
</style>
