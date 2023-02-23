import { defineStore } from "pinia";
import { auth, db } from "boot/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "vue-router";

const ticketsRef = collection(db, "tickets");
const router = useRouter();

export const tickStore = defineStore("tickS", {
  state: () => ({
    tickets: [],
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
        this.router.replace("/view_ticket/" + docRef.id);
      });
    },
    getTIckets() {},
    getTicket(payload) {
      const ticket = this.tickets.find(
        (ticket) => ticket.ticketID === payload.ticketID
      );
      if (ticket) {
        return ticket;
      } else {
        return "None";
      }
    },
  },
});
