<template>
  <q-layout view="lHh lpr lFf">
    <div class="column items-center">
      <div class="full-width q-px-md q-pb-xl" style="max-width: 750px">
        <div class="q-pt-md q-pl-md text-weight-bolder text-primary text-h6">
          Unassigned Tickets
        </div>
        <q-item
          v-for="ticket in tick.filterActiveUnassigned"
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
                <span>
                  Assigned to: {{ users.getStaffName(ticket.assigned) }}
                </span>
              </div>
              <!-- time here -->
              <div
                v-if="ticket.criticality === 'None'"
                class="text-caption text-grey text-bold q-pt-sm"
              >
                {{ ticket.criticality }}
              </div>
              <div
                v-if="ticket.criticality === 'Low'"
                class="text-caption text-primary text-bold q-pt-sm"
              >
                {{ ticket.criticality }}
              </div>
              <div
                v-if="ticket.criticality === 'Medium'"
                class="text-caption text-orange text-bold q-pt-sm"
              >
                {{ ticket.criticality }}
              </div>
              <div
                v-if="ticket.criticality === 'High'"
                class="text-caption text-secondary text-bold q-pt-sm"
              >
                {{ ticket.criticality }}
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
import { userStore } from "src/stores/store_User";

export default defineComponent({
  setup() {
    const tick = tickStore();
    const categs = categStore();
    const locs = locsStore();
    const users = userStore();

    return { tick, categs, locs, users };
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  computed: {},
});
</script>
