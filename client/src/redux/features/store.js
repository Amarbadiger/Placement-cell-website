import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./alertSlice";
import { userSlice } from "./userSlice";

const store = configureStore({
  reducer: {
    alerts: alertSlice.reducer,
    user: userSlice.reducer,
    // other reducers
  },
});

export default store;
