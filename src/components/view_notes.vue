<template>
  <q-layout class="bg-grey-3" view="lHh lpr lFf" style="width: 100%">
    <q-header bordered class="bg-white text-white">
      <q-toolbar>
        <q-btn flat rounded class="float-left" @click="closeNotes"
          ><q-icon color="primary" name="mdi-arrow-left"></q-icon
        ></q-btn>
        <q-icon size="lg" name="img:src/assets/rams.png"></q-icon>
        <q-toolbar-title class="text-primary text-weight-bold"
          >RAMaintenance</q-toolbar-title
        >
      </q-toolbar>
    </q-header>
    <div class="text-black q-my-xl q-py-md column flex">
      <div class="q-pa-md column col justify-end">
        <!-- chat messages -->
        <q-chat-message
          v-for="note in this.notes.sortNotes"
          :bg-color="
            note.userID != this.auth.userDetails.userID ? 'red-4' : 'primary'
          "
          text-color="white"
          :key="note.timestamp"
          :stamp="relativeDate(note.timestamp)"
          :text="[note.note]"
          :sent="note.userID == this.auth.userDetails.userID ? true : false"
          :name="users.getName(note.userID)"
        />
      </div>
      <!--imput message section-->
      <q-footer style="width: 100%">
        <q-toolbar>
          <q-form class="full-width">
            <q-input
              bg-color="white"
              outlined
              rounded
              v-model="this.note"
              label="Input note here"
              dense
            >
              <template v-slot:after>
                <q-btn
                  round
                  dense
                  flat
                  @click="send"
                  type="submit"
                  color="white"
                  icon="mdi-send-outline"
                />
              </template>
            </q-input>
          </q-form>
        </q-toolbar>
      </q-footer>
    </div>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { formatDistance } from "date-fns";
import { authStore } from "src/stores/store_Auth";
import { userStore } from "src/stores/store_User";
import { noteStore } from "src/stores/store_Notes";
import { tickStore } from "src/stores/store_Ticket";

export default {
  setup() {
    const auth = authStore();
    const users = userStore();
    const notes = noteStore();
    const tick = tickStore();

    return { auth, users, notes, tick };
  },
  data() {
    return {
      note: ref(""),
    };
  },
  watch: {},

  methods: {
    send() {
      if (this.note !== "") {
        this.notes.sendNote(this.$route.params.ticketID, this.note);
        this.note = "";
      }
    },
    relativeDate(value) {
      const date = Number(value);
      return formatDistance(date, new Date());
    },
    closeNotes() {
      this.$emit("close");
    },
  },
  mounted() {
    this.notes.getNotes(this.$route.params.ticketID);
  },
  unmounted() {
    this.notes.unsubNotes;
  },
};
</script>
