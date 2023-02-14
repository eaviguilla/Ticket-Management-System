<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Locations</q-toolbar-title>
    </q-toolbar>

    <q-list bordered separator>
      <q-item
        v-for="first in firstfloor"
        :key="first.id"
        class="q-my-sm"
        clickable
        v-ripple
        :inset-level="first.insetLevel"
      >
        <q-item-section avatar>
          <q-avatar color="grey"> </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ first.name }}</q-item-label>
          <q-item-label caption lines="1">{{ first.email }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="chat_bubble" color="green" />
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item
        v-for="room1 in rooms1"
        :key="room1.id"
        class="q-mb-sm"
        clickable
        v-ripple
        :inset-level="room1.insetLevel"
      >
        <q-item-section>
          <q-item-label>{{ room1.name }}</q-item-label>
          <q-item-label caption lines="1">{{ room1.email }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="chat_bubble" color="grey" />
        </q-item-section>
      </q-item>
    </q-list>

    <!--           -->
    <!-- 2nd Floor -->
    <!-- 2nd Floor -->
    <!-- 2nd Floor -->
    <!--           -->

    <q-list bordered separator>
      <q-item
        v-for="second in secondfloor"
        :key="second.id"
        class="q-my-sm"
        clickable
        v-ripple
        :inset-level="second.insetLevel"
      >
        <q-item-section avatar>
          <q-avatar color="green"> </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ second.name }}</q-item-label>
          <q-item-label caption lines="1">{{ second.email }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="chat_bubble" color="green" />
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item
        v-for="room2 in rooms2"
        :key="room2.id"
        class="q-mb-sm"
        clickable
        v-ripple
        :inset-level="room2.insetLevel"
      >
        <q-item-section>
          <q-item-label>{{ room2.name }}</q-item-label>
          <q-item-label caption lines="1">{{ room2.email }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="chat_bubble" color="grey" />
        </q-item-section>
      </q-item>
    </q-list>

    <!--           -->
    <!-- 3rd Floor -->
    <!-- 3rd Floor -->
    <!-- 3rd Floor -->
    <!--           -->

    <q-list bordered separator>
      <q-item
        v-for="third in thirdfloor"
        :key="third.id"
        class="q-my-sm"
        clickable
        v-ripple
        :inset-level="third.insetLevel"
      >
        <q-item-section avatar>
          <q-avatar color="light-green"> </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ third.name }}</q-item-label>
          <q-item-label caption lines="1">{{ third.email }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="chat_bubble" color="green" />
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item
        v-for="room3 in rooms3"
        :key="room3.id"
        class="q-mb-sm"
        clickable
        v-ripple
        :inset-level="room3.insetLevel"
      >
        <q-item-section>
          <q-item-label>{{ room3.name }}</q-item-label>
          <q-item-label caption lines="1">{{ room3.email }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="chat_bubble" color="grey" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
const firstfloor = [
  {
    id: 1,
    name: "1st Floor",
    email: "Rooms 101-117",
    insetLevel: 0,
  },
];

const rooms1 = [
  {
    id: 1,
    name: "Room 101",
    email: "<blank>",
    insetLevel: 1,
  },
  {
    id: 2,
    name: "Room 102",
    email: "<blank>",
    insetLevel: 1,
  },
  {
    id: 3,
    name: "Room 102",
    email: "<blank>",
    insetLevel: 1,
  },
];

const secondfloor = [
  {
    id: 1,
    name: "2nd Floor",
    email: "Rooms 201-217",
    insetLevel: 0,
  },
];

const rooms2 = [
  {
    id: 1,
    name: "Room 201",
    email: "<blank>",
    insetLevel: 1,
  },
  {
    id: 2,
    name: "Room 202",
    email: "<blank>",
    insetLevel: 1,
  },
  {
    id: 3,
    name: "Room 202",
    email: "<blank>",
    insetLevel: 1,
  },
];

const thirdfloor = [
  {
    id: 1,
    name: "3rd Floor",
    email: "Rooms 301-317",
    insetLevel: 0,
  },
];

const rooms3 = [
  {
    id: 1,
    name: "Room 301",
    email: "<blank>",
    insetLevel: 1,
  },
  {
    id: 2,
    name: "Room 302",
    email: "<blank>",
    insetLevel: 1,
  },
  {
    id: 3,
    name: "Room 302",
    email: "<blank>",
    insetLevel: 1,
  },
];

export default {
  setup() {
    return {
      firstfloor,
      rooms1,
      secondfloor,
      rooms2,
      thirdfloor,
      rooms3,
    };
  },
};
</script>
