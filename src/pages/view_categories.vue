<template>
  <div class="full-width">
    <q-item
      class="rounded-borders q-my-sm q-card items-center"
      v-for="categ in ITRO_categ"
      :key="categ"
      bordered
      ><div class="full-width">
        <q-item-section class="justify-between">
          <q-item-label class="text-weight-bolder text-body2 q-pr-sm">{{
            categ
          }}</q-item-label>
          <q-item-label class="text-overline"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            placerat faucibus enim eget vulputate. Aliquam luctus laoreet
            just</q-item-label
          >
          <div class="q-pa-md q-gutter-sm" align="right">
            <q-btn
              unelevated
              round
              color="teal"
              icon="fa-solid fa-pen-to-square"
              size="sm"
            />
            <q-btn
              unelevated
              round
              color="grey-10"
              icon="fa-solid fa-trash"
              size="sm"
            />
          </div>
        </q-item-section></div
    ></q-item>
  </div>
  <div class="">
    <q-page-sticky expand position="bottom-left" class="q-pa-lg">
      <q-btn
        unelevated
        round
        color="light-green-4"
        icon="fa-solid fa-plus"
        size="lg"
      />
    </q-page-sticky>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      tab: ref("mails"),
      ITRO_categ: [
        "Computer",
        "Internet",
        " Chords",
        "Osbot",
        "Laptop",
        "Boogaloo",
      ],
      BMO_categ: [
        "Aircondition",
        "Lightings",
        "Electircals",
        "Flooring",
        "Plummings",
        "Elevator",
        "Chair",
        "Table",
        "Locker",
      ],
    };
  },
};
</script>
