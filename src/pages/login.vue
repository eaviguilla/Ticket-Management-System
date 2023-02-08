<template>
  <div>
    <q-img src="~assets/RAMbg.png" style="height: 1050px" fit="cover">
      <div class="absolute-full text-subtitle2 flex flex-center">
        <q-card style="max-width: 500px; width: 100%">
          <q-input
            class="q-pa-md"
            outlined
            v-model="logData.email"
            type="email"
            suffix=".apc.edu.ph"
            label="Email"
          />
          <q-input
            class="q-pa-md"
            outlined
            v-model="logData.password"
            type="password"
            label="Password"
          />
          <div class="q-pa-md">
            <q-btn
              @click="login"
              class="full-width"
              unelevated
              color="primary"
              label="Login"
            />

            <div class="q-pa-md">
              <q-btn
                class="full-width"
                unelevated
                color="primary"
                label="Register"
                to="/register"
              />
            </div>
          </div>
        </q-card>
      </div>
    </q-img>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { authStore } from "../stores/store_Auth";

export default defineComponent({
  setup() {
    const auth = authStore();
    return { auth };
  },
  name: "LoginPage",
  data() {
    return {
      logData: {
        email: ref(""),
        password: ref(""),
      },
    };
  },
  methods: {
    login() {
      this.auth.loginUser(this.logData);
    },
  },
});
</script>
