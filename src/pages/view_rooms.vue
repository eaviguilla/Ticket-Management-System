<template>
  <q-layout style="margin-bottom: 65px" view="hHh lpR fFf">
    <q-header bordered class="bg-white text-white">
      <q-toolbar>
        <q-btn flat rounded class="float-left" to="/view_locations"
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
        style="max-width: 600px; width: 100%; margin: 0 auto"
      >
        <div class="text-h6 text-bold text-primary">
          Specific Areas/Rooms in Floor/Location
          {{ locs.floor.floor }}
        </div>

        <q-item
          class="rounded-borders q-my-sm q-card items-center"
          v-for="room in locs.filterRooms(this.addRoomForm.floorID)"
          :key="room.roomID"
        >
          <div style="width: 100%">
            <q-item-section>
              <div>
                <span class="text-bold">Area/Room: </span>{{ room.area_room }}
              </div>
              <div v-if="room.enabled" class="text-overline text-green">
                Enabled
              </div>
              <div v-else class="text-overline text-red">Disabled</div>
            </q-item-section>
          </div>
          <div>
            <!-- edit room button -->
            <q-btn
              class="bg-secondary text-lowercase"
              color="white"
              @click="editDialog(room)"
              size="md"
              flat
              stack
              icon="mdi-square-edit-outline"
            />
          </div>
        </q-item>
        <!-- add area/room button -->
        <q-page-sticky expand position="bottom" class="q-pa-md">
          <q-btn
            @click="locAdd = true"
            class="full-width q-pa-md bg-secondary text-white"
            label="Add Specific Area/Room"
            size="md"
            style="max-width: 1400px; border-radius: 20px"
            elevated
            no-caps
          />
        </q-page-sticky>
        <!-- add specific area/room dialog -->
        <q-dialog v-model="locAdd" persistent>
          <q-card style="max-width: 500px; width: 100%">
            <q-card-section class="row items-center">
              <span class="q-ml-sm text-h6">Add Specific Area/Room</span>
              <span class="q-ml-sm text-caption"
                >Please enter the Specific Area/Room number.</span
              >
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-input
                outlined
                label="Specific Area/Room"
                v-model="this.addRoomForm.area_room"
                autofocus
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
                @click="addRoom()"
                color="primary"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <!-- edit specific area/room dialog -->
        <q-dialog v-model="editRoom" persistent>
          <q-card style="max-width: 500px; width: 100%">
            <q-card-section class="row items-center">
              <span class="q-ml-sm text-h6">Edit Specific Area/Room</span
              ><span class="q-ml-sm text-caption"
                >Please enter the updated Speciofic Area/Room.</span
              >
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-input
                outlined
                label="Specific Area/Room"
                v-model="this.editRoomForm.area_room"
                autofocus
              />
            </q-card-section>

            <q-card-section class="q-py-none">
              <q-toggle
                v-model="this.editRoomForm.enabled"
                checked-icon="check"
                color="green"
                unchecked-icon="clear"
                label="Enable Specific Area/Room"
                size="lg"
                left-label
              />
            </q-card-section>
            <q-card-section class="q-pt-none"
              ><span class="text-caption"
                >Disabling a Specific Area/Room would remove it from the
                Specific Area/Room selection in the ticket creation.</span
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
                @click="locs.updateRoom(this.editRoomForm)"
                class="q-pa-xl"
                label="Save"
                color="primary"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
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
      addRoomForm: {
        floorID: ref(""),
        area_room: ref(""),
      },
      editRoomForm: {
        area_room: ref(""),
        enabled: ref(true),
      },
      locAdd: ref(false),
      editRoom: ref(false),

      rooms: [
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
      ],
    };
  },
  mounted() {
    this.addRoomForm.floorID = this.$route.params.floorID;
    this.locs.getRooms();
  },
  methods: {
    addRoom() {
      this.locs.addRoom(this.addRoomForm);
      this.addRoomForm.area_room = "";
      this.locAdd = false;
      this.locs.getFloor(this.addRoomForm.floorID);
    },
    editDialog(payload) {
      this.editRoomForm.roomID = payload.roomID;
      this.editRoomForm.area_room = payload.area_room;
      this.editRoomForm.enabled = payload.enabled;
      this.editRoom = true;
    },
  },
};
</script>
