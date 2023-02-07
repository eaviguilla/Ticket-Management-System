<template>
  <q-dialog v-model="showcateg">
    <div>example</div>
  </q-dialog>
  <q-btn label="Ticket Categoties" @click="showcateg = true" />
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    return {
      model: ref(null),
      showcateg: false,
      equipments: [
        "Aircondition",
        "wiring",
        "pipes",
        "chairs",
        "door",
        "computer",
        "lightings",
      ],
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
    };
  },
};
</script>
