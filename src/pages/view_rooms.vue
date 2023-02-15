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
        <q-list bordered class="rounded-borders">
          <q-expansion-item
            class="text-h6 text-bold"
            expand-separator
            icon="mdi-map-marker-radius-outline"
            :label="floor.name"
            caption="John Doe"
            v-for="floor in floors"
            :key="floor.id"
          >
            <q-card>
              <q-card-section class="text-subtitle2 text-bold text-center"
                >{{ floor.room }}
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
const floors = [
  {
    id: 1,
    name: "Basement 1",
    room: "Room 808 Room 809 Room 810 Room 808 Room 809 Room 810 Room 808 Room 809 Room 810",
  },
  {
    id: 2,
    name: "Basement 2",
    room: "808 " + " 809 " + " 810",
  },
  {
    id: 3,
    name: "Basement 3",
    room: "808 " + " 809 " + " 810",
  },
  {
    id: 4,
    name: "1st Floor",
    room: "808 " + " 809 " + " 810",
  },
  {
    id: 5,
    name: "2nd Floor",
    room: "808 " + " 809 " + " 810",
  },
  {
    id: 6,
    name: "3rd Floor",
    room: "808 " + " 809 " + " 810",
  },
  {
    id: 7,
    name: "4th Floor",
    room: "808 " + " 809 " + " 810",
  },
  {
    id: 8,
    name: "5th Floor",
    room: "808 " + " 809 " + " 810",
  },
  {
    id: 9,
    name: "6th Floor",
    room: "808 " + " 809 " + " 810",
  },
  {
    id: 10,
    name: "7th Floor",
    room: "808 " + " 809 " + " 810",
  },
  {
    id: 11,
    name: "8th Floor",
    room: "808 " + " 809 " + " 810",
  },
  {
    id: 12,
    name: "9th Floor",
    room: "808 " + " 809 " + " 810",
  },
  {
    id: 13,
    name: "10th Floor",
    room: "808 " + " 809 " + " 810",
  },
  {
    id: 14,
    name: "11th Floor",
    room: "808 " + " 809 " + " 810",
  },
  {
    id: 15,
    name: "12th Floor",
    room: "808 " + " 809 " + " 810",
  },
];

export default {
  setup() {
    return {
      floors,
    };
  },
};
</script>
