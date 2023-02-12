<template>
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
</template>

<script>
import { defineComponent, ref } from "vue";
import active_tickets from "src/components/active_tickets.vue";
import subscribed_tickets from "src/components/subscribed_tickets.vue";
export default defineComponent({
  components: { active_tickets, subscribed_tickets },
  setup() {
    return {
      tab: ref("mails"),
    };
  },
});
</script>
