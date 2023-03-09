import { defineStore } from "pinia";
import { db } from "boot/firebase";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteField,
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
    status: [],
    ticket: {},
    ticketStatus: {},
    subscribed: [],
    assigned: null,
  }),
  getters: {
    filterSub() {
      if (this.subscribed != undefined) {
        const subs = this.tickets.filter((ticket) =>
          this.subscribed.includes(ticket.ticketID)
        );
        return subs.filter((ticket) => ticket.status !== "Resolved");
      }
    },
    filterSubResolved() {
      if (this.subscribed != undefined) {
        if (!authStore().userDetails.office) {
          const subs = this.tickets.filter((ticket) =>
            this.subscribed.includes(ticket.ticketID)
          );
          return subs.filter((ticket) => ticket.status === "Resolved");
        } else {
          return this.tickets.filter((ticket) => ticket.status === "Resolved");
        }
      }
    },
    filterResolved() {
      if (this.subscribed != undefined) {
        return this.tickets.filter((ticket) => ticket.status === "Resolved");
      }
    },
    filterActive() {
      if (this.subscribed != undefined) {
        const actives = this.tickets.filter(
          (ticket) => !this.subscribed.includes(ticket.ticketID)
        );
        return actives.filter(
          (ticket) =>
            ticket.assigned !== authStore().userDetails.userID &&
            ticket.status !== "Resolved"
        );
      } else {
        return this.tickets;
      }
    },
    filterActiveAssigned() {
      if (this.subscribed != undefined) {
        const actives = this.tickets.filter(
          (ticket) => !this.subscribed.includes(ticket.ticketID)
        );
        return actives.filter(
          (ticket) =>
            ticket.assigned === authStore().userDetails.userID &&
            ticket.status !== "Resolved"
        );
      } else {
        return this.tickets;
      }
    },
    filterActiveUnassigned() {
      if (this.subscribed != undefined) {
        const actives = this.tickets.filter(
          (ticket) => !this.subscribed.includes(ticket.ticketID)
        );
        return actives.filter(
          (ticket) => ticket.assigned === "None" && ticket.status !== "Resolved"
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
        criticality: "None",
      }).then((docRef) => {
        const ticketDetails = {
          description: payload.description,
          office: payload.office,
          categID: payload.categID,
          roomID: payload.roomID,
          status: "Submitted",
          criticality: "None",
        };
        ticketDetails.ticketID = docRef.id;
        console.log("From add: ", ticketDetails.ticketID);
        this.ticket = ticketDetails;
        setDoc(doc(db, "status", docRef.id), {
          Submitted: payload.timestamp,
        });
        locsStore().getRoom(this.ticket.roomID);
        this.autoAssignTicket(docRef.id, payload.categID);
      });
    },

    getLowestAssigned(users, userIDs) {
      const filteredUsers = users.filter((user) =>
        userIDs.includes(user.userID)
      );
      filteredUsers.sort((a, b) => a.count - b.count);
      return filteredUsers[0].userID;
    },

    autoAssignTicket(tID, cID) {
      const staffSpec = userStore()
        .specs.filter((spec) => spec.specializations.includes(cID))
        .map((spec) => spec.userID);
      const available = userStore().getAvailableStaff;
      console.log("available: ", available);
      if (staffSpec.length !== 0 && available.length !== 0) {
        const lowestAssigned = this.getLowestAssigned(available, staffSpec);
        this.ticket.status = "Assigned";
        this.ticket.assigned = lowestAssigned;
        updateDoc(doc(db, "tickets", tID), {
          status: "Assigned",
          assigned: lowestAssigned,
        });
        updateDoc(doc(db, "reports", lowestAssigned), {
          assignedCount: increment(1),
        });
        updateDoc(doc(db, "status", tID), {
          Assigned: Date.now(),
        });
        console.log("Specialized staff: ", lowestAssigned);
      } else {
        console.log("no staff with spec");
        this.ticket.assigned = "None";
        updateDoc(doc(db, "tickets", tID), {
          assigned: "None",
        });
      }
    },

    getTickets() {
      // const q = query(ticketsRef, where("status", "!=", "Resolved"));
      onSnapshot(collection(db, "tickets"), (querySnapshot) => {
        this.tickets = [];
        querySnapshot.forEach((response) => {
          const ticketDetails = response.data();
          ticketDetails.ticketID = response.id;
          this.tickets.push(ticketDetails);
          console.log("deets", ticketDetails);
        });
      });
    },

    getTicket(id) {
      const specificTicket = this.tickets.find(
        (specificTicket) => specificTicket.ticketID === id
      );
      locsStore().getRoom(specificTicket.roomID);
      this.ticket = specificTicket;
      this.assigned = userStore().getStaffName(specificTicket.assigned);
      this.getTicketStatus(id);
    },

    updateTicketDetails(payload) {
      updateDoc(doc(db, "tickets", payload.ticketID), {
        description: payload.description,
        categID: payload.categID,
        roomID: payload.roomID,
      });
    },

    updateCriticality(tID, crit) {
      updateDoc(doc(db, "tickets", tID), {
        criticality: crit,
      });
    },

    manualAssignTicket(tID, uID) {
      if (this.ticket.assigned !== "None") {
        updateDoc(doc(db, "tickets", tID), {
          status: "Assigned",
          assigned: uID,
        });
        updateDoc(doc(db, "reports", this.ticket.assigned), {
          assignedCount: increment(-1),
        });
        updateDoc(doc(db, "reports", uID), {
          assignedCount: increment(1),
        });
        updateDoc(doc(db, "status", tID), {
          Assigned: Date.now(),
        });
      } else {
        updateDoc(doc(db, "tickets", tID), {
          status: "Assigned",
          assigned: uID,
        });
        updateDoc(doc(db, "reports", uID), {
          assignedCount: increment(1),
        });
        updateDoc(doc(db, "status", tID), {
          Assigned: Date.now(),
        });
      }
    },

    getTicketStatus(id) {
      this.ticketStatus = this.status.find((status) => status.ticketID === id);
    },

    getStatus() {
      // const q = query(collection(db, "status"), !where("Resolved"));
      onSnapshot(collection(db, "status"), (querySnapshot) => {
        this.status = [];
        querySnapshot.forEach((response) => {
          const statusDetails = response.data();
          statusDetails.ticketID = response.id;
          this.status.push(statusDetails);
        });
      });
    },

    updateStatus(tID, status) {
      updateDoc(doc(db, "tickets", tID), {
        status: status,
      });
      if (status === "In Progress" && "Resolved" in this.ticketStatus) {
        updateDoc(doc(db, "status", tID), {
          In_Progress: Date.now(),
          Resolved: deleteField(),
        });
        return;
      }
      if (status === "In Progress") {
        updateDoc(doc(db, "status", tID), {
          In_Progress: Date.now(),
        });
      } else if (!("In_Progress" in this.ticketStatus)) {
        updateDoc(doc(db, "status", tID), {
          In_Progress: Date.now(),
          Resolved: Date.now(),
        });
        updateDoc(doc(db, "reports", authStore().userDetails.userID), {
          assignedCount: increment(1),
          finishedCount: increment(-1),
        });
      } else {
        updateDoc(doc(db, "status", tID), {
          Resolved: Date.now(),
        });
        updateDoc(doc(db, "reports", authStore().userDetails.userID), {
          assignedCount: increment(-1),
          finishedCount: increment(1),
        });
      }
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
