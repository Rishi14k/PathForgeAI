const User = require('../models/User')
const Otp = require('../models/Otp')
const bcrypt = require('bcryptjs')
const generateOtp = require('../services/generateOtp')
const sendOtp = require('../services/sendOtp')
const jwt = require('jsonwebtoken')


const createToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET,
    {expiresIn: "7d"}
  );
};


const register = async(req,res)=>{
    try {
        const {name,email,password} = req.body
        if(!name || !email || !password){
            return res.status(400).json({success:false,message:"All fields are required"})
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({success:false,message:"User already exists"})
        }

        const encodedPassword = await bcrypt.hash(password,10)

        const otp = generateOtp()

        console.log(otp)
        const newUser = await User.create({
            name,
            email,
            password:encodedPassword,
            isEmailVerified:false
        })

        const userOtp = await Otp.create({
            email,
            otp,
            expiresAt:Date.now() + 300000
        })

        await sendOtp(email,otp)

        res.status(201).json({success:true,data:newUser})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Internal server error in register"})
    }   
}

const verifyOtp = async(req,res)=>{
    try {
        const {email,otp} = req.body
        if(!email || !otp){
            return res.status(400).json({success:false,message:"All fields are required"})
        }

        const userOtp = await Otp.findOne({email})
        const user = await User.findOne({email})
        if(!userOtp || !userOtp.otp){
            return res.status(400).json({success:false,message:"Invalid request"});
        }

        if(userOtp.otp !== otp){
            return res.status(400).json({success:false,message:"Invalid OTP"})
        }
         if(userOtp.otp.expireAt < Date.now()){
            return res.status(400).json({success:false,message:"OTP expired"});
        }

        user.isEmailVerified = true
        await user.save()
        await userOtp.deleteOne()

        res.status(200).json({success:true,message:"Email verified successfully"})
        
    } catch (error) {
     res.status(500).json({success:false,message:"Error verifying OTP",error:error.message});   
    }
}

const resendOtp = async(req,res)=>{
    try {
        const {email} = req.body
        if(!email){
            return res.status(400).json({success:false,message:"Email is required!"})
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({success:false,message:"User not found"})
        }
        if(user.isEmailVerified){
            return res.status(400).json({success:false,message:"Email already verified go to login page"})
        }
        const otp = generateOtp()
        const userOtp = await Otp.findOne({email})
        const expiresAt = Date.now() + 300000

        await Otp.findOneAndUpdate({email},{otp,expiresAt},{ 
        upsert: true, 
        returnDocument: 'after' // This replaces 'new: true'
    })
        

        await sendOtp(email,otp)
        res.status(200).json({success:true,message:"OTP sent successfully"})

    } catch (error) {
        res.status(500).json({success:false,message:"Error in resend otp"})
    }
}

const login = async (req,res)=>{
    try {
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({success:false,message:"All fields are required"})
        }

        const user = await User.findOne({email}).select('+password')
        if(!user){
            return res.status(400).json({success:false,message:"User not found"})
        }
        if(!user.isEmailVerified){
            return res.status(400).json({success:false,message:"Email not verified"})
        }
        const isPasswordMatch = await bcrypt.compare(password,user.password)
        if(!isPasswordMatch){
            return res.status(400).json({success:false,messsage:"Invalid password"})
        }
        const token = createToken(user)
        res.status(200).json({success:true,data:user,token})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Internal server Error in login"})
    }
}


const googleLogin = async(req,res)=>{
    try {
        const {idToken} = req.body;
        const ticket = await googleClient.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        const {email,sub} = ticket.getPayload();
        let user = await User.findOne({googleId:sub});
        if(!user){
            user = await User.create({
                email, 
                googleId:sub,
                isEmailVerified:true,
                authProvider:'google'
            })
        }
        const token = createToken(user);
        res.status(200).json({success:true,message:"Login successful",token,user:{id:user._id,email:user.email}});
    } catch (error) {
        res.status(500).json({success:false,message:"Error during Google login",error:error.message});
    }
}

module.exports = {
    register,
    verifyOtp,
    resendOtp,
    login,
    googleLogin
}