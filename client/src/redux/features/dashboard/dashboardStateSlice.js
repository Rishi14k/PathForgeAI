import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { startLoading, stopLoading } from "../ui/uiSlice";
import { dashboardState } from "../../../apis/dashboardApi";


export const dashboardStateThunk = createAsyncThunk("dashboard/fetchState",async(_,{dispatch,getState})=>{
    const {dashboard} = getState()
    if(dashboard.data){
        return dashboard.data
    }

    try {
        dispatch(startLoading())
        const data = await dashboardState()
        return data
    }finally{
        dispatch(stopLoading())
    }
})

const dashboardStateSlice = createSlice({
    name:'dashboard',
    initialState:{
        data:null,
        error:null
    },
    reducers:{
        clearDashboard:(state)=>{
            state.data = null
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(dashboardStateThunk.fulfilled,(state,action)=>{
                state.data = action.payload
            })
            .addCase(dashboardStateThunk.rejected,(state,action)=>{
                state.error = action.error.message
            })
    }
})

export const {clearDashboard} = dashboardStateSlice.actions 
export default dashboardStateSlice.reducer