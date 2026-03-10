const mongoose  = require('mongoose')

const optSchema = new mongoose.Schema({
    email:{
        type:String,
    },
    otp:{
        type:String,
        required:true
    },
    // value:{
    //     type:String,
    //     required:true
    // },
    expiresAt:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})

const Otp = mongoose.model('Otp',optSchema)

module.exports = Otp