import { defineStore } from "pinia";
import { authStore } from "src/stores/store_Auth";
import { auth, db } from "boot/firebase";
import {
  doc,
  updateDoc,
  onSnapshot,
  getDocs,
  collection,
  deleteField,
} from "firebase/firestore";
import { TouchSwipe } from "quasar";
import { FirebaseError } from "firebase/app";

const authS = authStore();

export const userStore = defineStore("userS", {
  state: () => ({
    users: [],
  }),
  getters: {
    getComm() {
      return this.users.filter((u) => !u.office);
    },
    getStaff() {
      if (authS.userDetails.office === "BMO") {
        return this.users.filter(
          (u) => (u.office == "BMO") & (u.admin == false)
        );
      }
      if (authS.userDetails.office === "ITRO") {
        return this.users.filter(
          (u) => (u.office == "ITRO") & (u.admin == false)
        );
      }
    },
    getAdmin() {
      if (authS.userDetails.office === "BMO") {
        return this.users.filter(
          (u) => (u.office == "BMO") & (u.admin == true)
        );
      }
      if (authS.userDetails.office === "ITRO") {
        return this.users.filter(
          (u) => (u.office == "ITRO") & (u.admin == true)
        );
      }
    },
  },
  actions: {
    getUsers() {
      this.users = [];
      const querySnapshot = getDocs(collection(db, "users")).then(
        (querySnapshot) => {
          querySnapshot.forEach((response) => {
            // console.log(response.id, " => ", response.data());
            const userDetails = response.data();
            userDetails.userID = response.id;
            this.users.push(userDetails);
            console.log(userDetails);
          });
        }
      );
    },
    userRole(payload, adminOffice) {
      const userRef = doc(db, "users", payload.userID);
      updateDoc(userRef, {
        office: adminOffice,
        admin: payload.admin,
      });
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].userID === payload.userID) {
          this.users[i].office = adminOffice;
          this.users[i].admin = payload.admin;
          break;
        }
      }
    },
    deleteRole(payload) {
      const userRef = doc(db, "users", payload.userID);
      updateDoc(userRef, {
        office: deleteField(),
        admin: deleteField(),
      });
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].userID === payload.userID) {
          delete this.users[i].office;
          delete this.users[i].admin;
          break;
        }
      }
    },
  },
});
