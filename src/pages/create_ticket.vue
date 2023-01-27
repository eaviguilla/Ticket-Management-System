<template>
  <div class="q-pa-lg">
    <q-input
      standout="bg-deep-purple-3 text-white"
      v-model="text"
      label="Custom standout"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "CreatePage",
});
</script>
