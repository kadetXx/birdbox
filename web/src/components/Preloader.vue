<template>
  <div class="preloader">
    <div class="preloader__inner">
      <Logo />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        style="
          margin: auto;
          background: none;
          display: block;
          shape-rendering: auto;
        "
        width="200px"
        height="200px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle cx="84" cy="50" r="10" fill="#ffffff">
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="0.5319148936170213s"
            calcMode="spline"
            keyTimes="0;1"
            values="10;0"
            keySplines="0 0.5 0.5 1"
            begin="0s"
          ></animate>
          <animate
            attributeName="fill"
            repeatCount="indefinite"
            dur="2.127659574468085s"
            calcMode="discrete"
            keyTimes="0;0.25;0.5;0.75;1"
            values="#ffffff;#ffffff;#ffffff;#ffffff;#ffffff"
            begin="0s"
          ></animate>
        </circle>
        <circle cx="16" cy="50" r="10" fill="#ffffff">
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="2.127659574468085s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="0;0;10;10;10"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="0s"
          ></animate>
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="2.127659574468085s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="16;16;16;50;84"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="0s"
          ></animate>
        </circle>
        <circle cx="50" cy="50" r="10" fill="#ffffff">
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="2.127659574468085s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="0;0;10;10;10"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-0.5319148936170213s"
          ></animate>
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="2.127659574468085s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="16;16;16;50;84"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-0.5319148936170213s"
          ></animate>
        </circle>
        <circle cx="84" cy="50" r="10" fill="#ffffff">
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="2.127659574468085s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="0;0;10;10;10"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-1.0638297872340425s"
          ></animate>
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="2.127659574468085s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="16;16;16;50;84"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-1.0638297872340425s"
          ></animate>
        </circle>
        <circle cx="16" cy="50" r="10" fill="#ffffff">
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="2.127659574468085s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="0;0;10;10;10"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-1.5957446808510638s"
          ></animate>
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="2.127659574468085s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="16;16;16;50;84"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-1.5957446808510638s"
          ></animate>
        </circle>
        <!-- [ldio] generated by https://loading.io/ -->
      </svg>
    </div>
  </div>
</template>

<script>
import Logo from "../components/Logo";

export default {
  name: "Preloader",
  components: {
    Logo,
  },
};
</script>

<style lang="scss" scoped>
.preloader {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #272b34;
}

.preloader__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  svg {
    position: absolute;
    bottom: -7rem;
    transform: scale(0.15);
  }
}
</style>
