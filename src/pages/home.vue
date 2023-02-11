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
          Good day {{ auth.userDetails.fName }}!
        </div>
      </q-item-section>
    </div>

    <!-- Active/Read Reports (Mobile Only) -->
    <div
      class="q-pa-md q-pl-xs row justify-evenly full-width q-mb-lg mobile-only"
    >
      <q-btn
        color="green-13"
        rounded
        bordered
        class="q-card full-width column"
        style="max-width: 140px; height: 140px"
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

      <q-btn
        color="light-blue-14"
        rounded
        bordered
        class="q-card full-width column content-center"
        style="max-width: 140px; height: 140px"
      >
        <q-item-section class="column items-center">
          <q-icon name="mdi-file-chart-outline" size="lg" class="q-pa-xs">
          </q-icon>
          <div class="text-h6 text-center text-bold">Read Reports</div>
        </q-item-section>
      </q-btn>
    </div>

    <!-- Resolved Tickets/Assign Staff (Mobile Only) -->

    <div
      class="q-pa-md q-pl-xs row justify-evenly full-width q-mb-lg mobile-only"
    >
      <q-btn
        color="orange-6"
        rounded
        bordered
        class="q-card full-width column content-center"
        style="max-width: 140px; height: 140px"
      >
        <q-item-section class="column items-center">
          <q-icon name="mdi-check-outline" size="lg" class="q-pa-xs"> </q-icon>
          <div class="text-h6 text-bold">Resolved Tickets</div>
        </q-item-section>
      </q-btn>

      <q-btn
        color="blue-grey"
        rounded
        bordered
        class="q-card full-width column content-center"
        style="max-width: 140px; height: 140px"
        to="/view_users"
      >
        <q-item-section class="column items-center">
          <q-icon name="mdi-account-circle" size="md" class="q-pa-xs"> </q-icon>
          <div class="text-h6 text-center text-bold">Manage User</div>
        </q-item-section>
      </q-btn>
    </div>

    <!-- Templates (Mobile Only) -->

    <div
      class="q-pa-md q-pl-xs row justify-evenly full-width q-mb-lg mobile-only"
    >
      <q-btn
        color="pink"
        rounded
        bordered
        class="q-card full-width column content-center"
        style="max-width: 140px; height: 140px"
      >
        <q-item-section class="column items-center">
          <div class="text-h6 text-bold">Untitled</div>
        </q-item-section>
      </q-btn>

      <q-btn
        color="purple"
        rounded
        bordered
        class="q-card full-width column content-center"
        style="max-width: 140px; height: 140px"
      >
        <q-item-section class="column items-center">
          <div class="text-h6 text-center text-bold">Untitled</div>
        </q-item-section>
      </q-btn>
      <!-- Active/Read Reports (Desktop Only) -->
      <div
        class="q-pa-md q-pl-xs row justify-evenly full-width q-mb-lg desktop-only"
      >
        <q-btn
          color="green-13"
          rounded
          bordered
          class="q-card full-width column"
          style="max-width: 250px; height: 250px"
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

        <q-btn
          color="light-blue-14"
          rounded
          bordered
          class="q-card full-width column content-center"
          style="max-width: 250px; height: 250px"
        >
          <q-item-section class="column items-center">
            <q-icon name="mdi-file-chart-outline" size="lg" class="q-pa-xs">
            </q-icon>
            <div class="text-h6 text-center text-bold">Read Reports</div>
          </q-item-section>
        </q-btn>
      </div>

      <!-- Resolved Tickets/Assign Staff (Desktop Only) -->

      <div
        class="q-pa-md q-pl-xs row justify-evenly full-width q-mb-lg desktop-only"
      >
        <q-btn
          color="orange-6"
          rounded
          bordered
          class="q-card full-width column content-center"
          style="max-width: 250px; height: 250px"
        >
          <q-item-section class="column items-center">
            <q-icon name="mdi-check-outline" size="lg" class="q-pa-xs">
            </q-icon>
            <div class="text-h6 text-bold">Resolved Tickets</div>
          </q-item-section>
        </q-btn>

        <q-btn
          color="blue-grey"
          rounded
          bordered
          class="q-card full-width column content-center"
          style="max-width: 250px; height: 250px"
          to="/view_users"
        >
          <q-item-section class="column items-center">
            <q-icon name="mdi-account-circle" size="md" class="q-pa-xs">
            </q-icon>
            <div class="text-h6 text-center text-bold">Manage User</div>
          </q-item-section>
        </q-btn>
      </div>

      <!-- Templates (Desktop Only) -->

      <div
        class="q-pl-xs q-pl-xs row justify-evenly full-width q-mt-md desktop-only"
      >
        <q-btn
          color="pink"
          rounded
          bordered
          class="q-card full-width column content-center"
          style="max-width: 250px; height: 250px"
        >
          <q-item-section class="column items-center">
            <div class="text-h6 text-bold">Untitled</div>
          </q-item-section>
        </q-btn>

        <q-btn
          color="purple"
          rounded
          bordered
          class="q-card full-width column content-center"
          style="max-width: 250px; height: 250px"
        >
          <q-item-section class="column items-center">
            <div class="text-h6 text-center text-bold">Untitled</div>
          </q-item-section>
        </q-btn>
      </div>
    </div>

    <div class="">
      <q-page-sticky expand position="bottom" class="q-pa-md">
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
          to="/create_ticket"
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

<style lang="sass">
.q-item-section
  position: absolute
  bottom: 0
  left: 50%
  transform:translateX(50%)
</style>
