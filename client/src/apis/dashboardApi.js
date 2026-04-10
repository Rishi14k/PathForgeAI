import apiClient from "./apiClient";

export const dashboardState = async()=>{
    const res = await apiClient.get('/ai/dashboard/state')
    return res.data
}

export const getRoadmap = async()=>{
    const res = await apiClient.get(`/ai/user/roadmaps`)
    return res.data
}

export const createRoadmap = async(data)=>{
    const res = await apiClient.post('/ai/generate-roadmap',data)
    return res.data
}

export const getRoadmapById = async(id)=>{
    const res = await apiClient.get(`/ai/roadmap/${id}`)
    return res.data
}

export const toggleTaskCompletion = async(taskId)=>{
    const res = await apiClient.patch(`/ai/tasks/${taskId}/toggle`)
    return res.data
}

export const toggleProjectCompletion = async(id)=>{
    const res = await apiClient.patch(`/ai/weeks/${id}/toggle-project`)
    return res.data
}

export const getUserProgress = async()=>{
    const res = await apiClient.get('/ai/user/progress')
    return res.data
}

export const getStreak = async()=>{
    const res = await apiClient.get('/ai/streak')
    return res.data
}

export const disCoveryAnalyses = async(data)=>{
    const res = await apiClient.post('/ai/discovery/analyze',data)
    return res.data
}

export const getUsageStatus = async()=>{
    const res = await apiClient.get('/ai/usage-status')
    return res.data
}

export const getDiscoveryResult = async()=>{
    const res = await apiClient.get('/ai/discovery/result')
    return res.data
}