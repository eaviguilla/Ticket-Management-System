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
    assist: [],
    assigned: [],
    finished: [],
    all: [],
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
        return this.tickets.filter(
          (ticket) => ticket.assigned === "None" && ticket.status !== "Resolved"
        );
      } else {
        return this.tickets;
      }
    },
    filterAssisting() {
      const assisting = this.tickets.filter((ticket) =>
        this.assist.includes(ticket.ticketID)
      );
      return assisting.filter((ticket) => ticket.status !== "Resolved");
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
        const noteID = Date.now();
        setDoc(doc(db, "notes", docRef.id), {
          [noteID]: {
            note: "Here you can ask for questions or say additional informations.",
            userID: "system",
          },
        });
        locsStore().getRoom(this.ticket.roomID);
        this.autoAssignTicket(docRef.id, payload.categID);
      });
    },

    // auto assigning a ticket
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
          assigned: arrayUnion(tID),
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

    // getting all tickets
    getTickets() {
      onSnapshot(collection(db, "tickets"), (querySnapshot) => {
        this.tickets = [];
        querySnapshot.forEach((response) => {
          const ticketDetails = response.data();
          ticketDetails.ticketID = response.id;
          this.tickets.push(ticketDetails);
        });
      });
    },

    // getting a specific ticket in state
    getTicket(id) {
      const specificTicket = this.tickets.find(
        (specificTicket) => specificTicket.ticketID === id
      );
      locsStore().getRoom(specificTicket.roomID);
      this.ticket = specificTicket;
      this.assigned = userStore().getStaffName(specificTicket.assigned);
      this.getTicketStatus(id);
    },

    // updating ticket details
    updateTicketDetails(payload) {
      updateDoc(doc(db, "tickets", payload.ticketID), {
        description: payload.description,
        categID: payload.categID,
        roomID: payload.roomID,
      });
    },

    // updating ticket criticality
    updateCriticality(tID, crit) {
      updateDoc(doc(db, "tickets", tID), {
        criticality: crit,
      });
    },

    // manual assigning of ticket
    manualAssignTicket(tID, uID) {
      if (this.ticket.assigned !== "None") {
        if (
          this.ticket.status === "In Progress" ||
          this.ticket.status === "Resolved"
        ) {
          updateDoc(doc(db, "tickets", tID), {
            assigned: uID,
          });
        } else {
          updateDoc(doc(db, "tickets", tID), {
            status: "Assigned",
            assigned: uID,
          });
        }
        updateDoc(doc(db, "reports", this.ticket.assigned), {
          assigned: arrayRemove(tID),
        });
        updateDoc(doc(db, "reports", uID), {
          assigned: arrayUnion(tID),
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
          assigned: arrayUnion(tID),
        });
        updateDoc(doc(db, "status", tID), {
          Assigned: Date.now(),
        });
      }
    },

    // self assign
    selfAssignTicket(tID) {
      updateDoc(doc(db, "tickets", tID), {
        status: "Assigned",
        assigned: authStore().userDetails.userID,
      });
      updateDoc(doc(db, "reports", authStore().userDetails.userID), {
        assigned: arrayUnion(tID),
      });
      updateDoc(doc(db, "status", tID), {
        Assigned: Date.now(),
      });
    },

    // getting specific ticket status
    getTicketStatus(id) {
      this.ticketStatus = this.status.find((status) => status.ticketID === id);
    },

    // getting all ticket status
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

    // updatin ticket status
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
          assigned: arrayUnion(tID),
          finished: arrayRemove(tID),
        });
      } else {
        updateDoc(doc(db, "status", tID), {
          Resolved: Date.now(),
        });
        updateDoc(doc(db, "reports", authStore().userDetails.userID), {
          assigned: arrayRemove(tID),
          finished: arrayUnion(tID),
        });
      }
    },

    // getting all ticket id that user is subscribed
    getSubs(uID) {
      onSnapshot(doc(db, "subscribed", uID), (response) => {
        this.subscribed = response.data().subscribed;
      });
      if (authStore().userDetails.role === "Staff") {
        onSnapshot(doc(db, "reports", uID), (response) => {
          this.assist = response.data().assist;
          this.assigned = response.data().assigned;
          this.finished = response.data().finished;
          this.all = [
            ...new Set([
              ...this.subscribed,
              ...this.assist,
              ...this.assigned,
              ...this.finished,
            ]),
          ];
        });
      }
    },

    // subscribing/unsubscribing to a ticket
    subTicket(tID) {
      updateDoc(doc(db, "subscribed", authStore().userDetails.userID), {
        subscribed: arrayUnion(tID),
      });
    },
    unsubTicket(tID) {
      updateDoc(doc(db, "subscribed", authStore().userDetails.userID), {
        subscribed: arrayRemove(tID),
      });
    },

    // assisting a ticket
    assistTicket(tID) {
      updateDoc(doc(db, "reports", authStore().userDetails.userID), {
        assist: arrayUnion(tID),
      });
    },
    unassistTicket(tID) {
      updateDoc(doc(db, "reports", authStore().userDetails.userID), {
        assist: arrayRemove(tID),
      });
    },

    // getting tickets that are in roomID
    foundTickets(rID) {
      const filteredTickets = this.tickets.filter(
        (tick) => tick.roomID === rID && tick.status !== "Resolved"
      );
      return filteredTickets;
    },
  },
});
