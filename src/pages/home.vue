<template>
  <div class="row justify-center" style="margin-bottom: 70px">
    <!-- Profile Header -->

    <!-- Profile Card -->
    <div class="q-pa-md full-width content-center" style="max-width: 700px">
      <q-item-section class="q-pl-xs">
        <div class="text-h4 text-center text-bold q-pb-md">
          Welcome to RAMaintenance
        </div>
        <div class="text-h6 text-center text-weight-light q-pb-xs text-grey-7">
          Good Day {{ auth.userDetails.fName }}!
        </div>
      </q-item-section>
    </div>

    <!-- Active/Read Reports (Mobile Only) -->
    <div class="q-pa-sm q-pl-xs row justify-evenly full-width q-mb-lg">
      <div class="q-ma-sm q-pb-lg" style="width: 140px; height: 140px">
        <q-btn
          color="green-13"
          rounded
          bordered
          class="q-card full-width column"
          style="width: 140px; height: 140px"
          to="/view_tickets"
        >
          <q-item-section class="column items-center">
            <q-icon
              name="mdi-ticket-confirmation-outline"
              size="lg"
              class="q-pa-xs"
            >
            </q-icon>
            <div class="text-h5 text-bold">Active</div>
            <div class="text-caption text-bold">15 Tickets</div>
          </q-item-section>
        </q-btn>
      </div>

      <div class="q-ma-sm q-pb-lg" style="width: 140px; height: 140px">
        <q-btn
          color="teal-4"
          rounded
          bordered
          class="q-card full-width column content-center"
          style="max-width: 140px; height: 140px"
          to="/resolved_tickets"
        >
          <q-item-section class="column items-center">
            <q-icon name="mdi-check-outline" size="lg" class="q-pa-xs">
            </q-icon>
            <div class="text-h6 text-center text-bold">Resolved</div>
            <div class="text-caption text-bold">15 Tickets</div>
          </q-item-section>
        </q-btn>
      </div>

      <div class="q-ma-sm q-pb-lg" style="width: 140px; height: 140px">
        <q-btn
          color="deep-orange-4"
          rounded
          bordered
          class="q-card full-width column content-center"
          style="max-width: 140px; height: 140px"
          to="/view_categories"
        >
          <q-item-section class="column items-center">
            <q-icon name="mdi-label-multiple-outline" size="lg" class="q-pa-xs">
            </q-icon>
            <div class="text-h6 text-center text-bold">Categories</div>
            <div class="text-caption text-bold"></div>
          </q-item-section>
        </q-btn>
      </div>

      <div class="q-ma-sm q-pb-lg" style="width: 140px; height: 140px">
        <q-btn
          color="cyan-6"
          rounded
          bordered
          class="q-card full-width column content-center"
          style="max-width: 140px; height: 140px"
          to="/view_locations"
        >
          <q-item-section class="column items-center">
            <q-icon name="mdi-map-marker-outline" size="lg" class="q-pa-xs">
            </q-icon>
            <div class="text-h6 text-center text-bold">Locations</div>
            <div class="text-caption text-bold"></div>
          </q-item-section>
        </q-btn>
      </div>

      <div class="q-ma-sm q-pb-lg" style="width: 140px; height: 140px">
        <q-btn
          color="blue-grey-7"
          rounded
          bordered
          class="q-card full-width column content-center"
          style="max-width: 140px; height: 140px"
          to="/view_users"
        >
          <q-item-section class="column items-center">
            <q-icon name="mdi-account-circle" size="lg" class="q-pa-xs">
            </q-icon>
            <div class="text-h6 text-center text-bold">Users</div>
            <div class="text-caption text-bold"></div>
          </q-item-section>
        </q-btn>
      </div>
    </div>

    <div class="">
      <q-page-sticky expand position="bottom" class="q-pa-sm">
        <q-btn
          elevated
          no-caps
          class="full-width q-pa-md bg-secondary text-white"
          style="max-width: 1400px; border-radius: 20px"
          size="md"
          label="Create Ticket"
          @click="createBtn = true"
          to="/create_ticket"
        />
      </q-page-sticky>
      <q-dialog v-model="createBtn" persistent full-height full-width>
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
import { defineComponent, ref } from "vue";
import { authStore } from "src/stores/store_Auth";

export default defineComponent({
  setup() {
    const auth = authStore();
    return { auth };
  },
  data() {
    return {
      createBtn: ref(false),
    };
  },
  name: "PageHome",
});
</script>
