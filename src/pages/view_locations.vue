<template>
  <q-layout style="margin-bottom: 65px" view="hHh lpR fFf">
    <q-header bordered class="bg-white text-white">
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
        class="q-pa-xs items-start q-gutter-md"
        style="max-width: 550px; width: 100%; margin: 0 auto"
      >
        <q-item
          class="q-card"
          style="max-width: 450px"
          v-for="floor in floors"
          :key="floor.id"
          to="/view_rooms"
        >
          <div class="full-width">
            <q-item-section class="full-width" clickable v-ripple>
              <div class="text-h6">{{ floor.name }}</div>
            </q-item-section>
          </div>
          <div>
            <q-btn
              flat
              round
              icon="mdi-square-edit-outline"
              @click="confirm = true"
            />
          </div>
          <q-dialog v-model="confirm" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar
                  icon="mdi-cog-outline"
                  color="grey"
                  text-color="white"
                />
                <span class="q-ml-sm">Please select what you want.</span>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn
                  flat
                  class="q-pa-xl"
                  label="Delete Floor"
                  color="primary"
                  v-close-popup
                />
                <q-btn
                  flat
                  class="q-pa-xl"
                  label="Cancel"
                  color="primary"
                  v-close-popup
                />
                <q-btn
                  flat
                  class="q-pa-xl"
                  label="Save"
                  color="primary"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </q-item>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
const floors = [
  {
    id: 1,
    name: "Basement 1",
  },
  {
    id: 2,
    name: "Basement 2",
  },
  {
    id: 3,
    name: "Basement 3",
  },
  {
    id: 4,
    name: "1st Floor",
  },
  {
    id: 5,
    name: "2nd Floor",
  },
  {
    id: 6,
    name: "3rd Floor",
  },
  {
    id: 7,
    name: "4th Floor",
  },
  {
    id: 8,
    name: "5th Floor",
  },
  {
    id: 9,
    name: "6th Floor",
  },
  {
    id: 10,
    name: "7th Floor",
  },
  {
    id: 11,
    name: "8th Floor",
  },
  {
    id: 12,
    name: "9th Floor",
  },
  {
    id: 13,
    name: "10th Floor",
  },
  {
    id: 14,
    name: "11th Floor",
  },
  {
    id: 15,
    name: "12th Floor",
  },
];

const offline = [
  {
    id: 5,
    name: "Brunhilde Panswick",
    email: "bpanswick4@csmonitor.com",
    avatar: "avatar2.jpg",
  },
  {
    id: 6,
    name: "Winfield Stapforth",
    email: "wstapforth5@pcworld.com",
    avatar: "avatar6.jpg",
  },
];

export default {
  setup() {
    return {
      floors,
      offline,
      confirm: ref(false),
    };
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
