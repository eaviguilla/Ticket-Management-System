import { defineStore } from "pinia";
import { auth, db } from "boot/firebase";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useRouter } from "vue-router";
import { locsStore } from "./store_Loc";

const ticketsRef = collection(db, "tickets");
const router = useRouter();
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
        this.tickets.push(ticketDetails);
        this.ticket = ticketDetails;
        // this.router.replace("/view_ticket/" + docRef.id);
      });
    },
    getTickets() {
      this.tickets = [];
      const querySnapshot = getDocs(ticketsRef).then((querySnapshot) => {
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
      // const index = this.tickets.findIndex((tick) => tick.ticketID === payload);
      // console.log(this.tickets);
      // return this.tickets[index];

      // const ticket = this.tickets.find((ticket) => ticket.ticketID === payload);
      // if (ticket) {
      //   return ticket;
      // } else {
      //   return "None";
      // }
    },
  },
});
