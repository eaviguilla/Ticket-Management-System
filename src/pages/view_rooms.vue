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
        <q-item
          class="rounded-borders q-my-sm q-card items-center"
          v-for="floor in floors"
          :key="floor.id"
        >
          <div style="width: 100%">
            <q-item-section>
              <div class="text-bold">Area/Room: {{ floor.name }}</div>
              <!-- <div v-if="floor.enabled" class="text-overline text-green">
                Enabled
              </div>
              <div v-else class="text-overline text-red">Disabled</div> -->
            </q-item-section>
          </div>
          <div>
            <!-- edit floor button -->
            <q-btn
              class="bg-secondary text-lowercase"
              color="white"
              size="md"
              flat
              stack
              icon="mdi-square-edit-outline"
            />
          </div>
        </q-item>
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
      floors: [
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
    console.log(this.$route.params.floorID);
    this.locs.getRooms();
  },
  methods: {},
};
</script>
