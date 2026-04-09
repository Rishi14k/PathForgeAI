import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { disCoveryAnalyses } from "../../../apis/dashboardApi";

export const discoveryThunk = createAsyncThunk(
  "discover/disCoveryAnalyses",
  async (formData, { rejectWithValue }) => {
    try {

       const payload = {
        interests: formData.interests || [],
        activities: formData.activities || "",
        thinkingStyle: formData.thinkingStyle || "",
        problemApproach: formData.problemApproach || "",
        workPreference: formData.workPreference || "",
        motivations: formData.motivations || "",
        learningStyle: formData.learningStyle || "",
        experienceLevel: formData.experienceLevel || "beginner",
        currentSituation: formData.currentSituation || "",
        customInput: formData.customInput || "",
      };
      const res = await disCoveryAnalyses(payload);
      return res;
    } catch (error) {
      return rejectWithValue("Ai suggestion failed!!");
    }
  },
);

const discoverSlice = createSlice({
  name: "discovery",
  initialState: {
    step: 0,
    result: [],
    formData: {},
    error: null,
    loading: false,
    status:"idle"
  },
  reducers: {
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      state.step -= 1;
    },
    saveFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetDiscovery: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(discoveryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status="loading"
      })
      .addCase(discoveryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
        state.step = 4;
        state.status="succeeded"
      })
      .addCase(discoveryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status="failed"
      });
  },
});

export const { nextStep, prevStep, saveFormData, resetDiscovery } = discoverSlice.actions;
export default discoverSlice.reducer;
