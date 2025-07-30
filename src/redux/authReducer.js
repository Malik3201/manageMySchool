import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
  "fetchUsers",
  async (credentials, { rejectWithValue }) => {
    try {
      const usersList = await axios.get("/data/users.json");
      const currentUser = usersList.data.find((user) => {
        return (
          user.email == credentials.email &&
          user.password == credentials.password
        );
      });
      if (!currentUser) return rejectWithValue("Invalid UserName or Password");
      return currentUser;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const authReducer = createSlice({
  name: "authReducer",
  initialState: {
    errors: null,
    isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
    userId: null,
    userRole: null,
    isLoading: false,
  },
  reducers: {
    logOut: (state) => {
      localStorage.removeItem("userId");
      localStorage.removeItem("userRole");
      state.isLoggedIn = false;
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("students");
      localStorage.removeItem("classes");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errors = null;
        state.isLoggedIn = true;
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        state.userId = action.payload.id;
        localStorage.setItem("userId", JSON.stringify(action.payload.id));
        state.userRole = action.payload.role;
        localStorage.setItem("userRole", JSON.stringify(action.payload.role));
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
        console.log(state.errors);
      });
  },
});
export default authReducer.reducer;
export const { logOut } = authReducer.actions;
