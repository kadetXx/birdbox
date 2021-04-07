import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Space from '../views/Space.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/sign-in",
    name: "SignIn",
   
    component: () =>
      import(/* webpackChunkName: "sign-in" */ "../views/SignIn.vue"),
  },
  {
    path: "/create-space",
    name: "CreateSpace",
   
    component: () =>
      import(/* webpackChunkName: "create-space" */ "../views/CreateSpace.vue"),
  },
  {
    path: "/space/:space",
    name: "Space",
    component: Space
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
