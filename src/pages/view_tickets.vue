<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-white text-white">
      <q-toolbar>
        <q-btn flat rounded class="float-left"
          ><q-icon color="primary" name="mdi-arrow-left"></q-icon
        ></q-btn>
        <q-icon size="lg" name="img:src/assets/rams.png"></q-icon>
        <q-toolbar-title class="text-primary text-weight-bold"
          >RAMaintenance</q-toolbar-title
        >
      </q-toolbar>
    </q-header>
    <q-page-container>
      <div class="q-pa-md">
        <div class="q-gutter-y-md" style="full-width">
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
              <q-tab name="active" label="Active tickets" />
              <q-tab name="subscribed" label="Subscribed" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="active">
                <active_tickets />
              </q-tab-panel>

              <q-tab-panel name="subscribed">
                <subscribed_tickets />
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import active_tickets from "src/components/active_tickets.vue";
import subscribed_tickets from "src/components/subscribed_tickets.vue";
export default defineComponent({
  components: { active_tickets, subscribed_tickets },
  setup() {
    return {
      tab: ref("active"),
    };
  },
});
</script>
