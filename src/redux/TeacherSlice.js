import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getTeachers = createAsyncThunk("getTeachers",async () =>  {
      const res  = await fetch("/data/teachers.json")
      const teacherData = await res.json()
      return teacherData          
})

const TeacherSlice = createSlice({
    name : "teacherReducer",
    initialState : {
        teachers : JSON.parse(localStorage.getItem("Teachers")) || [],
        loading : false,
        error : null
    },
    reducers:{
        addTeacher : (state,action) =>{
           const newTeacher = {
            id : Date.now(),
            ...action.payload
           }
           state.teachers.push(newTeacher)
           localStorage.setItem("Teachers",JSON.stringify(state.teachers))
        },
        editTeacher : (state,action) =>{
            console.log(action.payload.id)
           const teacher = state.teachers.find(e=>e.id === action.payload.id)
           teacher.name = action.payload.name
           teacher.email = action.payload.email
           teacher.phone = action.payload.phone
           teacher.assignedClasses = action.payload.assignedClasses
           
        },
        deleteTeacher : (state,action) =>{
            // console.log(state.teachers);
            
           const filterTeachers = state.teachers.filter(e=>e.id!==action.payload)
        //    console.log(JSON.stringify(filterTeachers));
           
           state.teachers = filterTeachers
        }
    },

    extraReducers:(builder)=>{
        builder.addCase(getTeachers.pending,(state)=>{
           state.loading = true
           state.error = null
        })
        builder.addCase(getTeachers.fulfilled,(state,action)=>{
            state.loading = false
            state.teachers = action.payload
            
        })
        builder.addCase(getTeachers.rejected,(state,action)=>{
             state.loading =false
             state.error = action.payload
        })
    }
})
export default TeacherSlice.reducer
export const {addTeacher,editTeacher,deleteTeacher} = TeacherSlice.actions