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

const categsRef = collection(db, "categories");

export const categStore = defineStore("categS", {
  state: () => ({
    categories: [],
  }),
  getters: {
    filterCategs() {
      if (authStore().userDetails.office === "BMO") {
        const filteredCategs = this.categories.filter((c) => c.office == "BMO");
        return filteredCategs.sort((a, b) => {
          // First compare the enabled property
          if (a.enabled && !b.enabled) {
            return -1;
          } else if (!a.enabled && b.enabled) {
            return 1;
          }

          return a.name.localeCompare(b.name, undefined, { numeric: true });
        });
      }
      if (authStore().userDetails.office === "ITRO") {
        const filteredCategs = this.categories.filter(
          (c) => c.office == "ITRO"
        );
        return filteredCategs.sort((a, b) => {
          // First compare the enabled property
          if (a.enabled && !b.enabled) {
            return -1;
          } else if (!a.enabled && b.enabled) {
            return 1;
          }

          return a.name.localeCompare(b.name, undefined, { numeric: true });
        });
      }
    },
  },
  actions: {
    addCateg(payload) {
      addDoc(categsRef, {
        name: payload.name,
        office: payload.office,
        description: payload.description,
        enabled: payload.enabled,
      });
    },
    getCategs() {
      onSnapshot(categsRef, (querySnapshot) => {
        this.categories = [];
        querySnapshot.forEach((response) => {
          const categDetails = response.data();
          categDetails.categID = response.id;
          this.categories.push(categDetails);
        });
      });
    },
    updateCateg(payload) {
      const categRef = doc(categsRef, payload.categID);
      updateDoc(categRef, {
        name: payload.name,
        description: payload.description,
        enabled: payload.enabled,
      });
    },
    deleteCateg(id) {
      deleteDoc(doc(categsRef, id));
    },
    displayCateg(id) {
      const categ = this.categories.find((categ) => categ.categID === id);
      if (categ) {
        return categ.name;
      } else {
        return "None";
      }
    },
    selectCategs(office) {
      const filteredCategs = this.categories.filter(
        (c) => c.enabled === true && c.office == office
      );
      return filteredCategs.sort((a, b) => {
        return a.name.localeCompare(b.name, undefined, { numeric: true });
      });
    },
  },
});
