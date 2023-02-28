<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-white text-white">
      <q-toolbar>
        <q-btn flat rounded class="float-left" to="/view_tickets"
          ><q-icon color="primary" name="mdi-arrow-left"></q-icon
        ></q-btn>
        <q-icon size="lg" name="img:src/assets/rams.png"></q-icon>
        <q-toolbar-title class="text-primary text-weight-bold"
          >RAMaintenance</q-toolbar-title
        >
      </q-toolbar>
    </q-header>
    <q-page-container>
      <div class="column content-center">
        <div style="max-width: 1024px; width: 100%">
          <!-- back button -->

          <div class="q-ma-md">
            <div class="text-h6 q-pb-sm text-bold text-primary">
              Ticket Details
            </div>
            <!-- ticket id -->
            <q-card class="row items-center bg-primary" bordered flat>
              <q-card-section class="col row items-center">
                <span class="col text-subtitle2 text-white text-bold"
                  >ID:
                </span>
                <span class="col text-right text-caption text-white text-bold"
                  >{{ tick.ticket.ticketID }}
                </span>
              </q-card-section></q-card
            >
          </div>
          <!-- unsubscribe ticket -->
          <q-card
            v-if="!isSubscribed"
            v-ripple
            class="row justify-center q-ma-md bg-primary text-white"
            clickable
            rounded
            @click="tick.subTicket(tick.ticket.ticketID)"
            ><div class="row items-center">
              <q-icon class="col" name="mdi-bell-ring-outline" />

              <div class="col q-pr-lg text-overline">Subscribe</div>
            </div>
          </q-card>

          <q-card
            v-if="isSubscribed"
            v-ripple
            class="row justify-center q-ma-md bg-secondary text-white"
            clickable
            rounded
            @click="tick.unsubTicket(tick.ticket.ticketID)"
            ><div class="row items-center">
              <q-icon class="col" name="mdi-bell-off-outline" />

              <div class="col q-pr-xl text-overline">Unsubscribe</div>
            </div>
          </q-card>
          <!-- office and category -->
          <div class="q-ma-md">
            <q-card bordered flat class="row items-center"
              ><q-card-section class="col row items-center">
                <span class="col text-subtitle1 text-primary text-bold"
                  >Office:
                </span>
                <span class="col text-right text-caption text-bold">{{
                  tick.ticket.office
                }}</span>
              </q-card-section>
              <q-separator vertical />

              <q-card-section class="col row items-center">
                <span class="col text-subtitle1 text-primary text-bold"
                  >Category:
                </span>
                <span class="col text-right text-caption text-bold">{{
                  categ.displayCateg(tick.ticket.categID)
                }}</span>
              </q-card-section>
            </q-card>
          </div>
          <!-- floor and specific area/floor -->
          <div class="q-ma-md">
            <q-card bordered flat class="row items-center"
              ><q-card-section class="col row items-center">
                <span class="col text-subtitle1 text-primary text-bold"
                  >Floor / Location:
                </span>
                <span class="col text-right text-caption text-bold">{{
                  locs.floor.floor
                }}</span>
              </q-card-section>
              <q-separator vertical />

              <q-card-section class="col row items-center">
                <span class="col text-subtitle1 text-primary text-bold"
                  >Specific Area / Room:
                </span>
                <span class="col text-right text-caption text-bold">{{
                  locs.room.area_room
                }}</span>
              </q-card-section>
            </q-card>
          </div>
          <!-- ticket description and status -->
          <div class="q-ma-md">
            <q-card bordered flat
              ><q-card-section
                class="col text-subtitle1 text-primary text-bold"
              >
                Description: </q-card-section
              ><q-card-section class="col text-subtitle2">{{
                tick.ticket.description
              }}</q-card-section>
              <q-separator />
            </q-card>
          </div>
          <q-dialog
            v-model="note"
            persistent
            maximized
            transition-show="slide-up"
            transition-hide="slide-down"
          >
            <q-card class="bg-grey-2">
              <q-card class="row q-pa-lg items-center">
                <q-btn
                  flat
                  icon="mdi-arrow-left q-pr-md text-primary"
                  v-close-popup
                  size="lg"
                />
                <span class="text-h4 text-bold self-center text-primary"
                  >NOTES</span
                ></q-card
              >
            </q-card>
          </q-dialog>
          <q-page-sticky position="bottom-right" :offset="[25, 25]">
            <q-btn
              rounded
              color="primary"
              label="Notes"
              icon="mdi-forum-outline"
              class="q-pa-md"
            />
          </q-page-sticky>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { tickStore } from "src/stores/store_Ticket";
import { locsStore } from "src/stores/store_Loc";
import { categStore } from "src/stores/store_Categ";

export default {
  setup() {
    const tick = tickStore();
    const locs = locsStore();
    const categ = categStore();

    return { tick, locs, categ };
  },
  data() {
    return {
      note: ref(false),
      ticketID: ref(""),
    };
  },
  watch: {
    "tick.tickets"() {
      this.tick.getTicket(this.$route.params.ticketID);
    },
  },
  mounted() {
    this.categ.getCategs();
    this.ticketID = this.$route.params.ticketID;
    console.log("from vue", this.ticketDetails);
  },
  methods: {},
  computed: {
    isSubscribed() {
      return this.tick.subscribed.includes(this.tick.ticket.ticketID);
    },
    hmm() {
      return false;
    },
  },
};
</script>
