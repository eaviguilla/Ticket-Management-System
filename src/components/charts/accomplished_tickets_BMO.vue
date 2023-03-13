<template>
  <div class="text-weight-bolder text-primary text-h6 q-pt-md">
    Category Ticket Count
  </div>

  <div
    class="text-bold text-body2"
    style="max-width: 800px; width: 100%; margin: 0 auto"
  >
    <q-item
      class="rounded-borders q-my-sm q-card items-center"
      v-for="rep in reps.bmoCategReps"
      :key="rep.categID"
    >
      <div style="width: 100%" class="text-bold text-body2 justify-between row">
        <span class="text-bold col">
          {{ categs.displayCateg(rep.categID) }}
        </span>
        <span class="text-bold col text-right"> {{ rep.count }} </span>
      </div>
    </q-item>
  </div>
</template>
<script>
import { userStore } from "src/stores/store_User";
import { repStore } from "src/stores/store_Reports";
import { categStore } from "src/stores/store_Categ";

export default {
  name: "timeline_ticket",
  setup() {
    const users = userStore();
    const reps = repStore();
    const categs = categStore();

    return { users, reps, categs };
  },
  data() {
    return {};
  },
  mounted() {},
};
</script>
