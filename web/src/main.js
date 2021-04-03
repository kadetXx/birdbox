import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";

const user = JSON.parse(localStorage.getItem('user'))

const vSocket = new VueSocketIO({
  debug: true,
  connection: SocketIO("http://localhost:4000", { query: `id=${user.id}` }),
});

createApp(App).use(router).use(vSocket).mount("#app");
