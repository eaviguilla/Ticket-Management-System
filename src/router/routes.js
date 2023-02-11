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
      {
        path: "/note",
        component: () => import("pages/notes_view.vue"),
      },
      {
        path: "/notif",
        component: () => import("pages/view_notification.vue"),
      },
      {
        path: "/categories",
        component: () => import("src/pages/view_categories.vue"),
      },
      {
        path: "/ticket",
        component: () => import("src/pages/ticket_list.vue"),
      },
      {
        path: "/active_ticket",
        component: () => import("src/components/active_tickets.vue"),
      },
      {
        path: "/test",
        component: () => import("src/pages/component_test.vue"),
      },
      {
        path: "/subscribed",
        component: () => import("src/components/subscribed_tickets.vue"),
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
