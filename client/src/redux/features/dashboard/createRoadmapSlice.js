import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createRoadmap } from "../../../apis/dashboardApi";

export const createRoadmapThunk = createAsyncThunk(
  "roadmap/create",
  async (formData, { rejectWithValue }) => {
    try {
      const payload = {
        goal: formData.topic || formData.customTopic,
        level: formData.skillLevel,
        hoursPerDay: Number(formData.weeklyHours),
        weekNumber: Number(formData.durationWeeks),

        learningStyles: formData.learningStyle,
        resourcePreferences: formData.resourceTypes,
      };
      const res = await createRoadmap(payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Roadmap generation failed",
      );
    }
  },
);

const createRoadmapSlice = createSlice({
  name: "createRoadmap",
  initialState:{
    loading:false,
    roadmapId:null,
    error:null,
    status: "idle"
  },
  reducers:{
     resetCreateRoadmap: (state) => {
      state.loading = false;
      state.roadmapId = null;
      state.error = null;
    },
  },
  extraReducers:(builder)=>{
    builder
        .addCase(createRoadmapThunk.pending,(state)=>{
            state.loading=true
            state.error=null
            state.status="loading"
        })
        .addCase(createRoadmapThunk.fulfilled,(state,action)=>{
            state.loading=false
            state.roadmapId = action.payload._id
            state.status="succeeded"
        })
        .addCase(createRoadmapThunk.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
            state.status="failed"
        })
  }
});

export const {resetCreateRoadmap } = createRoadmapSlice.actions
export default createRoadmapSlice.reducer