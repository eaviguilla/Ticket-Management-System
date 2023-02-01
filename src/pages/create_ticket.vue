<template>
  <div class="q-pa-md" style="max-width: 300px">
    <div class="q-gutter-md">
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
        label="Select equipment type"
      />

      <q-select
        standout="bg-teal text-white"
        v-model="categories"
        :options="category"
        label="Select concern"
      />

      <q-input
        autogrow
        clearable
        standout="bg-teal text-white"
        v-model="details"
        label="Enter details of concern"
      />
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
      category: [
        "Computer not working",
        "Broken aircondition",
        "Door is broken",
        "Conputer has no internet access",
        "area/room light issue",
      ],
      details: ref(""),
    };
  },
};
</script>
