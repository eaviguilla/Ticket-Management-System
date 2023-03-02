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

const authS = authStore();
const usersRef = collection(db, "users");

export const userStore = defineStore("userS", {
  state: () => ({
    users: [],
    specs: [],
    staff: [],
    unsubUsers: null,
    unsubSpecs: null,
  }),
  getters: {
    getComm() {
      return this.users.filter((u) => !u.office);
    },
    getStaff() {
      if (authS.userDetails.office === "BMO") {
        return this.users.filter(
          (u) => (u.office == "BMO") & (u.role == "Staff")
        );
      }
      if (authS.userDetails.office === "ITRO") {
        return this.users.filter(
          (u) => (u.office == "ITRO") & (u.role == "Staff")
        );
      }
    },
    getAdmin() {
      if (authS.userDetails.office === "BMO") {
        return this.users.filter(
          (u) => (u.office == "BMO") & (u.role == "Admin")
        );
      }
      if (authS.userDetails.office === "ITRO") {
        return this.users.filter(
          (u) => (u.office == "ITRO") & (u.role == "Admin")
        );
      }
    },
  },
  actions: {
    getUsers() {
      this.unsubUsers = onSnapshot(usersRef, (snapshot) => {
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
          online: false,
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
        online: deleteField(),
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
      this.unsubSpecs = onSnapshot(
        collection(db, "specializations"),
        (querySnapshot) => {
          this.specs = [];
          querySnapshot.forEach((response) => {
            const docSpecs = response.data();
            docSpecs.userID = response.id;
            this.specs.push(docSpecs);
          });
        }
      );
    },
    getUserSpec(id) {
      const userSpec = this.specs.find((spec) => spec.userID === id);
      return userSpec ? userSpec.specializations : null;
    },
    getStaffOnly() {
      const q = query(collection(db, "users"), where("role", "==", "Staff"));
      const querySnapshot = getDocs(q);
      this.staff = [];
      querySnapshot.forEach((response) => {
        const userDetails = response.data();
        userDetails.userID = response.id;
        this.staff.push(userDetails);
      });
    },
  },
});
