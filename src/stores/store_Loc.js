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

const floorsRef = collection(db, "floors");
const roomsRef = collection(db, "rooms");

export const locsStore = defineStore("locS", {
  state: () => ({
    floors: [],
    rooms: [],
  }),
  getters: {},
  actions: {
    getLocs() {
      this.floors = [];
      getDocs(floorsRef).then((querySnapshot) => {
        querySnapshot.forEach((response) => {
          const floorDetails = response.data();
          floorDetails.floorID = response.id;
          this.floors.push(floorDetails);
        });
      });
      this.rooms = [];
      getDocs(roomsRef).then((querySnapshot) => {
        querySnapshot.forEach((response) => {
          const roomDetails = response.data();
          roomDetails.roomID = response.id;
          this.rooms.push(roomDetails);
        });
      });
    },
    addFloor(payload) {
      const newFloor = { floor: payload.floor, active: true };
      const docRef = addDoc(floorsRef, { newFloor });
      newFloor.floorID = docRef.id;
      this.floors.push(newFloor);
    },
    addRoom(payload) {
      const newRoom = {
        room: payload.room,
        floorID: payload.floorID,
        active: true,
      };
      const docRef = addDoc(roomsRef, { newRoom });
      newRoom.roomID = docRef.id;
      this.rooms.push(newRoom);
    },
    updateFloor(payload) {
      const updatedFloor = { floor: payload.floor, active: payload.active };
      const docRef = updateDoc(collection(db, "floors", payload.floorID), {
        updatedFloor,
      });
      // updatedFloor.floorID = docRef.id;
      // this.floors.push(updatedFloor);
    },
    updateRoom(payload) {
      const updatedRoom = { room: payload.room, active: payload.active };
      const docRef = updateDoc(collection(db, "rooms", payload.roomID), {
        updatedRoom,
      });
      // updatedRoom.roomID = docRef.id;
      // this.rooms.push(updatedRoom);
    },
  },
});
