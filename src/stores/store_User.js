import { defineStore } from "pinia";
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

export const userStore = defineStore("userS", {
  state: () => ({
    users: [],
  }),
  getters: {
    apcComm() {
      return this.users.filter((u) => !u.office);
    },
    bmoStaff() {
      return this.users.filter(
        (u) => (u.office == "BMO") & (u.role == "Staff")
      );
    },
    bmoAdmin() {
      return this.users.filter(
        (u) => (u.office == "BMO") & (u.role == "Admin")
      );
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
    userRole(payload) {
      const userRef = doc(db, "users", payload.userID);
      updateDoc(userRef, {
        office: payload.office,
        role: payload.role,
      });
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].userID === payload.userID) {
          this.users[i].office = payload.office;
          this.users[i].role = payload.role;
          break;
        }
      }
    },
    deleteRole(payload) {
      const userRef = doc(db, "users", payload.userID);
      updateDoc(userRef, {
        office: deleteField(),
        role: deleteField(),
      });
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].userID === payload.userID) {
          delete this.users[i].office;
          delete this.users[i].role;
          break;
        }
      }
    },
  },
});
