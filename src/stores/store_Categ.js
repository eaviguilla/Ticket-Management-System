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
    registerCateg(payload) {
      const categRef = addDoc(collection(db, "categories"), {
        name: payload.name,
        office: payload.office,
        description: payload.description,
      });
      console.log("New Categ ID: ", categRef.id);
    },
    getCategs() {
      this.categories = [];
      const querySnapshot = getDocs(collection(db, "categories")).then(
        (querySnapshot) => {
          querySnapshot.forEach((response) => {
            const categDetails = response.data();
            categDetails.categID = response.id;
            this.categories.push(categDetails);
            console.log(categDetails);
          });
        }
      );
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
    deletCateg(categID) {
      deleteDoc(doc(db, "categories", categID));
    },
  },
});
