<template>
  <div class="alert">
    <div class="alert__inner">

      <button @click="alertData.state(false)" class="close">
        <span class="close__icon material-icons-outlined">close</span>
      </button>

      <span v-bind:style="{color: alertData.color}" class="alert__icon material-icons-outlined">
        {{ alertData.icon }}
      </span>

      <h3 class="alert__title">
        {{ alertData.title }}
      </h3>

      <p class="alert__text">
        {{ alertData.text }}
      </p>

      <div class="alert__buttons">
        <router-link
          class="alert__link"
          :key="index"
          v-for="(item, index) in alertData.links"
          :to="item.url"
        >
          <button @click="item.action()" class="alert__btn">
            {{ item.text }}
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: {
    alertData: Object,
  },
};
</script>

<style lang="scss" scoped>
.alert {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #272b34ea;
  text-align: center;
  z-index: 10;
}


.alert__inner {
  width: 40%;
  height: fit-content;
  background-color: #2e333d;
  color: #fff;
  padding: 4rem 2rem 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  position: relative;

  @media screen and (max-width: 1035px) {
    width: 50%;
  }

  @media screen and (max-width: 900px) {
    width: 70%;
  }

  @media screen and (max-width: 525px) {
    width: 90%;
  }
}


.close {
  position: absolute;
  right: 2rem;
  top: 2rem;
  background-color: transparent;
  border: none;
  outline: none;
  color: #a6a7b2;
  cursor: pointer;
}

.alert__icon {
  font-size: 5rem;
  margin-bottom: 1rem;
  // color: #FFCA48;
}

.alert__title {
  font-size: 1.5rem;
  margin: 0 0 0.3rem;
}

.alert__text {
  color: #a6a7b2;
  margin: 1rem 0 0;
  font-weight: 300;
  line-height: 1.5;
  padding: 0 5%;
}

.alert__buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  width: 100%;
  margin-top: 1rem;
}

.alert__link {
  display: flex;
  justify-content: stretch;
  align-items: center;
  flex-grow: 1;
  margin: 0 0.2rem;
  text-decoration: none;
}

.alert__btn {
  border-radius: 30px;
  padding: 1rem 0;
  border: none;
  outline: none;
  background-color: #EB7A4F;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
  width: 100%;
}
</style>
