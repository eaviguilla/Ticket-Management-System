<template>
  <div>
    <q-img src="~assets/RAMbg.png" style="height: 1050px" fit="cover">
      <div class="absolute-full text-subtitle2 flex flex-center">
        <q-card style="max-width: 500px; width: 100%">
          <q-input class="q-pa-md" outlined v-model="text" label="Name" />
          <q-input
            class="q-pa-md"
            outlined
            v-model="text"
            type="email"
            suffix=".apc.edu.ph"
            label="Email"
          />
          <q-input
            class="q-pa-md"
            outlined
            v-model="text"
            type="password"
            label="Password"
          />
          <q-input
            class="q-pa-md"
            outlined
            v-model="text"
            type="password"
            label="Confirm password"
          />
          <div class="q-pa-md">
            <q-btn
              class="full-width"
              unelevated
              color="primary"
              label="Register Account"
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
  name: "RegisterPage",
  data() {
    return {};
  },
});
</script>
