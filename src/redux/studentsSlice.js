import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchStudents = createAsyncThunk(
  "fetchStudents",
  async (_, { rejectwithValue }) => {
    try {
      const students = await axios.get("/data/students.json");
      return students.data;
    } catch (error) {
      return rejectwithValue(error.response.data);
    }
  }
);

const studentsSlice = createSlice({
  name: "studentSlice",
  initialState: {
    students: JSON.parse(localStorage.getItem("students")) || [],
    errors: null,
    isLoading: false,
  },
  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
      localStorage.setItem("students", JSON.stringify(state.students));
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter(
        (stu) => stu.id !== action.payload
      );
      localStorage.setItem("students", JSON.stringify(state.students));
    },

    editStudent: (state, action) => {
      console.log(action.payload.id);
      const index = state.students.findIndex(
        (stu) => stu.id == action.payload.id
      );
      console.log(index);
      if (index !== -1) {
        state.students[index] = {
          ...state.students[index],
          ...action.payload,
        };
        console.log(state.students[index]);
        localStorage.setItem("students", JSON.stringify(state.students));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.errors = null;
        state.isLoading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.errors = null;
        state.isLoading = false;
        state.students = action.payload;
        localStorage.setItem("students", JSON.stringify(action.payload));
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.errors = action.payload;
        state.isLoading = false;
      });
  },
});
export default studentsSlice.reducer;
export const { addStudent, editStudent, deleteStudent } = studentsSlice.actions;
