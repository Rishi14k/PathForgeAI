export const selectRoadmaps = (state) =>
  state.roadmap?.roadmaps?.data;

export const selectRoadmapLoading = (state) =>
  state.roadmap?.loading;