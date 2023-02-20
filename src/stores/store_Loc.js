import { defineStore } from "pinia";
import { db } from "boot/firebase";
import { authStore } from "./store_Auth";
import {
  doc,
  addDoc,
  deleteDoc,
  getDocs,
  collection,
  updateDoc,
  getDoc,
} from "firebase/firestore";

const locsRef = collection(db, "locations");

export const locsStore = defineStore("locS", {
  state: () => ({
    locations: [],
  }),
  getters: {},
  actions: {
    getLocs() {
      getDocs(locsRef).then((querySnapshot) => {
        querySnapshot.forEach((response) => {
          const locationDetails = response.data();
          locationDetails.locID = response.id;
          this.locations.push(locationDetails);
        });
      });
    },
    // from chat gpt on writing a ticket using subcollection rooms

    // // Get a reference to the "Room 201" document in the "locations" collection
    // const locationRef = db.collection("locations").doc("Floor 2").collection("rooms").doc("Room 201");
    // // Create a new ticket document in the "tickets" collection and set its location field to the reference
    // db.collection("tickets").add({
    //   // other fields for the ticket document...
    //   location: locationRef
    // })
    // .then((docRef) => {
    //   console.log("Ticket created with ID: ", docRef.id);
    // })
    // .catch((error) => {
    //   console.error("Error adding ticket: ", error);
    // });
  },
});
