import { defineStore } from "pinia";
import { auth, db } from "boot/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const authStore = defineStore("authS", {
  state: () => ({
    user: {},
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
          this.user = {
            uid: userID,
            fName: payload.fName,
            lName: payload.lName,
            email: payload.email,
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
