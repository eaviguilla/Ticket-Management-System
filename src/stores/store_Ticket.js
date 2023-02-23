import { defineStore } from "pinia";
import { auth, db } from "boot/firebase";
import { addDoc, collection } from "firebase/firestore";

const ticketsRef = collection(db, "tickets");
export const tickStore = defineStore("tickS", {
  state: () => ({
    tickets: {},
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
        this.tickets.push(ticketDetails);
      });
    },
  },
});
