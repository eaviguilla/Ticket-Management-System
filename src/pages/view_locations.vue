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
        class="q-pa-md"
        style="max-width: 550px; width: 100%; margin: 0 auto"
      >
        <div class="text-h6 text-bold text-primary">Floors/Locations</div>
        <q-item
          class="rounded-borders q-my-sm q-card items-center"
          v-for="floor in locs.filterFloors"
          :key="floor.floorID"
        >
          <div style="width: 50%">
            <q-item-section>
              <div class="text-bold">Floor/Location: {{ floor.floor }}</div>
              <div v-if="floor.enabled" class="text-overline text-green">
                Enabled
              </div>
              <div v-else class="text-overline text-red">Disabled</div>
            </q-item-section>
          </div>
          <div style="width: 50%" class="row justify-around">
            <!-- edit floor button -->
            <q-btn
              v-if="auth.userDetails.admin"
              @click="editDialog(floor)"
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
              :to="'/view_rooms/' + floor.floorID"
              flat
              stack
              icon="mdi-office-building-marker-outline"
            />
          </div>
        </q-item>
        <!-- edit dialog -->
        <q-dialog v-model="editFloor" persistent>
          <q-card style="max-width: 500px; width: 100%">
            <q-card-section class="row items-center">
              <span class="q-ml-sm text-h6">Edit Floor/Location</span
              ><span class="q-ml-sm text-caption"
                >Please enter the updated Floor number/Location.</span
              >
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-input
                outlined
                label="Floor/Location"
                v-model="this.editFloorForm.floor"
                autofocus
                @keyup.enter="prompt = false"
              />
            </q-card-section>

            <q-card-section class="q-py-none">
              <q-toggle
                v-model="this.editFloorForm.enabled"
                checked-icon="check"
                color="green"
                unchecked-icon="clear"
                label="Enable Floor/Location"
                size="lg"
                left-label
              />
            </q-card-section>
            <q-card-section class="q-pt-none"
              ><span class="text-caption"
                >Disabling a Floor/Location would remove it from the Floors
                selection in the ticket creation.</span
              ></q-card-section
            >
            <q-card-actions align="right">
              <q-btn
                flat
                class="q-pa-xl"
                label="Cancel"
                color="primary"
                v-close-popup
              />
              <q-btn
                flat
                @click="locs.updateFloor(this.editFloorForm)"
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
      <!-- add floor/location dialog -->
      <q-dialog v-model="locAdd" persistent>
        <q-card style="max-width: 500px; width: 100%">
          <q-card-section class="row items-center">
            <span class="q-ml-sm text-h6">Add Floor/Location</span>
            <span class="q-ml-sm text-caption"
              >Please enter the Floor number/Location.</span
            >
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              label="Floor/Location"
              v-model="floor"
              autofocus
              @keyup.enter="prompt = false"
            />
          </q-card-section>
          <q-card-actions align="right">
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
              @click="addFloor()"
              color="primary"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { authStore } from "src/stores/store_Auth";
import { locsStore } from "src/stores/store_Loc";

export default {
  setup() {
    const auth = authStore();
    const locs = locsStore();

    return { auth, locs };
  },
  data() {
    return {
      editFloor: ref(false),
      locAdd: ref(false),
      floor: ref(""),
      editFloorForm: {
        floorID: ref(""),
        floor: ref(""),
        enabled: ref(true),
      },
      options: [true, false],
    };
  },
  mounted() {
    this.locs.getFloors();
  },
  methods: {
    addFloor() {
      this.locs.addFloor(this.floor);
      this.floor = "";
      this.locAdd = false;
    },
    editDialog(payload) {
      this.editFloorForm.floorID = payload.floorID;
      this.editFloorForm.floor = payload.floor;
      this.editFloorForm.enabled = payload.enabled;
      this.editFloor = true;
    },
  },
};
</script>
