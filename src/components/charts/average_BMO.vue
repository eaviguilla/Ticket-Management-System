<template>
  <h5 class="text-weight-bolder text-primary">Average Time To Resolve</h5>

  <div
    class="q-pa-md text-bold text-body2"
    style="max-width: 800px; width: 100%; margin: 0 auto"
  >
    <q-item
      class="rounded-borders q-my-sm q-card items-center"
      v-for="staff in staffs"
      :key="staff"
    >
      <q-item-section class="text-bold text-body1">
        {{ staff.name }}:
      </q-item-section>
      <q-item-section class="text-body1">
        {{ staff.hour }} hr/s
      </q-item-section>
    </q-item>
  </div>
</template>
<script>
import { userStore } from "src/stores/store_User";

export default {
  name: "timeline_ticket",
  setup() {
    const users = userStore();

    return { users };
  },
  data() {
    return {
      staffs: [
        { name: "James Poco", hour: "2:16" },
        { name: "Jan Lorenzo", hour: "2:30" },
        { name: "Elias Viguilla", hour: "2:00" },
        { name: "Kleine Martin", hour: "2:10" },
        { name: "Ryan Manoguid", hour: "1:55" },
        { name: "Felix Perdo", hour: "2:45" },
      ],
    };
  },
};
</script>
