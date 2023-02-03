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
          // this.user = {
          //   uid: userID,
          //   fName: payload.fName,
          //   lName: payload.lName,
          //   email: payload.email,
          // };
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
          console.log("signin");
          console.log(user);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    logoutUser() {
      console.log("signedout");
      auth.signOut();
    },
    handleAuthStateChanged() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          //user is logged in
          const userID = auth.currentUser.uid;
          console.log("onauthchange");
          const unsub = onSnapshot(doc(db, "users", userID), (snapshot) => {
            console.log("Current data: ", snapshot.data());
          });
        } else {
          //user is signed out
          console.log("logout");
        }
      });
    },
  },
});
