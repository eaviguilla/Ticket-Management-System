import { defineStore } from "pinia";
import { db } from "boot/firebase";
import { authStore } from "./store_Auth";
import {
  doc,
  addDoc,
  deleteDoc,
  getDocs,
  collection,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { userStore } from "./store_User";

const notesRef = collection(db, "notes");

export const noteStore = defineStore("noteS", {
  state: () => ({
    notes: [],
  }),
  getters: {},
  actions: {
    // getting all notes
    getNotes() {},

    // sending a note
    sendNote(payload) {},
  },
});
