<template>
  <div class="q-pa-md">
    <div
      class="q-gutter-md"
      style="max-width: 850px; width: 50%; margin: 0 auto"
    >
      <div class="text-bold text-h6 text-primary">
        <p>Create Ticket Form</p>
      </div>

      <q-select
        standout="bg-teal text-white"
        v-model="model"
        :options="offices"
        label="Select Office of Concern"
      />

      <q-select
        standout="bg-teal text-white"
        v-model="model2"
        :options="equipments"
        label="Select Category"
      />

      <q-input
        autogrow
        clearable
        standout="bg-teal text-white"
        v-model="model3"
        label="Enter Details of Concern"
      />

      <div align="right">
        <q-btn
          unelevated
          round
          color="teal"
          icon="send"
          size="md"
          clickable
          v-ripple
          to="/create_ticket_2"
        />
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
      model2: ref(null),
      model3: ref(null),
      offices: ["BMO", "ITRO"],
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
