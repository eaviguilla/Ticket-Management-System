<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
import { authStore } from "./stores/store_Auth";

export default defineComponent({
  setup() {
    const auth = authStore();
    return { auth };
  },
  name: "App",
  mounted() {
    this.auth.handleAuthStateChanged();
  },
});
</script>
