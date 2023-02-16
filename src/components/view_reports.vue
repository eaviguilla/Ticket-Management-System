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
            <average_bmo></average_bmo>
          </q-tab-panel>

          <q-tab-panel name="itro_staff_report">
            <chart_itro></chart_itro>
            <average_itro></average_itro>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, defineAsyncComponent, ref } from "vue";

const chart_bmo = defineAsyncComponent(() =>
  import("components/charts/accomplished_tickets_BMO.vue")
);

const average_bmo = defineAsyncComponent(() =>
  import("components/charts/average_BMO.vue")
);

const chart_itro = defineAsyncComponent(() =>
  import("components/charts/accomplished_tickets_ITRO.vue")
);

const average_itro = defineAsyncComponent(() =>
  import("components/charts/average_ITRO.vue")
);

export default defineComponent({
  name: "ViewReports",
  components: { chart_bmo, chart_itro, average_bmo, average_itro },
  setup() {
    return {
      tab: ref("bmo_staff_report"),
    };
  },
});
</script>
