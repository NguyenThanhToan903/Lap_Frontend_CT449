import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/Contactbook.vue";

const routes = [
  {
    path: "/",
    name: "Contactbook",
    component: ContactBook,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
