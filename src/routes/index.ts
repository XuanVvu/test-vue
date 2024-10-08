import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/test", component: () => import("../pages/TestPage.vue") },
  { path: "/", component: () => import("../pages/HomePage.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
