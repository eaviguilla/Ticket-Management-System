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
  deleteDoc,
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
    getAvailableStaff() {
      this.staff = this.users.filter(
        (user) => user.role === "Staff" && user.available
      );
      return this.staff;
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
      const user = this.users.find((u) => u.userID === payload.userID);
      if (user.role !== payload.role) {
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
          setDoc(doc(db, "reports", payload.userID), {
            assigned: [],
            assist: [],
            finished: [],
          });
        } else if (user.role === "Staff") {
          deleteDoc(doc(db, "specializations", payload.userID));
          deleteDoc(doc(db, "reports", payload.userID));
        }
      } else {
        return;
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
    getStaffName(id) {
      if (id == "None" || id == "" || id == undefined) {
        return "None";
      } else {
        const staff = this.users.find((u) => u.userID === id);
        return staff.fName;
      }
    },
  },
});
