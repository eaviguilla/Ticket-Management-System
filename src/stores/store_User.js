import { defineStore } from "pinia";
import { authStore } from "src/stores/store_Auth";
import { db } from "boot/firebase";
import {
  doc,
  updateDoc,
  getDocs,
  collection,
  deleteField,
  onSnapshot,
  query,
} from "firebase/firestore";

const authS = authStore();
const usersRef = collection(db, "users");

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
      // const querySnapshot = getDocs(collection(db, "users")).then(
      //   (querySnapshot) => {
      //     querySnapshot.forEach((response) => {
      //       // console.log(response.id, " => ", response.data());
      //       const userDetails = response.data();
      //       userDetails.userID = response.id;
      //       this.users.push(userDetails);
      //       console.log(userDetails);
      //     });
      //   }
      // );

      // onSnapshot(usersRef, (querySnapshot) => {
      //   this.users = [];
      //   querySnapshot.forEach((response) => {
      //     const userDetails = response.data();
      //     userDetails.userID = response.id;
      //     this.users.push(userDetails);
      //     console.log("from auto update", userDetails);
      //   });
      // });
      const querySnapshot = onSnapshot(usersRef, (snapshot) => {
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
      // for (let i = 0; i < this.users.length; i++) {
      //   if (this.users[i].userID === payload.userID) {
      //     this.users[i].office = adminOffice;
      //     this.users[i].admin = payload.admin;
      //     break;
      //   }
      // }
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
      // for (let i = 0; i < this.users.length; i++) {
      //   if (this.users[i].userID === payload.userID) {
      //     delete this.users[i].office;
      //     delete this.users[i].admin;
      //     break;
      //   }
      // }
      const index = this.users.findIndex(
        (user) => user.userID === payload.userID
      );
      delete this.users[index].office;
      delete this.users[index].admin;
      console.log("Modified User: ", this.users[index]);
    },
  },
});
