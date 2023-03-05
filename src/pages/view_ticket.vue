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
                  >Assigned to:
                </span>
                <span class="col text-right text-caption text-white text-bold"
                  >{{ this.ticketDetails.assigned }}
                </span>
              </q-card-section></q-card
            >
          </div>
          <!-- edit ticket -->
          <q-card
            v-if="this.tick.ticket.assigned === this.auth.userDetails.userID"
            v-ripple
            class="row justify-center q-ma-md bg-primary text-white"
            clickable
            rounded
            @click="tick.subTicket(tick.ticket.ticketID)"
            ><div class="row items-center">
              <q-icon class="col" name="mdi-file-document-edit-outline" />

              <div class="col q-pr-lg text-overline">Edit</div>
            </div>
          </q-card>

          <!-- subscribe ticket -->
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

          <!-- unsubscribe ticket -->
          <q-card
            v-if="
              isSubscribed &&
              this.tick.ticket.assigned !== this.auth.userDetails.userID
            "
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
          <div class="q-ma-sm">
            <q-card bordered flat class="row items-center"
              ><q-card-section class="col row items-center">
                <span class="col text-body2 text-primary text-bold"
                  >Office:
                </span>
                <span class="col text-right text-caption text-bold">{{
                  this.ticketDetails.office
                }}</span>
              </q-card-section>
              <q-separator vertical />

              <q-card-section class="col row items-center">
                <span class="col text-subtitle1 text-primary text-bold"
                  >Category:
                </span>
                <span class="col text-right text-caption text-bold">{{
                  this.categName
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
                  this.floorName
                }}</span>
              </q-card-section>
              <q-separator vertical />

              <q-card-section class="col row items-center">
                <span class="col text-subtitle1 text-primary text-bold"
                  >Specific Area / Room:
                </span>
                <span class="col text-right text-caption text-bold">{{
                  this.roomName
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
                this.ticketDetails.description
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
import { userStore } from "src/stores/store_User";
import { authStore } from "src/stores/store_Auth";

export default {
  setup() {
    const tick = tickStore();
    const locs = locsStore();
    const categ = categStore();
    const users = userStore();
    const auth = authStore();

    return { tick, locs, categ, users, auth };
  },

  data() {
    return {
      note: ref(false),
      ticketID: ref(""),
      ticketDetails: {
        assigned: ref(null),
        categID: ref(""),
        office: ref(""),
        roomID: ref(""),
        description: ref(""),
      },
      categName: ref(""),
      floorName: ref(""),
      roomName: ref(""),
    };
  },

  watch: {
    "locs.rooms"() {
      this.tick.getTicket(this.$route.params.ticketID);
    },
    "tick.ticket"() {
      this.assignTicketDetails();
    },
  },

  mounted() {
    // this.tick.getTicket(this.$route.params.ticketID);
    this.assignTicketDetails();
    console.log("from vue", this.ticketDetails);
  },
  methods: {
    assignTicketDetails() {
      this.ticketDetails.assigned = this.tick.ticket.assigned;
      this.ticketDetails.categID = this.tick.ticket.categID;
      this.ticketDetails.office = this.tick.ticket.office;
      this.ticketDetails.roomID = this.tick.ticket.roomID;
      this.ticketDetails.description = this.tick.ticket.description;
      this.categName = this.categ.displayCateg(this.tick.ticket.categID);
      this.floorName = this.locs.floor.floor;
      this.roomName = this.locs.room.area_room;
    },
  },
  computed: {
    isSubscribed() {
      if (this.tick.subscribe != undefined) {
        return false;
      } else {
        return this.tick.subscribed.includes(this.tick.ticket.ticketID);
      }
    },
  },
};
</script>
