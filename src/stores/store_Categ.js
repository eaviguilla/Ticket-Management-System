import { defineStore } from "pinia";
import { db } from "boot/firebase";
import { authStore } from "./store_Auth";
import {
  doc,
  addDoc,
  deleteDoc,
  getDocs,
  collection,
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
      const categRef = addDoc(categsRef, {
        name: payload.name,
        office: payload.office,
        description: payload.description,
      });
      const categDetails = payload;
      console.log("this is the new id", categRef);

      categDetails.categID = categRef.id;
      this.categories.push(categDetails);
    },
    getCategs() {
      this.categories = [];
      const querySnapshot = getDocs(categsRef).then((querySnapshot) => {
        querySnapshot.forEach((response) => {
          const categDetails = response.data();
          categDetails.categID = response.id;
          this.categories.push(categDetails);
          console.log(categDetails);
        });
      });
    },
    updateCateg(payload) {
      const categRef = doc(db, "categories", payload.categID);
      updateDoc(categRef, {
        name: payload.name,
        description: payload.description,
      });
      for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i].categID === payload.categID) {
          this.categories[i].name = payload.name;
          this.categories[i].description = payload.description;
          break;
        }
      }
    },
    deleteCateg(categID) {
      deleteDoc(doc(categsRef, categID));
      const index = this.categories.findIndex(
        (categ) => categ.categID === categID
      );
      if (index !== -1) {
        this.categories.splice(index, 1);
      }
    },
  },
});
