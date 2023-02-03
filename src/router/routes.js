const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/home.vue") },
      { path: "/create", component: () => import("pages/create_ticket.vue") },
      {
        path: "/manage_user",
        component: () => import("pages/user_management.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("pages/login.vue"),
  },
  {
    path: "/register",
    component: () => import("pages/register.vue"),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
