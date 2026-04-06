import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRoadmap } from "../../../apis/dashboardApi";

export const fetchMyRoadmapsThunk = createAsyncThunk(
  "createRoadmap/fetchMyRoadmap",
  async () => {
    const data = await getRoadmap();
    return data;
  },
);

const roadmapSlice = createSlice({
  name: "roadmap",
  initialState: {
    roadmaps: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyRoadmapsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyRoadmapsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.roadmaps = action.payload;
      })
      .addCase(fetchMyRoadmapsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default roadmapSlice.reducer