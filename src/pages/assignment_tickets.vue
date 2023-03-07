<template>
  <q-layout view="hHh lpR fFf">
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
      <div>
        <div style="full-width">
          <q-card>
            <q-tabs
              v-model="tab"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator
            >
              <q-tab name="assigned" label="Assigned to me" />
              <q-tab name="unassigned" label="Unassigned Tickets" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="assigned" style="padding: 0%">
                <assigned_tickets />
              </q-tab-panel>

              <q-tab-panel name="unassigned" style="padding: 0%">
                <unassigned_tickets />
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
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
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import assigned_tickets from "src/components/assigned_tickets.vue";
import unassigned_tickets from "src/components/unassigned_tickets.vue";

export default {
  components: { assigned_tickets, unassigned_tickets },
  setup() {
    return {};
  },
  data() {
    return {
      tab: ref("assigned"),
      createBtn: ref(false),
    };
  },
  mounted() {},
  methods: {},
};
</script>
