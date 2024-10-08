import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./routes";

window.addEventListener("popstate", () => {
  console.log(1);
});

createApp(App).use(router).mount("#app");
