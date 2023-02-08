import { defineStore } from "pinia";
import { auth, db } from "boot/firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";

export const authStore = defineStore("categS", {
  state: () => ({
    categories: {},
  }),
  getters: {},
  actions: {},
});
