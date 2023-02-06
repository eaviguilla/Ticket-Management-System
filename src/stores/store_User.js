import { defineStore } from "pinia";
import { auth, db } from "boot/firebase";
import {
  doc,
  updateDoc,
  onSnapshot,
  getDocs,
  collection,
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
    },
    deleteRole(payload) {
      var userRef = db.collection("users").doc(payload.userID);
      var removeRole = userRef.update({
        office: FirebaseError.firestore.FieldValue.delete(),
        role: FirebaseError.firestore.FieldValue.delete(),
      });
    },
  },
});
