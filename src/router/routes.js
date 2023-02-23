const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import("pages/home.vue"),
      },
    ],
  },
  {
    path: "/view_users",
    name: "View users",
    component: () => import("pages/view_users.vue"),
  },
  {
    path: "/view_tickets",
    name: "View tickets",
    component: () => import("src/pages/view_tickets.vue"),
  },
  {
    path: "/subscribed",
    component: () => import("src/components/subscribed_tickets.vue"),
  },
  {
    path: "/view_ticket",
    name: "View ticket",
    component: () => import("pages/view_ticket.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("pages/login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("pages/register.vue"),
  },
  {
    path: "/create_ticket_loc",
    name: "Create ticket location",
    component: () => import("pages/create_ticket.vue"),
  },
  {
    path: "/view_categories",
    name: "View categories",
    component: () => import("src/pages/view_categories.vue"),
  },
  {
    path: "/view_locations",
    name: "View locations",
    component: () => import("src/pages/view_locations.vue"),
  },

  {
    path: "/view_rooms/:floorID",
    component: () => import("src/pages/view_rooms.vue"),
  },
  {
    path: "/create_ticket_desc/:roomID",
    name: "Create ticket description",

    component: () => import("src/pages/create_ticket_2.vue"),
  },
  {
    path: "/resolved_tickets",
    component: () => import("src/components/resolved_tickets.vue"),
  },
  {
    path: "/tes",
    component: () => import("src/pages/tes_tes.vue"),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
