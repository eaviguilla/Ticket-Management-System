<template>
  <q-layout style="margin-bottom: 65px" view="hHh lpR fFf"
    ><q-header bordered class="bg-white text-white">
      <q-toolbar>
        <q-btn flat rounded class="float-left" to="/create_ticket_loc"
          ><q-icon color="primary" name="mdi-arrow-left"></q-icon
        ></q-btn>
        <q-icon size="lg" name="img:src/assets/rams.png"></q-icon>
        <q-toolbar-title class="text-primary text-weight-bold"
          >RAMaintenance</q-toolbar-title
        >
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="q-pa-md">
        <div
          class="q-gutter-md"
          style="max-width: 550px; width: 100%; margin: 0 auto"
        >
          <div class="text-bold text-h6 text-primary">
            <p>Create Ticket Form</p>
          </div>

          <q-select
            v-model="addTicketForm.office"
            :options="offices"
            label="Select Office of Concern"
            outlined
          />

          <q-select
            v-model="addTicketForm.categID"
            :disable="!addTicketForm.office"
            :options="categ.selectCategs(this.addTicketForm.office)"
            label="Select Category"
            option-label="name"
            option-value="categID"
            emit-value
            map-options
            outlined
          />
          <q-input
            v-model="addTicketForm.description"
            :disable="!addTicketForm.categID"
            label="Enter Details of Concern"
            autogrow
            clearable
            outlined
          />
          <q-page-sticky expand position="bottom" class="q-pa-md">
            <q-btn
              :disable="!addTicketForm.description"
              @click="submitTicket()"
              class="full-width q-pa-md bg-secondary text-white"
              icon="mdi-circle-small"
              label="Submit"
              size="md"
              style="max-width: 1400px; border-radius: 20px"
              elevated
              no-caps
            />
          </q-page-sticky>
        </div></div></q-page-container
  ></q-layout>
</template>

<script>
import { ref } from "vue";
import { categStore } from "src/stores/store_Categ";
import { tickStore } from "src/stores/store_Ticket";
import { authStore } from "src/stores/store_Auth";
import { useRouter } from "vue-router";

export default {
  setup() {
    const categ = categStore();
    const tick = tickStore();
    const auth = authStore();
    const router = useRouter();

    return { auth, categ, tick, router };
  },
  data() {
    return {
      addTicketForm: {
        office: ref(null),
        categID: ref(""),
        description: ref(""),
        roomID: ref(""),
        timestamp: Date.now(),
      },
      offices: ["BMO", "ITRO"],
      ticketID: ref(""),
    };
  },
  mounted() {
    this.addTicketForm.roomID = this.$route.params.roomID;
    this.categ.getCategs();
  },
  methods: {
    submitTicket() {
      const test = this.tick.addTicket(this.addTicketForm);
      console.log(this.addTicketForm.description);
      // this.ticketID = this.tick.getTicket(this.addTicketForm);
      // console.log("From vue: ", test.ticketID);
      // this.router.replace("/view_ticket/" + this.ticketID);
    },
  },
};
</script>
