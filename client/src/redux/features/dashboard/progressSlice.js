import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserProgress } from "../../../apis/dashboardApi";


const initialState = {
  stats: null,
  weeklyActivity: [],
  monthlyProgress: [],
  roadmapProgress: [],
  achievements: [],
  streak:null,
  longestStreak:null,
  loading: false,
  error: null,
};

export const getProgressThunk = createAsyncThunk('progress/getProgress',async(
    _,{rejectWithValue}
)=>{
    try {
        const res = await getUserProgress()
        return res
    } catch (error) {
      return rejectWithValue("Progress fetch  failed");
    
    }
})

const progressSlice  = createSlice({
    name:'progress',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(getProgressThunk.pending,(state)=>{
                state.loading=true
            })
            .addCase(getProgressThunk.fulfilled,(state,action)=>{
                state.loading=false
                state.stats = action.payload.stats
                state.weeklyActivity = action.payload.weeklyActivity
                state.monthlyProgress = action.payload.monthlyProgress
                state.roadmapProgress = action.payload.roadmapProgress
                state.achievements = action.payload.achievements
                state.streak = action.payload.streak
                state.longestStreak = action.payload.longestStreak
            })
            .addCase(getProgressThunk.rejected,(state,action)=>{
                state.loading = false
                state.error = action.payload
            })
    }
})

export default progressSlice.reducer