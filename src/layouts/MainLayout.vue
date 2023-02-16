<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-white text-white">
      <q-toolbar>
        <q-icon size="lg" name="img:src/assets/rams.png"></q-icon>
        <q-toolbar-title class="text-primary text-weight-bold"
          >RAMaintenance</q-toolbar-title
        >
        <q-btn flat rounded
          ><q-icon
            @click="auth.logoutUser"
            color="primary"
            name="mdi-logout-variant"
          ></q-icon
        ></q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="reports"> <view_reports /> </q-tab-panel>

        <q-tab-panel name="home">
          <home />
        </q-tab-panel>

        <q-tab-panel name="notification">
          <view_notifications />
        </q-tab-panel>
      </q-tab-panels>
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
      <q-separator />
    </q-footer>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import home from "pages/home.vue";
import view_notifications from "pages/view_notifications.vue";
import view_reports from "src/components/view_reports.vue";
import { authStore } from "src/stores/store_Auth";
export default {
  setup() {
    const auth = authStore();
    return { auth };
  },
  components: { home, view_notifications, view_reports },
  data() {
    return {
      tab: ref("home"),
    };
  },
};
</script>
