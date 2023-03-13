<template>
  <div class="text-weight-bolder text-primary text-h6">Staff Reports</div>

  <div
    class="text-bold text-body2"
    style="max-width: 800px; width: 100%; margin: 0 auto"
  >
    <q-item
      class="rounded-borders q-my-sm q-card items-center"
      v-for="rep in reps.bmoReports"
      :key="rep.userID"
    >
      <div style="width: 100%" class="text-bold text-body2 text-center">
        <q-item-section class="text-overline text-center">
          <span class="text-bold"> {{ users.getStaffName(rep.userID) }} </span>
        </q-item-section>
        <div class="text-caption justify-between text-center row">
          <span class="col"
            ><span class="text-bold">Assigned</span> <br />
            {{ rep.assigned }}</span
          >
          <span class="col"
            ><span class="text-bold">Assisting</span> <br />
            {{ rep.assist }}</span
          >
          <span class="col"
            ><span class="text-bold">Resolved</span> <br />
            {{ rep.finished }}</span
          >
        </div>
      </div>
    </q-item>
  </div>
</template>
<script>
import { userStore } from "src/stores/store_User";
import { repStore } from "src/stores/store_Reports";

export default {
  name: "timeline_ticket",
  setup() {
    const users = userStore();
    const reps = repStore();

    return { users, reps };
  },
  data() {
    return {};
  },
  mounted() {},
};
</script>
