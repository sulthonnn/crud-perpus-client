import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import bookReducer from "../features/bookSlice";
import memberReducer from "../features/memberSlice";
import userReducer from "../features/userSlice";
import logReducer from "../features/logSlice";
import circulationReducer from "../features/circulationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    book: bookReducer,
    member: memberReducer,
    user: userReducer,
    circulation: circulationReducer,
    log: logReducer,
  },
});
