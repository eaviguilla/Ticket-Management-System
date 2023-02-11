import { defineStore } from "pinia";
import { authStore } from "src/stores/store_Auth";
import { db } from "boot/firebase";
import {
  doc,
  updateDoc,
  collection,
  deleteField,
  onSnapshot,
} from "firebase/firestore";

const authS = authStore();
const usersRef = collection(db, "users");

export const userStore = defineStore("userS", {
  state: () => ({
    users: [],
    unsub: null,
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
      this.unsub = onSnapshot(usersRef, (snapshot) => {
        console.log("Has been called");
        snapshot.docChanges().forEach((response) => {
          const userDetails = response.doc.data();
          const responseID = response.doc.id;
          userDetails.userID = responseID;
          if (response.type === "added") {
            const index = this.users.findIndex(
              (user) => user.userID === response.doc.id
            );
            if (index === -1) {
              this.users.push(userDetails);
              console.log("Retrieved User: ", userDetails);
            }
          }
        });
      });
    },
    userRole(payload, adminOffice) {
      const userRef = doc(usersRef, payload.userID);
      updateDoc(userRef, {
        office: adminOffice,
        admin: payload.admin,
      });

      const index = this.users.findIndex(
        (user) => user.userID === payload.userID
      );
      this.users[index].office = adminOffice;
      this.users[index].admin = payload.admin;
      console.log("Modified User: ", this.users[index]);
    },
    deleteRole(payload) {
      const userRef = doc(usersRef, payload.userID);
      updateDoc(userRef, {
        office: deleteField(),
        admin: deleteField(),
      });
      const index = this.users.findIndex(
        (user) => user.userID === payload.userID
      );

      delete this.users[index].office;
      delete this.users[index].admin;
      console.log("Modified User: ", this.users[index]);
    },
  },
});
