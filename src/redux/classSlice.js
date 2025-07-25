import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const getClasses = createAsyncThunk("getTeachers",async () =>  {
    // console.log('class reducer inside');
      const res  = await fetch("/data/classes.json")
      const classesData = await res.json()
    //   console.log(classesData);
      
      return classesData         
})

const classSlice = createSlice({
    name : "classReducer",
    initialState : {
        classes : [],
        loading : false,
        error : null
    },
    reducers:{
        addClass : (state,action) =>{
           
        },
        editClass : (state,acton)=>{
           
        },
        deleteClass : (state,action) =>{
            
        }
    },

    extraReducers:(builder)=>{
        builder.addCase(getClasses.pending,(state)=>{
           state.loading = true
           state.error = null
        })
        builder.addCase(getClasses.fulfilled,(state,action)=>{
            state.loading = false
            state.classes = action.payload
            
        })
        builder.addCase(getClasses.rejected,(state,action)=>{
             state.loading =false
             state.error = action.payload
        })
    }

    
})
export default classSlice.reducer
export const {addClass,editClass,deleteClass} = classSlice.actions