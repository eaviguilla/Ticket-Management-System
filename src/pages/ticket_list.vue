<template>
  <div>
    <q-layout view="lHh lpr lFf">
      <div>
        <q-tabs
          class="rounded q-card"
          align="justify"
          active-color="primary"
          indicator-color="primary"
          v-model="tab"
        >
          <q-tab name="active" label="Active" />
          <q-tab name="subscribe" label="Subscribe" />
        </q-tabs>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="active">
            <p>this is active tab</p>
          </q-tab-panel>

          <q-tab-panel name="subscribe">
            <p>this is subscribe tab</p>
          </q-tab-panel>
        </q-tab-panels>
      </div>
      <div></div>
    </q-layout>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import active_tickets from "src/components/active_tickets.vue";

export default defineComponent({
  components: {},
  setup() {
    return {
      model: ref(null),
      details: ref(""),
    };
  },
});
</script>
