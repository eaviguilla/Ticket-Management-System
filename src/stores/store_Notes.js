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

const notesRef = collection(db, "notes");

export const noteStore = defineStore("noteS", {
  state: () => ({
    notes: [],
  }),
  getters: {},
  actions: {
    sendNote(payload) {},
  },
});
