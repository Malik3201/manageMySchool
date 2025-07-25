import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import teacherReducer from "./TeacherSlice";
import classSlice from "./classSlice";
const store = configureStore({
  reducer: {
    authReducer: authReducer,
    teacherReducer: teacherReducer,
    classReducer: classSlice,
  },
});

export default store;
