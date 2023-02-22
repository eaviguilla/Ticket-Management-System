<template>
  <q-layout view="hHh lpR fFf">
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
    <q-page-container>
      <div class="column content-center">
        <div style="max-width: 1024px; width: 100%">
          <!-- back button -->

          <div class="q-ma-md">
            <h5 class="text-weight-bolder text-primary">Ticket Details</h5>
            <!-- ticket id -->
            <q-card class="row items-center bg-primary">
              <q-card-section class="col row items-center">
                <span class="col text-subtitle2 text-white text-bold"
                  >ID:
                </span>
                <span class="col text-subtitle2 text-white text-weight-regular"
                  >2019-100306
                </span>
              </q-card-section></q-card
            >
          </div>
          <!-- edit ticket -->
          <q-card
            rounded
            clickable
            v-ripple
            style="background: #ff6b6e; color: white"
            class="row justify-center q-ma-md"
            ><div class="row items-center">
              <q-icon class="col q-pr-sm" name="mdi-pencil"></q-icon>

              <div class="col q-pl-sm text-overline">Edit</div>
            </div>
          </q-card>
          <!-- office and category -->
          <div class="q-ma-md">
            <q-card class="row items-center"
              ><q-card-section class="col row items-center">
                <span class="col text-subtitle1 text-primary text-bold"
                  >Office:
                </span>
                <span class="col text-subtitle2 text-weight-regular">BMO</span>
              </q-card-section>
              <q-separator vertical />

              <q-card-section class="col row items-center">
                <span class="col text-subtitle1 text-primary text-bold"
                  >Category:
                </span>
                <span class="col text-subtitle2 text-weight-regular"
                  >Plumbing</span
                >
              </q-card-section>
            </q-card>
          </div>
          <!-- floor and specific area/floor -->
          <div class="q-ma-md">
            <q-card class="row items-center"
              ><q-card-section class="col row items-center">
                <span class="col text-subtitle1 text-primary text-bold"
                  >Floor:
                </span>
                <span class="col text-subtitle2 text-weight-regular"
                  >3rd Floor</span
                >
              </q-card-section>
              <q-separator vertical />

              <q-card-section class="col row items-center">
                <span class="col text-subtitle1 text-primary text-bold"
                  >Specific Area:
                </span>
                <span class="col text-subtitle2 text-weight-regular">309</span>
              </q-card-section>
            </q-card>
          </div>
          <!-- ticket description and status -->
          <div class="q-ma-md">
            <q-card
              ><q-card-section
                class="col text-subtitle1 text-primary text-bold"
              >
                Description: </q-card-section
              ><q-card-section class="col text-subtitle2 text-weight-regular"
                >N/A</q-card-section
              >
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
          <q-page-sticky position="bottom-right" :offset="[18, 90]">
            <q-btn
              rounded
              color="accent"
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
import { ref, computed } from "vue";

export default {
  name: "SelectedTicket",

  data() {
    return {
      note: ref(false),
    };
  },
};
</script>
