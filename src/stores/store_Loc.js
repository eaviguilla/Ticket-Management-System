import { defineStore } from "pinia";
import { db } from "boot/firebase";
import { authStore } from "./store_Auth";
import {
  doc,
  addDoc,
  getDocs,
  collection,
  updateDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";

const floorsRef = collection(db, "floors");
const roomsRef = collection(db, "rooms");

export const locsStore = defineStore("locS", {
  state: () => ({
    floors: [],
    rooms: [],
    floor: {},
    room: {},
  }),
  getters: {
    // filtering for floors and rooms for staffs and admins

    filterFloors() {
      return this.floors.sort((a, b) => {
        // First compare the enabled property
        if (a.enabled && !b.enabled) {
          return -1;
        } else if (!a.enabled && b.enabled) {
          return 1;
        }

        return a.floor.localeCompare(b.floor, undefined, { numeric: true });
      });
    },
    filterRooms() {
      return this.rooms.sort((a, b) => {
        // First compare the enabled property
        if (a.enabled && !b.enabled) {
          return -1;
        } else if (!a.enabled && b.enabled) {
          return 1;
        }
        // Then compare the floor property
        return a.area_room.localeCompare(b.area_room, undefined, {
          numeric: true,
        });
      });
    },

    // selection filtering of floors and rooms

    selectFloors() {
      const filteredFloors = this.floors.filter(
        (floor) => floor.enabled === true
      );
      return filteredFloors.sort((a, b) => {
        return a.floor.localeCompare(b.floor, undefined, { numeric: true });
      });
    },
    selectRooms() {
      const filteredRooms = this.rooms.filter((room) => room.enabled === true);
      return filteredRooms.sort((a, b) => {
        return a.area_room.localeCompare(b.area_room, undefined, {
          numeric: true,
        });
      });
    },
  },

  actions: {
    // getting all floors
    getFloors() {
      this.floors = [];
      getDocs(floorsRef).then((querySnapshot) => {
        querySnapshot.forEach((response) => {
          const floorDetails = response.data();
          floorDetails.floorID = response.id;
          this.floors.push(floorDetails);
        });
      });
    },

    // getting specific floor
    getFloor(payload) {
      const docRef = doc(db, "floors", payload);
      getDoc(docRef).then((docSnap) => {
        const floorDetails = docSnap.data();
        floorDetails.floorID = docSnap.id;
        this.floor = floorDetails;
        console.log(this.floor);
      });
    },

    // getting all rooms in a floor
    getRooms(payload) {
      this.rooms = [];
      const q = query(roomsRef, where("floorID", "==", payload));
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((response) => {
          const roomDetails = response.data();
          roomDetails.roomID = response.id;
          this.rooms.push(roomDetails);
          console.log(roomDetails);
        });
      });
    },

    // getting specific room
    getRoom(payload) {
      const docRef = doc(db, "rooms", payload);
      getDoc(docRef).then((docSnap) => {
        const roomDetails = docSnap.data();
        roomDetails.roomID = docSnap.id;
        this.room = roomDetails;
        console.log(this.room);
        this.getFloor(this.room.floorID);
      });
    },

    // adding new floor and room methods
    addFloor(payload) {
      const newFloor = { floor: payload, enabled: true };
      addDoc(floorsRef, { floor: payload, enabled: true }).then((docRef) => {
        newFloor.floorID = docRef.id;
        this.floors.push(newFloor);
      });
    },
    addRoom(payload) {
      const newRoom = {
        area_room: payload.area_room,
        floorID: payload.floorID,
        enabled: true,
      };
      addDoc(roomsRef, {
        area_room: payload.area_room,
        floorID: payload.floorID,
        enabled: true,
      }).then((docRef) => {
        newRoom.roomID = docRef.id;
        this.rooms.push(newRoom);
      });
    },

    // updating floor and room methods
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
      // update firebase
      updateDoc(doc(db, "rooms", payload.roomID), {
        area_room: payload.area_room,
        enabled: payload.enabled,
      });
      // update state
      const index = this.rooms.findIndex(
        (room) => room.roomID === payload.roomID
      );
      this.rooms[index].area_room = payload.area_room;
      this.rooms[index].enabled = payload.enabled;
    },
  },
});
