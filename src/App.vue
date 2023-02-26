<template>
  <router-view />
</template>

<script>
import { defineComponent, onBeforeMount } from "vue";
import { authStore } from "./stores/store_Auth";
// import { tickStore } from "./stores/store_Ticket";
import { useRouter, useRoute } from "vue-router";
import { auth } from "boot/firebase";

export default defineComponent({
  name: "App",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const authS = authStore();
    // const tickS = tickStore();

    onBeforeMount(() => {
      auth.onAuthStateChanged((user) => {
        if (!user) {
          router.replace("/login");
        } else if (route.path == "/login" || route.path == "/register") {
          router.replace("/");
        }
      });
    });
    return { authS };
  },
  watch: {
    "authS.userDetails"() {
      // this.tickS.getTickets();
    },
  },
  mounted() {
    this.authS.handleAuthStateChanged();
  },
});
</script>
