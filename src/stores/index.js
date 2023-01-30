import { defineStore } from "pinia";
import auth from "./modules/store_Auth";

export const Store = defineStore({
  modules: {
    // example
    auth,
  },
});
