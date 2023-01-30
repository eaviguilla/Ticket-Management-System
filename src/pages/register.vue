<template>
  <div>
    <q-img src="~assets/RAMbg.png" style="height: 1050px" fit="cover">
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
            v-model="regData.passwd"
            type="password"
            label="Password"
          />
          <div class="q-pa-md">
            <q-btn
              class="full-width"
              @click="register()"
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
import { ref } from "vue";
import { db } from "boot/firebase";
import { Store } from "../stores/index";

console.log(Store.auth.users);

export default defineComponent({
  name: "RegisterPage",
  data() {
    return {
      regData: {
        fName: ref(""),
        lName: ref(""),
        email: ref(""),
        passwd: ref(""),
      },
    };
  },
  methods: {
    register() {
      console.log(this.regData);
    },
  },
});
</script>
