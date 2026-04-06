import {configureStore} from "@reduxjs/toolkit"
import authReducer from './features/auth/authSlice'
import dashboardReducer from './features/dashboard/dashboardStateSlice'
import uiReducer from './features/ui/uiSlice'
import roadmapReducer from './features/dashboard/roadmapSlice'
import createRoadmapReducer from './features/dashboard/createRoadmapSlice'
import singleRoadmapreducer from './features/dashboard/singleRoadmapSlice'
import progressReducer from './features/dashboard/progressSlice'


export const store = configureStore({
    reducer:{
        auth:authReducer,
        dashboard:dashboardReducer,
        ui:uiReducer,
        roadmap:roadmapReducer,
        createRoadmap:createRoadmapReducer,
        singleRoadmap:singleRoadmapreducer,
        progress:progressReducer
    }
})