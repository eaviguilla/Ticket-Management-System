<template>
  <div class="q-pa-md">
    <div class="q-gutter-md full-width">
      <div class="text-bold text-h6 text-primary">
        <p>Create Ticket form</p>
      </div>
      <q-select
        standout="bg-teal text-white"
        v-model="level"
        :options="floors"
        label="Select floor level"
      />

      <q-select
        standout="bg-teal text-white"
        v-model="room"
        :options="rooms"
        label="Select room/area"
      />

      <q-select
        standout="bg-teal text-white"
        v-model="equipment"
        :options="equipments"
        label="Select category"
      />

      <q-input
        autogrow
        clearable
        standout="bg-teal text-white"
        v-model="details"
        label="Enter details of concern"
      />

      <div class="q-pa-lg" align="right">
        <q-btn unelevated round color="teal" icon="send" size="xl" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      model: ref(null),
      floors: [
        "Basement",
        "First floor",
        "Second floor",
        "Third floor",
        "Fourth floor",
        "Sixth floor",
        "Seventh floor",
        "Eight floor",
        "Nineth floor",
        "Tenth floor",
        "Eleventh floor",
        "Tweleveth  floor",
      ],
      rooms: ["101", "102", "103"],
      equipments: [
        "computer",
        "lighting",
        "furniture",
        "toilet",
        "sink",
        "pipe",
        "aircondition",
      ],
      details: ref(""),
    };
  },
};
</script>
