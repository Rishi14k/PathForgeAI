import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getRoadmapById,
  toggleProjectCompletion,
  toggleTaskCompletion,
} from "../../../apis/dashboardApi";

export const fetchRoadmapByIdThunk = createAsyncThunk(
  "singleRoadmap/fetchById",
  async (roadmapId, { rejectWithValue }) => {
    try {
      const res = await getRoadmapById(roadmapId);
      return res.data;
    } catch (error) {
      return rejectWithValue("Failed to load roadmap");
    }
  },
);

export const toggleTaskThunk = createAsyncThunk(
  "singleRoadmap/toogleTask",
  async (taskId, { rejectWithValue }) => {
    try {
      const res = await toggleTaskCompletion(taskId);
      return res;
    } catch (error) {
      return rejectWithValue("Toggle failed");
    }
  },
);

export const toggleProjectThunk = createAsyncThunk(
  "singleRoadmap/toggleProject",
  async (id, { rejectWithValue }) => {
    try {
      const res = await toggleProjectCompletion(id);
      return res;
    } catch (error) {
      return rejectWithValue("Project Toggle failed");
    }
  },
);

const initialState = {
  roadmap: null,
  weeks: [],
  status: "idle",
  progress: null,
  error: null,
  loading: false,
};

const singleRoadmapSlice = createSlice({
  name: "singleRoadmap",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchRoadmapByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(fetchRoadmapByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.roadmap = action.payload.roadmap;
        state.weeks = action.payload.weeks;
        state.progress = action.payload.progress;
        state.status = "succeeded";
      })
      .addCase(fetchRoadmapByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(toggleTaskThunk.fulfilled, (state, action) => {
        const { task, progress } = action.payload;

        state.progress = progress;

        const weekIndex = state.weeks.findIndex((w) => w._id === task.weekId);

        if (weekIndex !== -1) {
          // 1. Update the specific task
          const taskIndex = state.weeks[weekIndex].tasks.findIndex(
            (t) => t._id === task._id,
          );

          if (taskIndex !== -1) {
            state.weeks[weekIndex].tasks[taskIndex] = task;
          }

          // 2. NEW: Update the week completion status instantly in the state
          // This looks at the tasks we just updated and checks if they are ALL completed
          const allTasksDone = state.weeks[weekIndex].tasks.every(
            (t) => t.isCompleted === true,
          );

          state.weeks[weekIndex].isCompleted = allTasksDone;
        }
      })
      .addCase(toggleProjectThunk.fulfilled, (state, action) => {
        const { weekId, projectCompleted, isCompleted } = action.payload;

        const weekIndex = state.weeks.findIndex((w) => w._id === weekId);
        if (weekIndex !== -1) {
          // Update the project specifically
          state.weeks[weekIndex].projectCompleted = projectCompleted;

          // Update the overall week status
          state.weeks[weekIndex].isCompleted = isCompleted;
        }
      });
  },
});

export default singleRoadmapSlice.reducer;
