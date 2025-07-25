import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import studentsSlice from "./studentsSlice";
const store = configureStore({
  reducer: {
    authReducer: authReducer,
    studentsSlice: studentsSlice,
  },
});

export default store;
