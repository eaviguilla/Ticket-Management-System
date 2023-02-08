<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-white text-white">
      <q-toolbar>
        <q-icon size="lg" name="img:src/assets/rams.png"></q-icon>
        <q-toolbar-title class="text-primary text-weight-bold"
          >RAMaintenance</q-toolbar-title
        >
        <q-btn flat rounded
          ><q-icon color="primary" name="mdi-logout-variant"></q-icon
        ></q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer height-hint="30" bordered class="bg-white text-primary">
      <q-tabs v-model="tab" class="text-teal" align="justify">
        <q-tab name="reports" icon="mdi-abacus" label="Reports" />
        <q-tab name="home" icon="mdi-vhs" label="Home" />
        <q-tab name="notification" icon="mdi-bell-outline" label="Notif" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  data() {
    return {
      tab: ref("home"),
    };
  },
};
</script>
