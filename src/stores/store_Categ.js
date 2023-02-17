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

const authS = authStore();
const categsRef = collection(db, "categories");

export const categStore = defineStore("categS", {
  state: () => ({
    categories: [],
  }),
  getters: {
    filterCategs() {
      if (authS.userDetails.office === "BMO") {
        return this.categories.filter((c) => c.office == "BMO");
      }
      if (authS.userDetails.office === "ITRO") {
        return this.categories.filter((c) => c.office == "ITRO");
      }
    },
  },
  actions: {
    addCateg(payload) {
      addDoc(categsRef, {
        name: payload.name,
        office: payload.office,
        description: payload.description,
      }).then((docRef) => {
        // updating state
        const categDetails = payload;
        categDetails.categID = docRef.id;
        this.categories.push(categDetails);
      });
    },
    getCategs() {
      this.categories = [];
      const querySnapshot = getDocs(categsRef).then((querySnapshot) => {
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
      });
      // updating state
      const index = this.categories.findIndex(
        (categ) => categ.categID === payload.categID
      );
      this.categories[index].name = payload.name;
      this.categories[index].description = payload.description;
    },
    deleteCateg(categID) {
      deleteDoc(doc(categsRef, categID));
      // updating state
      const index = this.categories.findIndex(
        (categ) => categ.categID === categID
      );
      if (index !== -1) {
        this.categories.splice(index, 1);
      }
    },
    displayCateg(id) {
      const categ = this.categories.find((categ) => categ.categID === id);
      if (categ) {
        return categ.name;
      } else {
        return "None";
      }
    },
  },
});
