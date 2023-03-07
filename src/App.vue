<template>
  <router-view />
</template>

<script>
import { defineComponent, onBeforeMount } from "vue";
import { authStore } from "./stores/store_Auth";
import { tickStore } from "./stores/store_Ticket";
import { locsStore } from "./stores/store_Loc";
import { categStore } from "./stores/store_Categ";
import { useRouter, useRoute } from "vue-router";
import { auth } from "boot/firebase";

export default defineComponent({
  name: "App",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const authS = authStore();
    const tickS = tickStore();
    const locs = locsStore();
    const categs = categStore();

    onBeforeMount(() => {
      auth.onAuthStateChanged((user) => {
        if (!user) {
          router.replace("/login");
        } else if (route.path == "/login" || route.path == "/register") {
          router.replace("/");
        }
      });
    });
    return { authS, tickS, locs, categs };
  },
  data() {
    return {
      init: false,
    };
  },
  watch: {
    "authS.userDetails"() {
      if (Object.keys(this.authS.userDetails).length !== 0 && !this.init) {
        this.tickS.getTickets();
        this.tickS.getStatus();
        this.categs.getCategs();
        this.locs.getLocs();
        this.init = true;
      }
    },
  },
  mounted() {
    this.authS.handleAuthStateChanged();
  },
});
</script>
