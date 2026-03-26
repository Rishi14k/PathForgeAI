import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, resendOtp, verifyOtp } from "../../../apis/authApi";


const initialState={
        user:null,
        token: localStorage.getItem('token') ||null,
        isAuthenticated:false,
        error:null,
        loading:false,
        otpSent:false
    }

    // thunks

    export const registerThunk = createAsyncThunk('auth/register',async(data,thunkApi)=>{
        try {
            const res = await registerUser(data)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data.message)            
        }
    })

    //verify otp 
    export const verifyOtpThunk = createAsyncThunk('auth/verify-otp',async(data,thunkApi)=>{
        try {
            const res = await verifyOtp(data)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data.message)
        }
    })

    //resend otp
    export const resendOtpThunk = createAsyncThunk('auth/resend-otp',async(data,thunkApi)=>{
        try {
            const res = await resendOtp(data)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data.message)
        }
    })

    //login 
    export const loginThunk = createAsyncThunk('auth/login',async(data,thunkApi)=>{
        try {
            const res = await loginUser(data)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data.message)
        }
    })

    //getMe
    export const getMeThunk = createAsyncThunk('auth/get-me',async(_,thunkApi)=>{
        try {
            const res = await getMe()
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data.message)        
        }
    })


const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
    },

    extraReducers:(builder)=>{
        builder.addCase(registerThunk.pending,(state)=>{
            state.loading = true
        })
        .addCase(registerThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.otpSent = true
            // state.user = action.payload.data
        })
        .addCase(registerThunk.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
        .addCase(verifyOtpThunk.pending,(state)=>{
            state.loading=true
        })
        .addCase(verifyOtpThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.isAuthenticated = true
            // state.user = action.payload.data
        })
        .addCase(verifyOtpThunk.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
        .addCase(resendOtpThunk.pending,(state)=>{
            state.loading = true
        })
        .addCase(resendOtpThunk.fulfilled,(state,action)=>{
            state.loading = false,
            state.otpSent = true
        })
        .addCase(resendOtpThunk.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload

        })
        .addCase(loginThunk.pending,(state)=>{
            state.loading = true
        
        })
        .addCase(loginThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.isAuthenticated = true
            state.user = action.payload.data
            state.token = action.payload.token
            localStorage.setItem('token',action.payload.token)
            
        })
        .addCase(loginThunk.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
        .addCase(getMeThunk.fulfilled,(state,action)=>{
            state.user = action.payload.data
            state.isAuthenticated = true
        })
    }
})

export default authSlice.reducer;
