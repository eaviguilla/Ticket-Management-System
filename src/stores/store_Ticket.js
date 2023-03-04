import { defineStore } from "pinia";
import { db } from "boot/firebase";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { locsStore } from "./store_Loc";
import { authStore } from "./store_Auth";
import { userStore } from "./store_User";

const ticketsRef = collection(db, "tickets");

export const tickStore = defineStore("tickS", {
  state: () => ({
    tickets: [],
    ticket: {},
    subscribed: [],
  }),
  getters: {
    filterSub() {
      if (this.subscribed != undefined) {
        return this.tickets.filter((ticket) =>
          this.subscribed.includes(ticket.ticketID)
        );
      }
    },
    filterActive() {
      if (this.subscribed != undefined) {
        return this.tickets.filter(
          (ticket) => !this.subscribed.includes(ticket.ticketID)
        );
      } else {
        return this.tickets;
      }
    },
  },
  actions: {
    // adding a new ticket
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
        locsStore().getRoom(this.ticket.roomID);
        this.assignTicket(docRef.id, payload.categID);
      });
    },

    getLowestAssigned(users, userIDs) {
      const filteredUsers = users.filter((user) =>
        userIDs.includes(user.userID)
      );
      filteredUsers.sort((a, b) => a.count - b.count);
      return filteredUsers[0].userID;
    },

    assignTicket(tID, cID) {
      const staffSpec = userStore()
        .specs.filter((spec) => spec.specializations.includes(cID))
        .map((spec) => spec.userID);

      const lowestAssigned = this.getLowestAssigned(
        userStore().getAvailableStaff,
        staffSpec
      );
      if (staffSpec.length != 0) {
        updateDoc(doc(db, "tickets", tID), {
          Assigned: lowestAssigned,
        });
        updateDoc(doc(db, "users", lowestAssigned), {
          assignedCount: increment(1),
        });
        console.log("Specialized staff: ", lowestAssigned);
      } else {
        console.log("no staff with spec");
        updateDoc(doc(db, "Tickets", tID), {
          Assigned: "None",
        });
      }
    },

    getTickets() {
      const q = query(ticketsRef, where("status", "!=", "Resolved"));
      onSnapshot(q, (querySnapshot) => {
        this.tickets = [];
        console.log("hasbeencalled");
        querySnapshot.forEach((response) => {
          const ticketDetails = response.data();
          ticketDetails.ticketID = response.id;
          this.tickets.push(ticketDetails);
        });
        console.log(this.tickets);
      });
    },
    getTicket(payload) {
      const specificTicket = this.tickets.find(
        (specificTicket) => specificTicket.ticketID === payload
      );
      locsStore().getRoom(specificTicket.roomID);
      this.ticket = specificTicket;
    },

    getSubs(uID) {
      onSnapshot(doc(db, "subscribed", uID), (response) => {
        this.subscribed = response.data().subscribed;
      });
    },

    subTicket(payload) {
      updateDoc(doc(db, "subscribed", authStore().userDetails.userID), {
        subscribed: arrayUnion(payload),
      });
    },
    unsubTicket(payload) {
      updateDoc(doc(db, "subscribed", authStore().userDetails.userID), {
        subscribed: arrayRemove(payload),
      });
    },
  },
});
