import { defineStore } from "pinia";
import { db } from "boot/firebase";
import {
  doc,
  addDoc,
  deleteDoc,
  getDocs,
  collection,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { tickStore } from "./store_Ticket";
import { authStore } from "./store_Auth";
import { userStore } from "./store_User";
import { categStore } from "./store_Categ";

export const repStore = defineStore("repS", {
  state: () => ({
    reports: [],
    categCounts: {},
    countsArray: [],
  }),
  getters: {
    // bmo staff report counts
    bmoReports() {
      const bmoUsers = userStore()
        .users.filter((u) => (u.office === "BMO") & (u.role === "Staff"))
        .map((u) => u.userID);

      const bmoReps = this.reports.filter((u) => bmoUsers.includes(u.userID));
      return bmoReps.map((reps) => ({
        userID: reps.userID,
        assist: reps.assist.length,
        assigned: reps.assigned.length,
        finished: reps.finished.length,
      }));
    },

    // itro staff report counts
    itroReports() {
      const itroUsers = userStore()
        .users.filter((u) => (u.office === "ITRO") & (u.role === "Staff"))
        .map((u) => u.userID);

      const itroReps = this.reports.filter((u) => itroUsers.includes(u.userID));
      return itroReps.map((reps) => ({
        userID: reps.userID,
        assist: reps.assist.length,
        assigned: reps.assigned.length,
        finished: reps.finished.length,
      }));
    },

    categReports() {
      for (let i = 0; i < tickStore().tickets.length; i++) {
        const categID = tickStore().tickets[i].categID;
        if (this.categCounts[categID] === undefined) {
          this.categCounts[categID] = { categID, count: 1 };
        } else {
          this.categCounts[categID].count++;
        }
      }

      this.countsArray = Object.values(this.categCounts);
      return this.countsArray;
    },

    bmoCategReps() {
      const bmoCategs = categStore()
        .categories.filter((c) => c.office === "BMO")
        .map((c) => c.categID);
      return this.countsArray.filter((c) => bmoCategs.includes(c.categID));
    },
    itroCategReps() {
      const itroCategs = categStore()
        .categories.filter((c) => c.office === "ITRO")
        .map((c) => c.categID);
      return this.countsArray.filter((c) => itroCategs.includes(c.categID));
    },
  },
  actions: {
    // get all report data
    getReports() {
      onSnapshot(collection(db, "reports"), (querySnapshot) => {
        this.reports = [];
        querySnapshot.forEach((response) => {
          const reportDetails = response.data();
          reportDetails.userID = response.id;
          this.reports.push(reportDetails);
        });
      });
    },
  },
});
