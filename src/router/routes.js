const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/home.vue") },

      {
        path: "/view_notifications",
        component: () => import("pages/view_notifications.vue"),
      },

      {
        path: "/view_ticket",
        component: () => import("pages/view_ticket.vue"),
      },

      {
        path: "/view_users",
        component: () => import("pages/view_users.vue"),
      },
      {
        path: "/ticket",
        component: () => import("src/pages/ticket_list.vue"),
      },

      {
        path: "/view_tickets",
        component: () => import("src/pages/view_tickets.vue"),
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
  {
    path: "/create_ticket",
    component: () => import("pages/create_ticket.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },

  {
    path: "/view_categories",
    component: () => import("src/pages/view_categories.vue"),
  },
];

export default routes;
