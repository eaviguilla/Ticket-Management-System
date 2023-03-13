<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-white text-white">
      <q-toolbar>
        <q-btn
          flat
          rounded
          class="float-left"
          :to="
            this.auth.userDetails.userID === this.tick.ticket.assigned
              ? '/assignment_tickets'
              : '/view_tickets'
          "
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
            <div class="row justify-between">
              <div class="col q-ma-md text-h6 text-bold text-primary">
                Ticket Details
              </div>
              <q-select
                v-if="
                  this.auth.userDetails.userID === this.tick.ticket.assigned
                "
                style="width: 50%"
                class="q-pa-sm"
                v-model="ticketDetails.criticality"
                :options="this.criticalityOptions"
                label="Criticality"
                outlined
              />
              <div v-else class="q-ma-md text-overline">
                <div
                  v-if="this.ticketDetails.criticality === 'None'"
                  class="text-caption text-grey text-bold q-pt-sm"
                >
                  {{ this.ticketDetails.criticality }}
                </div>
                <div
                  v-if="this.ticketDetails.criticality === 'Low'"
                  class="text-caption text-primary text-bold q-pt-sm"
                >
                  {{ this.ticketDetails.criticality }}
                </div>
                <div
                  v-if="this.ticketDetails.criticality === 'Medium'"
                  class="text-caption text-orange text-bold q-pt-sm"
                >
                  {{ this.ticketDetails.criticality }}
                </div>
                <div
                  v-if="this.ticketDetails.criticality === 'High'"
                  class="text-caption text-secondary text-bold q-pt-sm"
                >
                  {{ this.ticketDetails.criticality }}
                </div>
              </div>
            </div>
            <!-- assigned to -->
            <q-card class="row items-center bg-primary" bordered flat>
              <q-card-section class="col row items-center">
                <span class="col text-subtitle2 text-white text-bold"
                  >Assigned to:
                </span>
                <span class="col text-right text-caption text-white text-bold"
                  >{{ this.assignedName }}
                </span>
              </q-card-section></q-card
            >
          </div>
          <!-- edit ticket -->
          <div
            v-if="this.tick.ticket.assigned === this.auth.userDetails.userID"
            class="row q-ma-md"
          >
            <q-card
              v-ripple
              @click="editDetails = true"
              class="col justify-center bg-primary text-white q-mr-sm"
              style="width: 50%"
              clickable
              rounded
              ><div class="row items-center">
                <q-icon class="col" name="mdi-file-document-edit-outline" />

                <div class="col q-pr-lg text-overline">Details</div>
              </div>
            </q-card>
            <q-card
              v-if="this.tick.ticket.assigned === this.auth.userDetails.userID"
              v-ripple
              @click="editStatus = true"
              class="col justify-center bg-secondary text-white q-ml-sm"
              style="width: 50%"
              clickable
              rounded
              ><div class="row items-center">
                <q-icon class="col" name="mdi-progress-pencil" />

                <div class="col q-pr-lg text-overline">Status</div>
              </div>
            </q-card>
          </div>

          <!-- assign ticket -->
          <q-card
            v-if="
              this.auth.userDetails.role === 'Admin' &&
              this.auth.userDetails.office === this.ticketDetails.office
            "
            v-ripple
            class="row justify-center q-ma-md bg-primary text-white"
            clickable
            rounded
            @click="editAssign = true"
            ><div class="row items-center">
              <q-icon class="q-pr-sm" name="mdi-account-arrow-right-outline" />

              <div
                v-if="this.ticketDetails.assigned === 'None'"
                class="q-pl-sm text-overline"
              >
                Assign
              </div>
              <div v-else class="q-pl-sm text-overline">Re assign</div>
            </div>
          </q-card>

          <!-- self assign ticket -->
          <q-card
            v-if="
              this.auth.userDetails.role === 'Staff' &&
              !isSubscribed &&
              this.tick.ticket.assigned === 'None'
            "
            v-ripple
            class="row justify-center q-ma-md bg-indigo text-white"
            clickable
            rounded
            @click="selfAssign = true"
            ><div class="row items-center">
              <q-icon class="q-pr-sm" name="mdi-account-arrow-right-outline" />

              <div class="q-pl-sm text-overline">Assign to Self</div>
            </div>
          </q-card>

          <!-- asssist ticket -->
          <q-card
            v-if="
              this.auth.userDetails.role === 'Staff' &&
              !isSubscribed &&
              this.tick.ticket.assigned !== this.auth.userDetails.userID &&
              this.tick.ticket.assigned !== 'None' &&
              !isAssisting
            "
            v-ripple
            class="row justify-center q-ma-md bg-indigo text-white"
            clickable
            rounded
            @click="tick.assistTicket(tick.ticket.ticketID)"
            ><div class="row items-center">
              <q-icon
                class="q-pr-sm"
                name="mdi-account-multiple-plus-outline"
              />

              <div class="q-pl-sm text-overline">Assist</div>
            </div>
          </q-card>

          <!-- unassist ticket -->
          <q-card
            v-if="
              this.auth.userDetails.role === 'Staff' &&
              isSubscribed &&
              this.tick.ticket.assigned !== 'None' &&
              isAssisting
            "
            v-ripple
            class="row justify-center q-ma-md bg-secondary text-white"
            clickable
            rounded
            @click="tick.unassistTicket(tick.ticket.ticketID)"
            ><div class="row items-center">
              <q-icon
                class="q-pr-sm"
                name="mdi-account-multiple-minus-outline"
              />

              <div class="q-pl-sm text-overline">Unassist</div>
            </div>
          </q-card>

          <!-- subscribe ticket -->
          <q-card
            v-if="
              !isSubscribed &&
              this.tick.ticket.assigned !== this.auth.userDetails.userID
            "
            v-ripple
            class="row justify-center q-ma-md bg-primary text-white"
            clickable
            rounded
            @click="tick.subTicket(tick.ticket.ticketID)"
            ><div class="row items-center">
              <q-icon class="q-pr-sm" name="mdi-bell-ring-outline" />

              <div class="q-pl-sm text-overline">Subscribe</div>
            </div>
          </q-card>

          <!-- unsubscribe ticket -->
          <q-card
            v-if="isSubscribed"
            v-ripple
            class="row justify-center q-ma-md bg-secondary text-white"
            clickable
            rounded
            @click="tick.unsubTicket(tick.ticket.ticketID)"
            ><div class="row items-center">
              <q-icon class="q-pr-sm" name="mdi-bell-off-outline" />

              <div class="q-pl-sm text-overline">Unsubscribe</div>
            </div>
          </q-card>

          <!-- status bar -->
          <div class="q-px-md">
            <q-linear-progress
              rounded
              stripe
              size="25px"
              :value="progress"
              :color="tick.ticket.office === 'BMO' ? 'pink' : 'blue-10'"
            >
              <div class="absolute-full flex flex-center text-uppercase">
                <q-badge
                  color="white"
                  :text-color="
                    tick.ticket.office === 'BMO' ? 'pink' : 'blue-10'
                  "
                  :label="this.ticketDetails.status"
                /></div
            ></q-linear-progress>
            <div class="row">
              <div class="col text-center text-caption">
                <div class="text-bold">submitted</div>
                <div>
                  {{ formatDate(tick?.ticketStatus?.Submitted) }}
                </div>
                <div>
                  {{ formatTime(tick?.ticketStatus?.Submitted) }}
                </div>
              </div>
              <div
                v-if="tick?.ticketStatus?.Assigned"
                class="col text-center text-caption"
              >
                <div class="text-bold">assigned</div>
                <div>
                  {{ formatDate(tick?.ticketStatus?.Assigned) }}
                </div>
                <div>
                  {{ formatTime(tick?.ticketStatus?.Assigned) }}
                </div>
              </div>
              <div
                v-if="tick?.ticketStatus?.In_Progress"
                class="col text-center text-caption"
              >
                <div class="text-bold">in progress</div>
                <div>
                  {{ formatDate(tick?.ticketStatus?.In_Progress) }}
                </div>
                <div>
                  {{ formatTime(tick?.ticketStatus?.In_Progress) }}
                </div>
              </div>
              <div
                v-if="tick?.ticketStatus?.Resolved"
                class="col text-center text-caption"
              >
                <div class="text-bold">resolved</div>
                <div>
                  {{ formatDate(tick?.ticketStatus?.Resolved) }}
                </div>
                <div>
                  {{ formatTime(tick?.ticketStatus?.Resolved) }}
                </div>
              </div>
            </div>
          </div>

          <!-- office and category -->
          <div class="q-ma-md">
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
                <span class="col text-body2 text-primary text-bold"
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
                <span class="col text-body2 text-primary text-bold"
                  >Floor / Location:
                </span>
                <span class="col text-right text-caption text-bold">{{
                  this.floorName
                }}</span>
              </q-card-section>
              <q-separator vertical />

              <q-card-section class="col row items-center">
                <span class="col text-body2 text-primary text-bold"
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
              ><q-card-section class="col text-body2 text-primary text-bold">
                Description: </q-card-section
              ><q-card-section class="col text-subtitle2">{{
                this.ticketDetails.description
              }}</q-card-section>
              <q-separator />
            </q-card>
          </div>

          <!-- edit details dialog -->
          <q-dialog v-model="editDetails" persistent>
            <q-card style="min-width: 350px">
              <q-card-section>
                <div class="text-h6">Edit ticket description</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-select
                  class="q-pb-sm"
                  v-model="floor"
                  :options="this.locs.selectFloors"
                  label="Select Floor/Location"
                  option-label="floor"
                  option-value="floorID"
                  emit-value
                  map-options
                  outlined
                />
                <q-select
                  class="q-pb-sm"
                  v-model="ticketDetails.roomID"
                  :options="this.roomsOptions"
                  label="Select Specific Area/Room"
                  option-label="area_room"
                  option-value="roomID"
                  emit-value
                  map-options
                  outlined
                />
                <q-select
                  class="q-pb-sm"
                  v-model="ticketDetails.categID"
                  :options="categ.selectCategs(this.ticketDetails.office)"
                  label="Ticket Category"
                  option-label="name"
                  option-value="categID"
                  emit-value
                  map-options
                  outlined
                />
                <q-input
                  outlined
                  autogrow
                  v-model="this.ticketDetails.description"
                  label="Ticket Description"
                />
              </q-card-section>

              <q-card-actions align="right" class="text-primary">
                <q-btn flat color="secondary" label="Cancel" v-close-popup />
                <q-btn
                  flat
                  @click="tick.updateTicketDetails(this.ticketDetails)"
                  label="Save"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <!-- edit status dialog -->
          <q-dialog v-model="editStatus" persistent>
            <q-card style="min-width: 350px">
              <q-card-section>
                <div class="text-h6">Update ticket status</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-select
                  v-model="ticketDetails.status"
                  :options="this.statusOptions"
                  label="Ticket Status"
                  outlined
                />
              </q-card-section>

              <q-card-actions align="right" class="text-primary">
                <q-btn flat color="secondary" label="Cancel" v-close-popup />
                <q-btn
                  flat
                  @click="
                    tick.updateStatus(
                      this.ticketDetails.ticketID,
                      this.ticketDetails.status
                    )
                  "
                  label="Save"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <!-- edit assigned dialog -->
          <q-dialog v-model="editAssign" persistent>
            <q-card style="min-width: 350px">
              <q-card-section>
                <div class="text-h6">Assign ticket to a Staff</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-select
                  v-model="ticketDetails.assigned"
                  :options="users.getStaff"
                  option-value="userID"
                  option-label="lName"
                  map-options
                  emit-value
                  label="Assigned"
                  outlined
                />
              </q-card-section>
              <q-card-section v-if="this.tick.ticket.assigned !== 'None'"
                >This ticket is already assigned to a Staff. If you want to
                re-assign the ticket to another Staff, choose a Staff to assign
                this ticket to.</q-card-section
              ><q-card-section v-else
                >This ticket is not assigned to any staff. Choose a staff to
                assign this ticket to.</q-card-section
              >

              <q-card-actions align="right" class="text-primary">
                <q-btn flat color="secondary" label="Cancel" v-close-popup />
                <q-btn
                  flat
                  @click="
                    tick.manualAssignTicket(
                      this.ticketDetails.ticketID,
                      this.ticketDetails.assigned
                    )
                  "
                  label="Save"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <!-- self assign dialog -->
          <q-dialog v-model="selfAssign" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <span class="q-ml-sm"
                  >Are you sure you want to assign ticket to yourself? <br />
                  You cannot remove this and will need the Admin to change the
                  staff assigned.</span
                >
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="Cancel" color="secondary" v-close-popup />
                <q-btn
                  flat
                  label="Assign"
                  color="primary"
                  @click="tick.selfAssignTicket(tick.ticket.ticketID)"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <!-- notes dialog -->
          <q-dialog
            v-model="note"
            persistent
            maximized
            transition-show="slide-up"
            transition-hide="slide-down"
          >
            <q-card class="bg-grey-2">
              <q-card-section class="q-pa-none">
                <view_notes
                  :ticketID="this.tick.ticket.ticketID"
                  @close="closeNotes"
                />
              </q-card-section>
            </q-card>
          </q-dialog>

          <!-- notes button -->
          <q-page-sticky
            position="bottom-right"
            :offset="[25, 25]"
            v-if="
              isSubscribed ||
              this.tick.ticket.assigned === this.auth.userDetails.userID ||
              isAssisting
            "
          >
            <q-btn
              @click="note = true"
              class="q-pa-md"
              color="primary"
              icon="mdi-forum-outline"
              label="Notes"
              rounded
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
import view_notes from "src/components/view_notes.vue";

