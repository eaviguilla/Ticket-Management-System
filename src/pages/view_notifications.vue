<template>
  <div class="column items-center">
    <div class="q-pa-md full-width" style="max-width: 750px">
      <h5 class="text-weight-bolder text-primary">Notification</h5>
      <q-list>
        <!--template for unviewed notification-->
        <q-item
          clickable
          v-ripple
          class="bg-blue rounded-borders q-my-sm q-card"
        >
          <q-item-section>
            <q-item-label class="q-pa-sm text-bold text-body1 text-white"
              >Aircondition: Floor:5, Room:508</q-item-label
            >
            <q-item-label class="q-pa-sm text-white">{{
              updates[1]
            }}</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-item-label caption class="q-pa-sm text-white"
              >5 min ago</q-item-label
            >
            <q-icon
              class="q-pa-sm q-pt-sm"
              name="fa-solid fa-bell"
              color="white"
            />
          </q-item-section>
        </q-item>

        <!--template for viewed notification-->
        <q-item clickable v-ripple class="rounded-borders q-my-sm q-card">
          <q-item-section>
            <q-item-label class="q-pa-sm text-bold text-body1"
              >Aircondition: Floor:5, Room:508</q-item-label
            >
            <q-item-label class="q-pa-sm">{{ updates[2] }}</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-item-label caption class="q-pa-sm">15 mins ago</q-item-label>
            <q-icon
              class="q-pa-sm q-pt-sm"
              name="fa-solid fa-check"
              color="grey"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      model: ref(null),
      updates: [
        "Ticket has been created",
        "New note has been posted",
        "Ticket status has been updated",
        "Ticket has been resolved",
        "Ticket priority level has been set",
      ],
    };
  },
};
</script>
