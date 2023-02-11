<template>
  <div class="q-pa-md" style="max-width">
    <q-list>
      <!--template for unviewed notification-->
      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Aircondition: Floor:5, Room:508</q-item-label>
          <q-item-label caption lines="2">{{ updates[1] }}</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
          <q-icon
            class="q-pt-sm"
            name="fa-solid fa-bell"
            color="light-blue-6"
          />
        </q-item-section>
      </q-item>
      <q-separator spaced inset />

      <!--template for viewed notification-->
      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Aircondition: Floor:5, Room:508</q-item-label>
          <q-item-label caption lines="2">{{ updates[2] }}</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-item-label caption>15 mins ago</q-item-label>
          <q-icon class="q-pt-sm" name="fa-solid fa-check" color="green" />
        </q-item-section>
      </q-item>
      <q-separator spaced inset />
    </q-list>
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
      ],
    };
  },
};
</script>
