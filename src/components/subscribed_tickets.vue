<template>
  <q-layout view="lHh lpr lFf">
    <div class="q-pl-lg">
      <h5 class="text-weight-bolder text-primary">Active Tickets</h5>
    </div>
    <div class="column items-center">
      <div class="full-width q-px-md q-pb-xl" style="max-width: 750px">
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
                  ><span class="text-bold text-grey">·</span
                  ><span class="text-bold text-grey text-caption q-pl-sm">
                    boogaloo</span
                  >
                </div>
                <div
                  class="rounded-borders bg-yellow-4 q-pa-xs text-caption text-weight-medium text-black"
                  bordered
                >
                  On-going
                </div>
              </q-item-label>
              <!-- location -->
              <q-item-label class="text-caption">Floor 3 | 302 </q-item-label>
              <!-- date and ticket id -->
              <q-item-label class="row items-center justify-between">
                <div class="text-caption text-grey q-pt-lg">
                  Submitted: 5mins ago
                </div>
                <div class="text-caption text-grey q-pt-lg">
                  ID: 11181561561564
                </div>
              </q-item-label>
              <div class="q-pa-md q-gutter-sm" align="center">
                <q-btn
                  unelevated
                  color="teal"
                  label="View ticket"
                  size="md"
                  style="width: 300px"
                />
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
