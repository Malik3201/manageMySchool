import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getClasses = createAsyncThunk(
  "getClasses", 
  async () => {
      const res = await fetch("/data/classes.json");
      const classesData = await res.json();
      return classesData;
    } 
);

const classSlice = createSlice({
  name: "classReducer",
  initialState: {
    classes: JSON.parse(localStorage.getItem("classes")) || [],
    loading: false,
    error: null,
  },
  reducers: {
    addClass: (state, action) => {
      const newClass = {
        id: Date.now(),
        className: action.payload.className,
        sections: action.payload.sections || [
          {
            section: "A",
            students: [],
          },
        ],
      };
      state.classes.push(newClass);
      localStorage.setItem("classes", JSON.stringify(state.classes));
    },
    
    editClass: (state, action) => {
      const classIndex = state.classes.findIndex(
        (cls) => cls.id === action.payload.id
      );
      if (classIndex !== -1) {
        state.classes[classIndex] = {
          ...state.classes[classIndex],
          ...action.payload,
        };
        localStorage.setItem("classes", JSON.stringify(state.classes));
      }
    },
    
    deleteClass: (state, action) => {
      state.classes = state.classes.filter(
        (cls) => cls.id !== action.payload
      );
      localStorage.setItem("classes", JSON.stringify(state.classes));
    },
    
    addSection: (state, action) => {
      const { classId, sectionName } = action.payload;
      const classIndex = state.classes.findIndex((cls) => cls.id === classId);
      if (classIndex !== -1) {
        const existingSection = state.classes[classIndex].sections.find(
          (sec) => sec.section === sectionName
        );
        if (!existingSection) {
          state.classes[classIndex].sections.push({
            section: sectionName,
            students: [],
          });
          localStorage.setItem("classes", JSON.stringify(state.classes));
        }
      }
    },
    
    deleteSection: (state, action) => {
      const { classId, sectionName } = action.payload;
      const classIndex = state.classes.findIndex((cls) => cls.id === classId);
      if (classIndex !== -1) {
        state.classes[classIndex].sections = state.classes[
          classIndex
        ].sections.filter((sec) => sec.section !== sectionName);
        localStorage.setItem("classes", JSON.stringify(state.classes));
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Classes loading started...");
      })
      .addCase(getClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.classes = action.payload;
        localStorage.setItem("classes", JSON.stringify(action.payload));
        console.log("Classes loaded successfully:", action.payload.length, "classes");
      })
      .addCase(getClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Classes loading failed:", action.payload);
   
        const localStorageClasses = JSON.parse(localStorage.getItem("classes")) || [];
        if (localStorageClasses.length > 0) {
          state.classes = localStorageClasses;
          console.log("Using localStorage classes data");
        }
      });
  },
});

export default classSlice.reducer;
export const { addClass, editClass, deleteClass, addSection, deleteSection } =
  classSlice.actions;