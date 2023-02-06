<template>
  <div class="row justify-center">
    <!-- Profile Header -->

    <!-- Profile Card -->
    <div class="q-pa-md full-width content-center" style="max-width: 1200px">
      <div class="text-h5 text-left text-bold q-pb-lg">Profile</div>
      <q-card
        class="row"
        dark
        style="background: #5438dc; border-radius: 20px; height: 250px"
      >
        <q-item>
          <q-item-section avatar class="q-pa-xs">
            <q-avatar size="125px">
              <img src="" />
            </q-avatar>
          </q-item-section>

          <q-item-section class="q-pl-xl">
            <q-item-label class="text-h3">{{
              auth.userDetails.fName
            }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card>
    </div>

    <!-- Active/Read Reports -->
    <div
      class="row justify-evenly q-pa-lg full-width q-gutter-md q-mb-xl bg-white"
    >
      <q-card
        flat
        bordered
        class="q-card full-width column content-center"
        style="max-width: 380px; height: 160px"
      >
        <q-item-section class="column items-center">
          <div class="text-h6 text-bold">Active Tickets</div>
          <div class="text-h6 text-bold">1</div>
        </q-item-section>
      </q-card>

      <q-card
        flat
        bordered
        class="q-card full-width column content-center"
        style="max-width: 380px; height: 160px"
      >
        <q-item-section class="column items-center">
          <div class="text-h6 text-center text-bold">Read Reports</div>
        </q-item-section>
      </q-card>
    </div>

    <!-- Read History/Assign Staff -->
    <div
      class="row justify-evenly q-pa-lg full-width q-gutter-md q-mb-xl bg-white"
    >
      <q-card
        flat
        bordered
        class="q-card full-width column content-center bg-white"
        style="max-width: 380px; height: 160px"
      >
        <q-item-section class="column items-center">
          <div class="text-h6 text-bold">Read History</div>
        </q-item-section>
      </q-card>

      <q-card
        flat
        bordered
        class="q-card full-width column content-center"
        style="max-width: 380px; height: 160px"
      >
        <q-item-section class="column items-center">
          <div class="text-h6 text-center text-bold">Assign Staff</div>
        </q-item-section>
      </q-card>
    </div>

    <div class="">
      <q-page-sticky expand position="bottom" class="q-pa-lg">
        <q-btn
          elevated
          no-caps
          class="full-width q-pa-md"
          style="
            background: #ff6b6e;
            color: white;
            max-width: 1400px;
            border-radius: 20px;
          "
          size="lg"
          label="Create Ticket"
          @click="dialog = true"
        />
      </q-page-sticky>
      <q-dialog v-model="dialog" persistent full-height full-width>
        <q-card class="text-black">
          <q-bar>
            <q-space />
            <q-btn dense flat icon="close" v-close-popup>
              <q-tooltip class="bg-white text-primary">Close</q-tooltip>
            </q-btn>
          </q-bar>
          <q-page-container style="padding: 0px !important">
            <newTicket :userDetails="userDetails" />
          </q-page-container>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { authStore } from "src/stores/store_Auth";

export default defineComponent({
  setup() {
    const auth = authStore();
    return { auth };
  },
  name: "PageHome",
});
</script>
