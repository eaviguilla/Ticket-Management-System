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
              <q-tab name="subscribed" label="Subscribed" />
              <q-tab name="active" label="Active tickets" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="subscribed" style="padding: 0%">
                <subscribed_tickets />
              </q-tab-panel>

              <q-tab-panel name="active" style="padding: 0%">
                <active_tickets />
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
import { defineComponent, ref } from "vue";
import active_tickets from "src/components/active_tickets.vue";
import subscribed_tickets from "src/components/subscribed_tickets.vue";
import { tickStore } from "src/stores/store_Ticket";
import { categStore } from "src/stores/store_Categ";

export default defineComponent({
  components: { active_tickets, subscribed_tickets },
  setup() {
    const ticks = tickStore();
    const categs = categStore();
    return { ticks, categs };
  },
  data() {
    return {
      tab: ref("subscribed"),
      createBtn: ref(false),
    };
  },
  mounted() {
    this.categs.getCategs();
  },
  methods: {},
});
</script>
