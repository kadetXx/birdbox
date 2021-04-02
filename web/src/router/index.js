import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import ChatRoom from '../views/ChatRoom.vue'

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
    path: "/box/:box",
    name: "ChatRoom",
    component: ChatRoom
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
