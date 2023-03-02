<template>
  <div>
    <q-img src="~assets/rambg2.png" style="height: 784px" fit="cover">
      <div class="absolute-full text-subtitle2 flex flex-center">
        <q-card style="max-width: 500px; width: 100%">
          <q-input
            class="q-pa-md"
            outlined
            v-model="regData.fName"
            label="First Name"
          />
          <q-input
            class="q-pa-md"
            outlined
            v-model="regData.lName"
            label="Last Name"
          />

          <q-input
            class="q-pa-md"
            outlined
            v-model="regData.email"
            type="email"
            suffix=".apc.edu.ph"
            label="Email"
          />

          <q-input
            class="q-pa-md"
            outlined
            v-model="regData.password"
            type="password"
            label="Password"
          />
          <div class="q-px-md">
            <div class="q-gutter-sm">
              <q-checkbox
                v-model="customModel"
                color="primary"
                true-value="yes"
                false-value="no"
              />
            </div>
            <div class="q-px-sm text-black">
              Do you agree with the terms & conditions?
            </div>
          </div>
          <div class="q-pa-sm">
            <q-btn
              class="full-width"
              @click="register"
              unelevated
              color="primary"
              label="Register Account"
            />
          </div>
          <div class="q-pa-sm">
            <q-btn
              class="full-width"
              unelevated
              color="grey-9"
              label="Head Back to Login Page"
              to="/login"
            />
          </div>
        </q-card>
      </div>
    </q-img>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import { db } from "boot/firebase";
import { mapActions } from "pinia";
import { authStore } from "../stores/store_Auth";

export default defineComponent({
  setup() {
    const auth = authStore();
    return { auth };
  },

  name: "RegisterPage",
  data() {
    return {
      regData: {
        fName: ref(""),
        lName: ref(""),
        email: ref(""),
        password: ref(""),
      },
      customModel: ref("no"),
    };
  },
  methods: {
    register() {
      this.auth.registerUser(this.regData);
    },
  },
});
</script>