export default {
  components: { view_notes },
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
      selfAssign: ref(false),
      progress: ref(0),
      note: ref(false),
      ticketDetails: {
        ticketID: ref(""),
        assigned: ref(null),
        categID: ref(""),
        office: ref(""),
        roomID: ref(""),
        description: ref(""),
        status: ref(""),
        criticality: ref(""),
      },
      offices: ["BMO", "ITRO"],
      floor: ref(""),
      roomsOptions: ref(null),
      assignedName: ref(""),
      categName: ref(""),
      floorName: ref(""),
      roomName: ref(""),
      editDetails: ref(false),
      editStatus: ref(false),
      statusOptions: ref(["In Progress", "Resolved"]),
      criticalityOptions: ref(["Low", "Medium", "High"]),
      editAssign: ref(false),
    };
  },

  watch: {
    "locs.rooms"() {
      this.tick.getTicket(this.$route.params.ticketID);
    },
    "tick.tickets"() {
      if (Object.keys(this.tick.ticket).length !== 0) {
        this.tick.getTicket(this.$route.params.ticketID);
      }
      this.assignTicketDetails();
    },
    "tick.ticket.assigned"() {
      this.assignTicketDetails();
    },
    "tick.status"() {
      this.tick.getTicketStatus(this.tick.ticket.ticketID);
    },
    floor() {
      this.room = "";
      this.roomsOptions = this.locs.selectRooms(this.floor);
    },
    "ticketDetails.criticality"(newCrit, oldCrit) {
      if (oldCrit !== "") {
        this.tick.updateCriticality(
          this.ticketDetails.ticketID,
          this.ticketDetails.criticality
        );
      }
    },
  },

  mounted() {
    this.assignTicketDetails();
    this.tick.getTicketStatus(this.$route.params.ticketID);
    console.log("from vue", this.ticketDetails);
  },
  methods: {
    assignTicketDetails() {
      this.ticketDetails.ticketID = this.tick.ticket.ticketID;
      this.ticketDetails.assigned = this.tick.ticket.assigned;
      this.ticketDetails.categID = this.tick.ticket.categID;
      this.ticketDetails.office = this.tick.ticket.office;
      this.ticketDetails.roomID = this.tick.ticket.roomID;
      this.ticketDetails.description = this.tick.ticket.description;
      this.ticketDetails.status = this.tick.ticket.status;
      this.ticketDetails.criticality = this.tick.ticket.criticality;
      this.assignedName = this.users.getStaffName(this.tick.ticket.assigned);
      this.categName = this.categ.displayCateg(this.tick.ticket.categID);
      this.floorName = this.locs.floor.floor;
      this.floor = this.locs.room.floorID;
      this.roomName = this.locs.room.area_room;
      if (this.ticketDetails.status === "Submitted") {
        this.progress = 0;
      } else if (this.ticketDetails.status === "Assigned") {
        this.progress = 0.33;
      } else if (this.ticketDetails.status === "In Progress") {
        this.progress = 0.66;
      } else {
        this.progress = 1;
      }
    },
    formatDate(ts) {
      const date = new Date(ts);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString();

      return `${day}/${month}/${year}`;
    },
    formatTime(ts) {
      const date = new Date(ts);
      const timeOptions = {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };
      const timeString = date.toLocaleTimeString("en-US", timeOptions);

      return `${timeString}`;
    },
    closeNotes() {
      this.note = false;
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
    isAssisting() {
      if (this.tick.assist != undefined) {
        return false;
      } else {
        return this.tick.assist.includes(this.tick.ticket.ticketID);
      }
    },
  },
};
</script>
