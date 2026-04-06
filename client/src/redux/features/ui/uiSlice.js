import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    globalLoading:false
}

const uiSlice = createSlice({
    name:"ui",
    initialState,
    reducers:{
        startLoading:(state)=>{
            state.globalLoading = true
        },
        stopLoading:(state)=>{
            state.globalLoading=false
        }
    }
})

export const { startLoading, stopLoading } = uiSlice.actions;
export default uiSlice.reducer;