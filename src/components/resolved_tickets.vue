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
    <div class="q-pt-xl column items-center">
      <div class="full-width q-px-md q-pb-xl" style="max-width: 750px">
        <h5 class="text-weight-bolder text-primary">Resolved Tickets</h5>
        <q-list class="">
          <q-item
            class="rounded-borders q-my-md q-card column"
            bordered
            clickable
            v-ripple
          >
            <q-item-section class="col">
              <!-- details, category, and status -->
              <q-item-label class="row items-center justify-between"
                ><div>
                  <span class="text-weight-bolder text-body1 q-pr-sm"
                    >bfiwfiwffniownfwefwefnwijfnwef</span
                  ><span class="text-bold text-grey-7">·</span
                  ><span class="text-bold text-grey-7 text-caption q-pl-sm">
                    boogaloo</span
                  >
                </div>
              </q-item-label>
              <!-- location -->
              <q-item-label class="text-caption">Floor 3 | 302 </q-item-label>
              <!-- date and ticket id -->
              <q-item-label class="row items-center justify-between">
                <div class="text-caption text-grey-7 q-pt-lg">
                  Resolved: 5mins ago
                </div>
                <div class="text-caption text-grey-7 q-pt-lg">
                  ID: 11181561561564
                </div>
              </q-item-label>
              <div flat class="q-mt-md row justify-betweem" style="width: 100%">
                <q-btn
                  flat
                  rounded
                  size="sm"
                  class="text-white bg-primary"
                  style="width: 100%"
                  label="View Ticket"
                  icon="mdi-file-search-outline"
                  to="/view_ticket"
                >
                </q-btn>
              </div>
            </q-item-section>
          </q-item>
        </q-list>

        <br />
        <br />
      </div>
    </div>
  </q-layout>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>
