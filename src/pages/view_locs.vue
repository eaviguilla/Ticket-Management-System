<template>
  <q-layout style="margin-bottom: 65px" view="hHh lpR fFf">
    <q-header bordered class="bg-white text-white">
      <q-toolbar>
        <q-btn flat rounded class="float-left" to="/"
          ><q-icon color="primary" name="mdi-arrow-left"></q-icon
        ></q-btn>
        <q-icon size="lg" name="img:src/assets/rams.png"></q-icon>
        <q-toolbar-title class="text-primary text-weight-bold"
          >RAMaintenance</q-toolbar-title
        >
      </q-toolbar>
    </q-header>
    <q-page-container>
      <div
        class="q-pa-xs items-start q-gutter-md"
        style="max-width: 550px; width: 100%; margin: 0 auto"
        to="/"
      >
        {{ locs.floors }}
        {{ locs.rooms }}
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { authStore } from "src/stores/store_Auth";
import { locsStore } from "src/stores/store_Loc";

export default {
  setup() {
    const locs = locsStore();
    const auth = authStore();

    return { auth, locs };
  },
  mounted() {
    this.locs.getLocs();
  },
  methods: {},
};
</script>
