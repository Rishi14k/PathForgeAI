require('dotenv').config()
const express = require("express")
const cors = require('cors')

const roadmapRoute = require('./routes/roadmap')
const { connectDB } = require('./db/database')
const authRoutes = require('./routes/authRoutes')
const paymentRoutes = require('./routes/paymentRoute')

const app = express()
const PORT = process.env.PORT || 5000

connectDB()
app.use(express.json())
app.use(cors({
     origin: process.env.ACCESS_URL,
     credentials: true,
}))

app.use('/api/ai', roadmapRoute)
app.use('/api/auth',authRoutes)
app.use('/api/payment',paymentRoutes)

app.listen(PORT,()=>{
    console.log(`server runnning on http://localhost:${PORT}`)
})