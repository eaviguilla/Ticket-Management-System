import { defineStore } from "pinia";
import { auth, db } from "boot/firebase";
import { authStore } from "./store_Auth";
import { doc, setDoc, onSnapshot, addDoc, deleteDoc } from "firebase/firestore";

const authS = authStore();

export const categStore = defineStore("categS", {
  state: () => ({
    categories: {},
  }),
  getters: {
    getCategs() {
      if (authS.userDetails.office === "BMO") {
        return this.categories.filter((c) => c.office == "BMO");
      }
      if (authS.userDetails.office === "ITRO") {
        return this.categories.filter((c) => c.office == "ITRO");
      }
    },
  },
  actions: {
    registerCateg(payload) {
      const categRef = addDoc(collection(db, "categories"), {
        name: payload.name,
        office: payload.office,
        description: payload.description,
      });
      console.log("New Categ ID: ", categRef.id);
    },
    updateCateg(payload) {
      const categRef = doc(db, "categories", payload.categID);
      updateDoc(categRef, {
        name: payload.name,
        description: payload.description,
      });
    },
    deletCateg(payload) {
      deleteDoc(doc(db, "categories", payload.categID));
    },
  },
});
