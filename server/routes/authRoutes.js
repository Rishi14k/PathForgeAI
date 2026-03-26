const express = require('express')
const { register, verifyOtp, resendOtp, login, googleLogin, getUser } = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.post('/register',register)
router.post('/verify-otp',verifyOtp)
router.post('/resend-otp',resendOtp)
router.post('/login',login)
router.post('/google-login',googleLogin)
router.get('/me',authMiddleware,getUser)

module.exports = router