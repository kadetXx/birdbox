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
    path: "/about",
    name: "About",
   
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/sign-in",
    name: "SignIn",
   
    component: () =>
      import(/* webpackChunkName: "sign-in" */ "../views/SignIn.vue"),
  },
  {
    path: "/sign-up",
    name: "SignUp",
   
    component: () =>
      import(/* webpackChunkName: "sign-up" */ "../views/SignUp.vue"),
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
