import { createRouter, createWebHistory } from "vue-router";
import ListPage from "../pages/ListPage.vue";
import DetailPage from "../pages/DetailPage.vue";
import AddEditPage from "../pages/AddEditPage.vue";
import CreateListPage from "../pages/CreateListPage.vue";

const routes = [
  {
    path: "/",
    name: "List",
    component: ListPage,
  },
  {
    path:"/create",
    name: "Create",
    component:CreateListPage
  },
  {
    path: "/detail/:id",
    name: "Detail",
    component: DetailPage,
    props: true,
  },
  {
    path: "/add",
    name: "Add",
    component: AddEditPage,
  },
  {
    path: "/edit/:id",
    name: "Edit",
    component: AddEditPage,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
