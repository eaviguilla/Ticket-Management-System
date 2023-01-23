<template>
  <div>
    <q-img src="~assets/RAMbg.png" fit="contain">
      <div class="absolute-full text-subtitle2 flex flex-center">
        <q-card style="max-width: 500px; width: 100%">
          <q-input class="q-pa-md" outlined v-model="text" label="Email" />
          <q-input class="q-pa-md" outlined v-model="text" label="Password" />
          <div class="q-pa-md">
            <q-btn
              class="full-width"
              unelevated
              color="primary"
              label="Login"
            />
          </div>
        </q-card>
      </div>
    </q-img>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginPage",
  data() {
    return {};
  },
});
</script>
