<template>
  <q-layout style="margin-bottom: 65px" view="hHh lpR fFf"
    ><q-header bordered class="bg-white text-white">
      <q-toolbar>
        <q-btn flat rounded class="float-left" to="/"
          ><q-icon color="primary" name="mdi-arrow-left"></q-icon
        ></q-btn>
        <q-icon size="lg" name="img:src/assets/rams.png"></q-icon>
        <q-toolbar-title class="text-primary text-weight-bold"
          >RAMaintenance</q-toolbar-title
        >
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div
        class="q-pa-md"
        style="max-width: 550px; width: 100%; margin: 0 auto"
      >
        <div class="q-gutter-md">
          <div class="text-bold text-h6 text-primary q-py-sm">
            Create Ticket
          </div>

          <q-select
            v-model="floor"
            :options="this.locs.selectFloors"
            label="Select Floor/Location"
            option-label="floor"
            option-value="floorID"
            emit-value
            map-options
            outlined
          />
          <q-select
            v-model="room"
            :disable="!floor"
            :options="this.roomsOptions"
            label="Select Specific Area/Room"
            option-label="area_room"
            option-value="roomID"
            emit-value
            map-options
            outlined
          />

          <q-page-sticky expand position="bottom" class="q-pa-md">
            <q-btn
              class="full-width q-pa-md bg-secondary text-white"
              label="Next"
              icon-right="mdi-chevron-right"
              size="md"
              :disable="!room"
              :to="'/create_ticket_desc/' + this.room"
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
import { locsStore } from "src/stores/store_Loc";
import { tickStore } from "src/stores/store_Ticket";

export default {
  setup() {
    const locs = locsStore();
    const tick = tickStore();

    return { locs, tick };
  },
  data() {
    return {
      floor: ref(""),
      room: ref(""),
      roomsOptions: ref(null),
    };
  },
  watch: {
    floor() {
      this.room = "";
      this.roomsOptions = this.locs.selectRooms(this.floor);
    },
  },
  mounted() {
    this.tick.ticket = {};
  },
  methods: {},
};
</script>
