import apiClient from "./apiClient";

export const registerUser = async(data)=>{
    return apiClient.post('/auth/register',data) 
}

export const verifyOtp = async(data)=>{
    return apiClient.post('/auth/verify-otp',data)
}

export const resendOtp = async(data)=>{
    return apiClient.post('/auth/resend-otp',data)
}

export const loginUser  = async(data)=>{
    return apiClient.post('/auth/login',data)
}

export const getMe = async()=>{
    return apiClient.get('/auth/me')
}