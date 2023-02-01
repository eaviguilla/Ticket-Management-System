import { defineStore } from "pinia";
import { auth, db } from "boot/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const authStore = defineStore({
  id: "authS",
  state: () => ({
    user: "ji",
  }),
  getters: {},
  actions: {
    test() {
      console.log("hay");
    },
    async registerUser({}, payload) {
      auth
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
