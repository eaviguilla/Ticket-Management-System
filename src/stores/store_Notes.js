import { defineStore } from "pinia";
import { db } from "boot/firebase";
import {
  doc,
  addDoc,
  deleteDoc,
  getDocs,
  collection,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { tickStore } from "./store_Ticket";
import { authStore } from "./store_Auth";
import { userStore } from "./store_User";

const notesRef = collection(db, "notes");

export const noteStore = defineStore("noteS", {
  state: () => ({
    notes: [],
    unsubNotes: null,
  }),
  getters: {
    sortNotes() {
      const sorted = this.notes.sort((a, b) => a.timestamp - b.timestamp);
      return sorted;
    },
  },
  actions: {
    // getting all notes
    getNotes(tID) {
      this.unsubNotes = onSnapshot(doc(db, "notes", tID), (querySnapshot) => {
        const gotNotes = querySnapshot.data();
        this.notes = Object.keys(gotNotes).map((key) => {
          return {
            timestamp: key,
            note: gotNotes[key].note,
            userID: gotNotes[key].userID,
          };
        });
      });
    },

    // sending a note
    sendNote(tID, note) {
      const nID = Date.now();
      updateDoc(doc(db, "notes", tID), {
        [nID]: {
          note: note,
          userID: authStore().userDetails.userID,
        },
      });
    },
  },
});
