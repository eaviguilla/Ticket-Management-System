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
        <div class="text-h6 text-bold text-primary">Floors/Locations</div>
        <q-item
          class="q-card items-center"
          style="max-width: 450px"
          v-for="floor in floors"
          :key="floor.id"
        >
          <div style="width: 50%">
            <q-item-section>
              <div class="text-bold">{{ floor.name }}</div>
              <div class="text-overline">Active</div>
            </q-item-section>
          </div>
          <div style="width: 50%" class="row justify-around">
            <!-- edit floor button -->
            <q-btn
              @click="confirm = true"
              class="bg-secondary text-lowercase"
              style="
                width: 50%;
                border-bottom-right-radius: 0;
                border-top-right-radius: 0;
              "
              color="white"
              size="md"
              flat
              stack
              icon="mdi-square-edit-outline"
            />
            <!-- go to rooms button -->
            <q-btn
              class="bg-primary text-lowercase"
              style="
                width: 50%;
                border-bottom-left-radius: 0;
                border-top-left-radius: 0;
              "
              color="white"
              size="md"
              to="/view_rooms"
              flat
              stack
              icon="mdi-door-sliding"
            />
          </div>
        </q-item>
        <!-- edit dialog -->
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
      </div>
      <!-- add floor/location button -->
      <q-page-sticky expand position="bottom" class="q-pa-md">
        <q-btn
          @click="locAdd = true"
          class="full-width q-pa-md bg-secondary text-white"
          label="Add Floor/Location"
          size="md"
          style="max-width: 1400px; border-radius: 20px"
          elevated
          no-caps
        />
      </q-page-sticky>
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
];

export default {
  setup() {
    return {
      floors,
      confirm: ref(false),
    };
  },
  data() {
    return {
      locAdd: ref(false),
    };
  },
  mounted() {},
  methods: {},
};
</script>
