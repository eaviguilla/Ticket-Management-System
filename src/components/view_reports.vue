<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md full-width">
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
          <q-tab name="bmo_staff_report" label="BMO staff report" />
          <q-tab name="itro_staff_report" label="itro staff report" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="bmo_staff_report">
            <chart_bmo></chart_bmo>
          </q-tab-panel>

          <q-tab-panel name="itro_staff_report">
            <div class="text-h6">Tickets Accomplshed By BMO Staffs</div>
            graph here
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, defineAsyncComponent, ref } from "vue";

const chart_bmo = defineComponent(() =>
  import("components/charts/accomplished_tickets.vue")
);

export default defineComponent({
  name: "ViewReports",
  components: { chart_bmo },
  setup() {
    return {
      tab: ref("mails"),
    };
  },
});
</script>
