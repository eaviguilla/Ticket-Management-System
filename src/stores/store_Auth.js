import { defineStore } from "pinia";
import { auth, db } from "boot/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, onSnapshot, addDoc } from "firebase/firestore";
import { tickStore } from "./store_Ticket";
import { userStore } from "./store_User";

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
          setDoc(doc(db, "subscribed", userID), {
            subscribed: [],
          });
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    loginUser(payload) {
      signInWithEmailAndPassword(auth, payload.email, payload.password)
        .then((response) => {
          const user = response.user;
          console.log("Signed In");
        })
        .catch((error) => {
          alert(error.message);
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
            this.userDetails.userID = userID;
            // tickStore().subscribed = this.userDetails.subscribed;
            tickStore().getSubs(userID);
            userStore().getUsers();
            userStore().getSpecs();
            console.log("from onauthstate", this.userDetails);
          });
          // tick.getTickets;
        } else {
          //user is signed out
          console.log("user not signed in");
          this.userDetails = {};
        }
      });
    },
  },
});
