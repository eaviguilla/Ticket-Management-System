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
            :rules="[(val) => !!val || 'Field is required']"
            lazy-rules
          />
          <q-input
            class="q-pa-md"
            outlined
            v-model="regData.lName"
            label="Last Name"
            :rules="[(val) => !!val || 'Field is required']"
            lazy-rules
          />

          <q-input
            class="q-pa-md"
            outlined
            v-model="regData.email"
            type="email"
            label="Email"
            :rules="[
              (val) => !!val || 'APC Email is required',
              (val) => this.check.email || 'It must end with apc.edu.ph',
            ]"
            lazy-rules
          />

          <q-input
            class="q-pa-md"
            outlined
            v-model="regData.password"
            type="password"
            label="Password"
            :rules="[
              (val) => !!val || 'Field is required',
              (val) => this.check.password || 'More than 8 characters required',
            ]"
            lazy-rules
          />
          <q-input
            class="q-pa-md"
            outlined
            v-model="regData.confirm_password"
            type="password"
            label="Confirm Password"
            :rules="[
              (val) => !!val || 'Field is required',
              (val) => this.check.confirm_password || 'Password does not match',
            ]"
            lazy-rules
          />
          <div class="q-px-md">
            <div class="q-gutter-sm">
              <q-checkbox
                v-model="customModel"
                color="primary"
                true-value="yes"
                false-value="no"
                size="lg"
              />

              <q-btn
                label="Terms & Conditions"
                color="primary"
                @click="alert = true"
              />
              <q-dialog v-model="alert">
                <q-card>
                  <q-card-section>
                    <div class="text-h6">
                      Data Privacy Act Notice for RAMaintenance Users
                    </div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                    At RAMaintenance, we value your privacy and are committed to
                    protecting your personal information. We are governed by the
                    National Privacy Commission of the Republic of the
                    Philippines and comply with the Data Privacy Act of 2012.
                    <br />
                    <br />
                    What information we collect when you sign up for an account
                    with RAMaintenance, we collect your first name, last name,
                    school email, and a password to create and manage your
                    account. This information is necessary for us to provide you
                    with access to our services.
                    <br />
                    <br />
                    How we use your information we use your information to
                    provide you with access to our services and to improve our
                    services. We will not share your personal information with
                    any third parties without your consent unless required by
                    law.
                    <br />
                    <br />
                    How we protect your information we have implemented security
                    measures to protect your personal information from
                    unauthorized access, use, or disclosure. We use encryption
                    to protect your data and restrict access to your personal
                    information to only those employees who need it to provide
                    you with our services.
                    <br />
                    <br />
                    Your rights as a user, you have the right to access, update,
                    and delete your personal information. You may also request a
                    copy of the personal information we hold about you. If you
                    have any concerns about how we use your personal
                    information, you may contact us at
                    ecviguilla@student.apc.edu.ph
                    <br />
                    <br />
                    By using our services and providing us with your personal
                    information, you agree to our data privacy policy. We may
                    update this policy from time to time, and we will notify you
                    of any changes. Thank you for choosing RAMaintenance.
                  </q-card-section>

                  <q-card-actions align="right">
                    <q-btn flat label="OK" color="primary" v-close-popup />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </div>

            <div class="q-px-sm text-black">
              By signing up for a RAMaintenance account, you agree to our terms
              and conditions regarding the collection, use, and protection of
              your personal information in accordance with the Data Privacy Act
              of the Philippines.
            </div>
          </div>
          <div class="q-pa-sm">
            <q-btn
              :disable="
                customModel == 'no' ||
                regData.fName == '' ||
                regData.lName == '' ||
                regData.email == '' ||
                regData.password == ''
              "
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
        confirm_password: ref(""),
      },
      check: {
        fName: ref(false),
        lName: ref(false),
        email: ref(false),
        password: ref(false),
        confirm_password: ref(false),
      },
      apc_email: /^[^\s@]+@(student.)?apc.edu.ph$/,
      customModel: ref("no"),
      alert: ref(false),
    };
  },
  watch: {
    "regData.fName"() {
      if (this.regData.fName === "") {
        this.check.fName = false;
      } else {
        this.check.fName = true;
      }
    },
    "regData.lName"() {
      if (this.regData.lName === "") {
        this.check.lName = false;
      } else {
        this.check.lName = true;
      }
    },
    "regData.email"() {
      if (this.apc_email.test(this.regData.email)) {
        this.check.email = true;
        console.log("Correct");
      } else {
        this.check.email = false;
      }
    },
    "regData.password"() {
      if (this.regData.password === "") {
        this.check.password = false;
      } else if (this.regData.password.length < 8) {
        this.check.password = false;
        console.log("Less than 8");
      } else {
        this.check.password = true;
      }
    },
    "regData.confirm_password"() {
      if (this.regData.confirm_password === this.regData.password) {
        this.check.confirm_password = true;
        console.log("Correct");
      } else {
        this.check.confirm_password = false;
      }
    },
  },
  methods: {
    register() {
      if (
        this.check.fName &&
        this.check.lName &&
        this.check.email &&
        this.check.password &&
        this.check.confirm_password
      ) {
        this.auth.registerUser(this.regData);
      } else {
      }
    },
  },
});
</script>
