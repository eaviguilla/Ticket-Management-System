<template>
  <q-layout view="lHh lpr lFf">
    <div class="column items-center">
      <div class="full-width q-px-md q-pb-xl" style="max-width: 750px">
        <div class="q-pt-md q-pl-md text-weight-bolder text-primary text-h6">
          Subscribed Tickets
        </div>
        <q-item
          class="rounded-borders q-my-md q-card column full-width"
          bordered
          clickable
          v-ripple
          v-for="ticket in tick.filterSub"
          :key="ticket.ticketID"
          :to="'/view_ticket/' + ticket.ticketID"
          @click="tick.getTicket(ticket.ticketID)"
        >
          <q-item-section class="col">
            <!-- details, category, and status -->
            <q-item-label class="row items-center justify-between"
              ><div>
                <span class="text-weight-bolder text-body1 q-pr-sm">{{
                  ticket.description.substring(0, 17) + ".."
                }}</span
                ><span class="text-bold text-grey">·</span
                ><span class="text-bold text-grey text-caption q-pl-sm">
                  {{ categs.displayCateg(ticket.categID) }}
                </span>
              </div>
              <div
                class="rounded-borders bg-yellow-4 q-pa-xs text-caption text-weight-medium text-black"
                bordered
              >
                {{ ticket.status }}
              </div>
            </q-item-label>
            <!-- location -->
            <q-item-label class="text-caption"
              ><span class="text-bold">Floor/Location: </span
              >{{ locs.displayFloor(ticket.roomID) }} |
              {{ locs.displayRoom(ticket.roomID) }}
            </q-item-label>
            <!-- date and ticket id -->
            <q-item-label class="row items-center justify-between">
              <div class="text-caption text-grey q-pt-lg"></div>
              <div class="text-caption text-grey q-pt-lg">
                ID: {{ ticket.ticketID }}
              </div>
            </q-item-label>
          </q-item-section>
          <!-- <q-item-section
            ><div flat class="q-mt-md row justify-betweem" style="width: 100%">
              <q-btn
                flat
                rounded
                size="sm"
                class="text-white bg-secondary"
                style="
                  width: 50%;
                  border-bottom-right-radius: 0;
                  border-top-right-radius: 0;
                "
                label="Assist"
                icon="mdi-account-multiple-plus-outline"
              >
              </q-btn>
              <q-btn
                flat
                rounded
                size="sm"
                class="text-white bg-primary"
                style="
                  width: 50%;
                  border-bottom-left-radius: 0;
                  border-top-left-radius: 0;
                "
                label="Subscribe"
                icon="mdi-bell-plus-outline"
              >
              </q-btn></div
          ></q-item-section> -->
        </q-item>
        <br />
        <br />
      </div>
    </div>
  </q-layout>
</template>
<script>
import { defineComponent, ref } from "vue";
import { tickStore } from "src/stores/store_Ticket";
import { categStore } from "src/stores/store_Categ";
import { locsStore } from "src/stores/store_Loc";

export default defineComponent({
  setup() {
    const tick = tickStore();
    const categs = categStore();
    const locs = locsStore();

    return { tick, categs, locs };
  },
  data() {
    return {
      title: ref("bfiwfiwffniownfwefwefnwijfnwef"),
    };
  },
  mounted() {},
  methods: {},
  computed: {},
});
</script>
