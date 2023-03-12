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
    <div class="q-pt-lg column items-center">
      <div class="full-width q-px-md q-pb-xl" style="max-width: 750px">
        <h5 class="text-weight-bolder text-primary">Resolved Tickets</h5>
        <q-item
          v-for="ticket in tick.filterSubResolved"
          :key="ticket.ticketID"
          v-ripple
          :to="'/view_ticket/' + ticket.ticketID"
          @click="tick.getTicket(ticket.ticketID)"
          class="rounded-borders q-my-md q-card column full-width"
          bordered
          clickable
        >
          <q-item-section class="col">
            <!-- details, category, and status -->
            <q-item-label class="row justify-between items-center">
              <span class="text-bold text-grey text-caption">
                · {{ categs.displayCateg(ticket.categID) }}
              </span>
              <span
                class="rounded-borders bg-yellow-4 q-pa-xs text-caption text-weight-medium text-black"
                >{{ ticket.status }}</span
              >
            </q-item-label>
            <q-item-label class="row items-center justify-between"
              ><div class="text-weight-bolder text-body1">
                {{ ticket.description }}
              </div>
            </q-item-label>

            <!-- location -->
            <q-item-label class="text-caption q-pb-sm"
              ><span class="text-bold">Floor/Location: </span
              >{{ locs.displayFloor(ticket.roomID) }} |
              {{ locs.displayRoom(ticket.roomID) }}
            </q-item-label>
            <q-separator
              :color="ticket.office === 'BMO' ? 'pink' : 'blue-10'"
            />
            <!-- date and ticket id -->
            <q-item-label class="row items-center justify-between">
              <div class="text-caption text-grey q-pt-sm">
                <q-icon
                  :name="
                    ticket.office == 'BMO' ? 'mdi-tools' : 'mdi-desktop-classic'
                  "
                  size="sm"
                  :color="ticket.office === 'BMO' ? 'pink' : 'blue-10'"
                />
              </div>

              <div class="text-caption text-grey q-pt-sm">
                ID: {{ ticket.ticketID }}
              </div>
            </q-item-label>
          </q-item-section>
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
    return {};
  },
  mounted() {},
  methods: {},
  computed: {},
});
</script>
