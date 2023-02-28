import { defineStore } from "pinia";
import { db } from "boot/firebase";
import {
  doc,
  addDoc,
  getDocs,
  collection,
  updateDoc,
  getDoc,
  query,
  where,
  onSnapshot,
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
    // filtering of floors for staffs and admins
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

    // selection filtering of floors
    selectFloors() {
      const filteredFloors = this.floors.filter(
        (floor) => floor.enabled === true
      );
      return filteredFloors.sort((a, b) => {
        return a.floor.localeCompare(b.floor, undefined, { numeric: true });
      });
    },
  },

  actions: {
    // get all floors and rooms
    getLocs() {
      onSnapshot(floorsRef, (querySnapshot) => {
        this.floors = [];
        querySnapshot.forEach((response) => {
          const floorDetails = response.data();
          floorDetails.floorID = response.id;
          this.floors.push(floorDetails);
        });
      });
      onSnapshot(roomsRef, (querySnapshot) => {
        this.rooms = [];
        querySnapshot.forEach((response) => {
          const roomDetails = response.data();
          roomDetails.roomID = response.id;
          this.rooms.push(roomDetails);
        });
      });
      console.log(this.floors);
      console.log(this.rooms);
    },

    filterRooms(id) {
      const filteredRooms = this.rooms.filter((room) => room.floorID === id);
      return filteredRooms.sort((a, b) => {
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

    // selection filtering of rooms
    selectRooms(id) {
      const filteredRooms = this.rooms.filter(
        (room) => room.enabled === true && room.floorID === id
      );
      return filteredRooms.sort((a, b) => {
        return a.area_room.localeCompare(b.area_room, undefined, {
          numeric: true,
        });
      });
    },

    // getting specific floor
    getFloor(id) {
      const findFloor = this.floors.find((floor) => floor.floorID === id);
      this.floor = findFloor;
    },

    // getting specific room
    getRoom(id) {
      const findRoom = this.rooms.find((room) => room.roomID === id);
      this.room = findRoom;
      this.getFloor(this.room.floorID);
    },

    // adding new floor and room methods
    addFloor(payload) {
      const newFloor = { floor: payload, enabled: true };
      addDoc(floorsRef, { floor: payload, enabled: true });
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
      });
    },

    // updating floor and room methods
    updateFloor(payload) {
      // update firebase
      updateDoc(doc(db, "floors", payload.floorID), {
        floor: payload.floor,
        enabled: payload.enabled,
      });
    },
    updateRoom(payload) {
      // update firebase
      updateDoc(doc(db, "rooms", payload.roomID), {
        area_room: payload.area_room,
        enabled: payload.enabled,
      });
    },
    // simple display of specific Location/Floor and Area/Room
    displayFloor(id) {
      const room = this.rooms.find((room) => room.roomID === id);
      if (room) {
        const floor = this.floors.find(
          (floor) => floor.floorID === room.floorID
        );
        if (floor) {
          return floor.floor;
        } else {
          return "None";
        }
      } else {
        return "None";
      }
    },
    displayRoom(id) {
      const room = this.rooms.find((room) => room.roomID === id);
      if (room) {
        return room.area_room;
      } else {
        return "None";
      }
    },
  },
});
