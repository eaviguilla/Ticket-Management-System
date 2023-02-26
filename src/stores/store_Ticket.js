import { defineStore } from "pinia";
import { db } from "boot/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { locsStore } from "./store_Loc";

const ticketsRef = collection(db, "tickets");
const locs = locsStore();

export const tickStore = defineStore("tickS", {
  state: () => ({
    tickets: [],
    ticket: {},
  }),
  getters: {},
  actions: {
    addTicket(payload) {
      addDoc(ticketsRef, {
        description: payload.description,
        office: payload.office,
        categID: payload.categID,
        roomID: payload.roomID,
        status: "Submitted",
        statusTimestamps: [
          {
            status: "Submitted",
            timestamp: payload.timestamp,
          },
        ],
      }).then((docRef) => {
        const ticketDetails = {
          description: payload.description,
          office: payload.office,
          categID: payload.categID,
          roomID: payload.roomID,
          status: "Submitted",
          statusTimestamps: [
            {
              status: "Submitted",
              timestamp: payload.timestamp,
            },
          ],
        };
        ticketDetails.ticketID = docRef.id;
        console.log("From add: ", ticketDetails.ticketID);
        this.ticket = ticketDetails;
      });
    },
    getTickets() {
      // const q = query(ticketsRef, where("status", "!=", "Resolved"));
      // getDocs(q).then((querySnapshot) => {
      //   querySnapshot.forEach((response) => {
      //     const ticketDetails = response.data();
      //     ticketDetails.ticketID = response.id;
      //     this.tickets.push(ticketDetails);
      //   });
      // });

      const q = query(ticketsRef, where("status", "!=", "Resolved"));
      onSnapshot(q, (querySnapshot) => {
        this.tickets = [];
        console.log("hasbeencalled");
        querySnapshot.forEach((response) => {
          const ticketDetails = response.data();
          ticketDetails.ticketID = response.id;
          this.tickets.push(ticketDetails);
        });
      });
    },
    getTicket(payload) {
      const docRef = doc(db, "tickets", payload);
      getDoc(docRef).then((docSnap) => {
        const ticketDetails = docSnap.data();
        ticketDetails.ticketID = docSnap.id;
        this.ticket = ticketDetails;
        console.log(this.ticket);
        locs.getRoom(ticketDetails.roomID);
      });
    },
  },
});
