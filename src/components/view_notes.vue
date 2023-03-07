<template>
  <q-layout class="bg-grey-3" view="lHh lpr lFf" style="width: 100%">
    <div class="flex column text-black">
      <q-banner class="bg-primary text-center text-white"
        ><span class="text-body1">Leave a public note</span></q-banner
      >
      <div class="q-pa-md column col justify-end">
        <!--chat
            replace :name with ( :name="note.from == me ? userDetails.name : otherUserDetails.name" )
            samples-->
        <q-chat-message
          v-for="note in notes"
          :bg-color="note.sender != userDetails.userID ? 'red-4' : 'primary'"
          text-color="white"
          :key="note.note"
          :name="users[note.sender].name + '  ' + users[note.sender].office"
          :stamp="relativeDate(note.timestamp)"
          :text="[note.note]"
          :sent="note.sender == userDetails.userID ? true : false"
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
              v-model="this.noteData.note"
              dense
            >
              <template v-slot:after>
                <q-btn
                  round
                  dense
                  flat
                  type="submit"
                  color="white"
                  icon="send"
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
import { authStore } from "src/stores/store_Auth";
import { userStore } from "src/stores/store_User";

export default {
  setup() {
    const auth = authStore();
    const users = userStore();

    return { auth, users };
  },
  data() {
    return {
      noteData: {
        note: ref(""),
        timestamp: ref(""),
        sender: ref(""),
        nticketID: ref(""),
      },
    };
  },
};
</script>
