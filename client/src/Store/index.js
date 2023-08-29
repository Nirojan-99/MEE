import { configureStore } from "@reduxjs/toolkit";

import authStore from "./auth";

const store = configureStore({
  reducer: {
    auth: authStore.reducer,
  },
});

export default store;
