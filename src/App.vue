<template>
  <router-view />
</template>

<script>
import { defineComponent, onBeforeMount } from "vue";
import { authStore } from "./stores/store_Auth";
import { useRouter, useRoute } from "vue-router";
import { auth } from "boot/firebase";

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const authS = authStore();
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
  name: "App",
  mounted() {
    this.authS.handleAuthStateChanged();
  },
});
</script>
