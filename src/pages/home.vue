<template>
  <div class="row justify-center" style="margin-bottom: 70px">
    <!-- Profile Header -->

    <!-- Profile Card -->
    <div
      class="q-px-md full-width content-center justify-around"
      style="max-width: 700px"
    >
      <q-item-section class="text-center">
        <div class="text-h4 text-center text-bold">
          Welcome to RAMaintenance
        </div>
        <div class="text-h6 text-center text-weight-light text-grey-7">
          Good Day {{ auth.userDetails.fName }}!
        </div>
      </q-item-section>
    </div>

    <span
      v-if="this.auth.userDetails.role === 'Staff'"
      class="text-overline text-bold text-center"
      >Are you available to be assigned to a Ticket</span
    >
    <q-toggle
      v-if="this.auth.userDetails.role === 'Staff'"
      v-model="auth.userDetails.available"
      checked-icon="check"
      size="xl"
      unchecked-icon="clear"
      val="150px"
    />

    <!-- Active/Read Reports -->
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
            <div class="text-caption text-bold">{{ activeCount }} Tickets</div>
          </q-item-section>
        </q-btn>
      </div>

      <div class="q-ma-sm q-pb-lg" style="width: 140px; height: 140px">
        <q-btn
          class="q-card full-width column content-center"
          color="teal-4"
          style="max-width: 140px; height: 140px"
          to="/resolved_tickets"
          bordered
          rounded
        >
          <q-item-section class="column items-center">
            <q-icon name="mdi-check-outline" size="lg" class="q-pa-xs">
            </q-icon>
            <div class="text-h6 text-center text-bold">Resolved</div>
            <div v-if="!auth.userDetails.office" class="text-caption text-bold">
              {{ subResolvedCount }} Tickets
            </div>
            <div v-else class="text-caption text-bold">
              {{ resolvedCount }} Tickets
            </div>
          </q-item-section>
        </q-btn>
      </div>
      <div
        v-if="this.auth.userDetails.office"
        class="q-ma-sm q-pb-lg"
        style="width: 140px; height: 140px"
      >
        <q-btn
          class="q-card full-width column content-center"
          color="deep-orange-4"
          style="max-width: 140px; height: 140px"
          to="/assignment_tickets"
          bordered
          rounded
        >
          <q-item-section class="column items-center">
            <q-icon name="mdi-check-outline" size="lg" class="q-pa-xs">
            </q-icon>
            <div class="text-h6 text-center text-bold">Assigned</div>
            <div class="text-caption text-bold">
              {{ assignedCount }} Tickets
            </div>
          </q-item-section>
        </q-btn>
      </div>
      <div
        v-if="this.auth.userDetails.office"
        class="q-ma-sm q-pb-lg"
        style="width: 140px; height: 140px"
      >
        <q-btn
          color="yellow-7"
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

      <div
        v-if="this.auth.userDetails.office"
        class="q-ma-sm q-pb-lg"
        style="width: 140px; height: 140px"
      >
        <q-btn
          class="q-card full-width column content-center"
          color="cyan-6"
          style="max-width: 140px; height: 140px"
          to="/view_locations"
          bordered
          rounded
        >
          <q-item-section class="column items-center">
            <q-icon name="mdi-map-marker-outline" size="lg" class="q-pa-xs">
            </q-icon>
            <div class="text-h6 text-center text-bold">Locations</div>
            <div class="text-caption text-bold"></div>
          </q-item-section>
        </q-btn>
      </div>

      <div
        v-if="this.auth.userDetails.office"
        class="q-ma-sm q-pb-lg"
        style="width: 140px; height: 140px"
      >
        <q-btn
          class="q-card full-width column content-center"
          color="blue-grey-7"
          style="max-width: 140px; height: 140px"
          to="/view_users"
          bordered
          rounded
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
          to="/create_ticket_loc"
        />
      </q-page-sticky>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { authStore } from "src/stores/store_Auth";
import { userStore } from "src/stores/store_User";
import { tickStore } from "src/stores/store_Ticket";

export default defineComponent({
  setup() {
    const auth = authStore();
    const users = userStore();
    const tick = tickStore();
    return { auth, users, tick };
  },
  data() {
    return {
      createBtn: ref(false),
      available: ref(null),
    };
  },
  watch: {
    "auth.userDetails.available"() {
      this.users.available();
    },
  },
  computed: {
    activeCount() {
      const sub = Object.keys(this.tick.filterSub).length;
      const act = Object.keys(this.tick.filterActive).length;
      return sub + act;
    },
    subResolvedCount() {
      return Object.keys(this.tick.filterSubResolved).length;
    },
    resolvedCount() {
      return Object.keys(this.tick.filterResolved).length;
    },
    assignedCount() {
      const ass = Object.keys(this.tick.filterActiveAssigned).length;
      const unass = Object.keys(this.tick.filterActiveUnassigned).length;
      return ass + unass;
    },
  },
  name: "PageHome",
});
</script>
