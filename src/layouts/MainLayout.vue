<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="text-weight-bold">
          RAMaintenance
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer bordered class="bg-white text-primary">
      <q-tabs v-model="tab" class="text-teal" align="justify">
        <q-tab name="reports" icon="mail" label="Reports" />
        <q-tab name="home" icon="alarm" label="Home" />
        <q-tab name="notification" icon="movie" label="Notif" />
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
