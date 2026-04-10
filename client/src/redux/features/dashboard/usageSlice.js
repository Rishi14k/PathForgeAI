import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDiscoveryResult, getUsageStatus } from "../../../apis/dashboardApi";

export const getUsageStatusThunk = createAsyncThunk(
  "usage/getUsageStatus",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUsageStatus();
      return res;
    } catch (error) {
      return rejectWithValue("Usage status fetch failed!");
    }
  },
);

export const getDiscoveryResultThunk = createAsyncThunk(
  "usage/getResult",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getDiscoveryResult();
      return res;
    } catch (error) {
      return rejectWithValue("Usage result fetch failed!");
    }
  },
);

const usageSlice = createSlice({
  name: "usage",
  initialState: {
    status: "idle",
    data: null,
    results:[]
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getUsageStatusThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsageStatusThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getDiscoveryResultThunk.pending,(state)=>{
        state.status = "resultLoading"
      })
      .addCase(getDiscoveryResultThunk.fulfilled,(state,action)=>{
        state.status = "succeeded",
        state.results = action.payload
      })
  },
});

export default usageSlice.reducer;
