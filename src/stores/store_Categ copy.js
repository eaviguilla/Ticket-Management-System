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
} from "firebase/firestore";

export const specStore = defineStore("specS", {
  state: () => ({
    specializations: [],
  }),
  getters: {},
  actions: {},
});
