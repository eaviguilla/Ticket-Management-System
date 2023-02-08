<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="itro" label="ITRO" />
          <q-tab name="bmo" label="BMO" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="itro">
            <div class="q-pl-md text-h6">ITRO upkeeps</div>
            <div class="q-pa-md" style="max-width">
              <q-list bordered separator>
                <template v-for="categ in ITRO_categ" :key="categ">
                  <q-item clickable v-ripple>
                    <q-item-section>{{ categ }}</q-item-section>
                    <q-btn color="deep-orange-14" icon="fa-solid fa-xmark" />
                  </q-item>
                </template>
              </q-list>
              <div class="q-pt-lg">
                <q-btn color="teal" icon="add" label="Add upkeep" />
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="bmo">
            <div class="q-pl-md text-h6">BMO upkeeps</div>
            <div class="q-pa-md" style="max-width">
              <q-list bordered separator>
                <template v-for="categ in BMO_categ" :key="categ">
                  <q-item clickable v-ripple>
                    <q-item-section>{{ categ }}</q-item-section>
                    <q-btn color="deep-orange-14" icon="fa-solid fa-xmark" />
                  </q-item>
                </template>
              </q-list>
              <div class="q-pt-lg">
                <q-btn color="teal" icon="add" label="Add upkeep" />
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
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
