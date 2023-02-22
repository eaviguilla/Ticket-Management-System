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
  getters: {
    filterFloors() {
      return this.floors.sort((a, b) => {
        // First compare the enabled property
        if (a.enabled && !b.enabled) {
          return -1;
        } else if (!a.enabled && b.enabled) {
          return 1;
        }

        // Then compare the floor property
        if (a.floor < b.floor) {
          return -1;
        } else if (a.floor > b.floor) {
          return 1;
        } else {
          return 0;
        }
      });
    },
  },
  actions: {
    getFloors() {
      this.floors = [];
      getDocs(floorsRef).then((querySnapshot) => {
        querySnapshot.forEach((response) => {
          const floorDetails = response.data();
          floorDetails.floorID = response.id;
          this.floors.push(floorDetails);
        });
      });
      console.log("got the floors");
    },
    getRooms() {
      this.rooms = [];
      getDocs(roomsRef).then((querySnapshot) => {
        querySnapshot.forEach((response) => {
          const roomDetails = response.data();
          roomDetails.roomID = response.id;
          this.rooms.push(roomDetails);
        });
      });
      console.log("got the rooms");
    },
    addFloor(payload) {
      const newFloor = { floor: payload, enabled: true };
      addDoc(floorsRef, { floor: payload, enabled: true }).then((docRef) => {
        newFloor.floorID = docRef.id;
        this.floors.push(newFloor);
      });
    },
    addRoom(payload) {
      const newRoom = {
        room: payload.room,
        floorID: payload.floorID,
        enabled: true,
      };
      addDoc(roomsRef, {
        room: payload.room,
        floorID: payload.floorID,
        enabled: true,
      }).then((docRef) => {
        newRoom.roomID = docRef.id;
        this.rooms.push(newRoom);
      });
    },
    updateFloor(payload) {
      // update firebase
      updateDoc(doc(db, "floors", payload.floorID), {
        floor: payload.floor,
        enabled: payload.enabled,
      });
      // update state
      const index = this.floors.findIndex(
        (floor) => floor.floorID === payload.floorID
      );
      this.floors[index].floor = payload.floor;
      this.floors[index].enabled = payload.enabled;
    },
    updateRoom(payload) {
      const updatedRoom = { room: payload.room, enabled: payload.enabled };
      const docRef = updateDoc(doc(db, "rooms", payload.roomID), {
        room: payload.room,
        enabled: payload.enabled,
      });
      // updatedRoom.roomID = docRef.id;
      // this.rooms.push(updatedRoom);
    },
  },
});
