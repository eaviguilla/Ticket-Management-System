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
    <q-footer bordered class="bg-primary text-white">
      <q-tabs v-model="tab" class="text-white" align="justify">
        <q-tab name="reports"
          ><q-icon size="sm" name="mdi-abacus"></q-icon
          ><span class="text-capitalize text-caption">Reports</span></q-tab
        >
        <q-tab name="home"
          ><q-icon size="sm" name="mdi-view-dashboard-outline"></q-icon
          ><span class="text-capitalize text-caption">Home</span></q-tab
        >
        <q-tab name="notification"
          ><q-icon size="sm" name="mdi-bell-outline"></q-icon
          ><span class="text-capitalize text-caption">Notif</span></q-tab
        >
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
