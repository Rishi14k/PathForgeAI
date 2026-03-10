const express = require('express')
const { register, verifyOtp, resendOtp, login, googleLogin } = require('../controllers/authController')

const router = express.Router()

router.post('/register',register)
router.post('/verify-otp',verifyOtp)
router.post('/resend-otp',resendOtp)
router.post('/login',login)
router.post('/google-login',googleLogin)

module.exports = router