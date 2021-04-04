import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";

const userId = sessionStorage.getItem('userId')

const vSocket = new VueSocketIO({
  debug: true,
  connection: SocketIO(process.env.VUE_APP_SERVER_URL, { query: `id=${userId !== null ? userId : 'null'}` }),
});

createApp(App).use(router).use(vSocket).mount("#app");
