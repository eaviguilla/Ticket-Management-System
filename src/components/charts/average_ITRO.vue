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
export default {
  name: "timeline_ticket",
  data() {
    return {
      staffs: [
        { name: "Crisostomo Ibarra", hour: "1:46" },
        { name: "Maria Clara", hour: "1:40" },
        { name: "Capitan Tiago", hour: "1:35" },
        { name: "Pilosopo Tasyo", hour: "2:40" },
        { name: "Dona Victorina", hour: "2:30" },
        { name: "Sisa", hour: "2:45" },
      ],
    };
  },
};
</script>
