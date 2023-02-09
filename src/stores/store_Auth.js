import { defineStore } from "pinia";
import { auth, db } from "boot/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, onSnapshot } from "firebase/firestore";

export const authStore = defineStore("authS", {
  state: () => ({
    userDetails: {},
  }),
  getters: {},
  actions: {
    registerUser(payload) {
      createUserWithEmailAndPassword(auth, payload.email, payload.password)
        .then((response) => {
          console.log(response);
          const userID = auth.currentUser.uid;
          const userDetails = setDoc(doc(db, "users", userID), {
            fName: payload.fName,
            lName: payload.lName,
            email: payload.email,
          });
        })
        .catch((error) => {
          console.log(error.code);
          console.log(error);
        });
    },
    loginUser(payload) {
      signInWithEmailAndPassword(auth, payload.email, payload.password)
        .then((response) => {
          const user = response.user;
          console.log("Signed In");
          console.log(user);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    logoutUser() {
      console.log("Logged out");
      auth.signOut();
    },
    handleAuthStateChanged() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          //user is logged in
          const userID = auth.currentUser.uid;
          const unsub = onSnapshot(doc(db, "users", userID), (snapshot) => {
            this.userDetails = snapshot.data();
            console.log("from onauthstate", this.userDetails);
          });
        } else {
          //user is signed out
          this.userDetails = {};
        }
      });
    },
  },
});
