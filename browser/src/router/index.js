import { createRouter, createWebHistory } from "vue-router";

import index from "../views/index.vue";

const routes = [
  // 登录界面
  {
    path: "/",
    name: "index",
    component: index
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});