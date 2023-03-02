import { defineStore } from "pinia";
import { authStore } from "src/stores/store_Auth";
import { db } from "boot/firebase";
import {
  doc,
  updateDoc,
  collection,
  deleteField,
  onSnapshot,
  arrayRemove,
  arrayUnion,
  setDoc,
  query,
} from "firebase/firestore";

const usersRef = collection(db, "users");

export const userStore = defineStore("userS", {
  state: () => ({
    users: [],
    specs: [],
    staff: [],
  }),
  getters: {
    getComm() {
      return this.users.filter((u) => !u.office);
    },
    getStaff() {
      if (authStore().userDetails.office === "BMO") {
        return this.users.filter(
          (u) => (u.office == "BMO") & (u.role == "Staff")
        );
      }
      if (authStore().userDetails.office === "ITRO") {
        return this.users.filter(
          (u) => (u.office == "ITRO") & (u.role == "Staff")
        );
      }
    },
    getAdmin() {
      if (authStore().userDetails.office === "BMO") {
        return this.users.filter(
          (u) => (u.office == "BMO") & (u.role == "Admin")
        );
      }
      if (authStore().userDetails.office === "ITRO") {
        return this.users.filter(
          (u) => (u.office == "ITRO") & (u.role == "Admin")
        );
      }
    },
  },
  actions: {
    getUsers() {
      onSnapshot(usersRef, (snapshot) => {
        this.users = [];
        snapshot.forEach((response) => {
          const userDetails = response.data();
          const responseID = response.id;
          userDetails.userID = responseID;
          this.users.push(userDetails);
        });
      });
    },
    editRole(payload, adminOffice) {
      const userRef = doc(usersRef, payload.userID);
      updateDoc(userRef, {
        office: adminOffice,
        role: payload.role,
      });
      if (payload.role === "Staff") {
        updateDoc(userRef, {
          available: false,
        });
        setDoc(doc(db, "specializations", payload.userID), {
          specializations: [],
        });
      }
    },
    deleteRole(payload) {
      const userRef = doc(usersRef, payload.userID);
      updateDoc(userRef, {
        office: deleteField(),
        role: deleteField(),
        available: deleteField(),
      });
      updateDoc(doc(db, "specializations", payload.userID), {
        specializations: deleteField(),
      });
    },

    deleteSpec(uID, sID) {
      updateDoc(doc(db, "specializations", uID), {
        specializations: arrayRemove(sID),
      });
    },
    addSpec(uID, sID) {
      updateDoc(doc(db, "specializations", uID), {
        specializations: arrayUnion(sID),
      });
    },
    getSpecs() {
      onSnapshot(collection(db, "specializations"), (querySnapshot) => {
        this.specs = [];
        querySnapshot.forEach((response) => {
          const docSpecs = response.data();
          docSpecs.userID = response.id;
          this.specs.push(docSpecs);
        });
      });
    },
    getUserSpec(id) {
      const userSpec = this.specs.find((spec) => spec.userID === id);
      return userSpec ? userSpec.specializations : null;
    },
    available() {
      const userRef = doc(usersRef, authStore().userDetails.userID);
      updateDoc(userRef, {
        available: authStore().userDetails.available,
      });
    },
    getAvailableStaff() {
      this.staff = this.users.filter(
        (user) => user.role === "Staff" && user.available
      );
      return this.staff;
    },
  },
});
