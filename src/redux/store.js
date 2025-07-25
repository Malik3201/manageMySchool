import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import teacherReducer from "./TeacherSlice";
import classSlice from "./classSlice";
import studentsSlice from "./studentsSlice";
const store = configureStore({
  reducer: {
    authReducer: authReducer,
    teacherReducer: teacherReducer,
    classReducer: classSlice,
        studentsSlice: studentsSlice,
  },
});

export default store;
