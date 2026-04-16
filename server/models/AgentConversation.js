const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    role:{
        type:String,
        enum:['user','system','assistant'],
        required:true
    },
    content:{
        type:String,
        required:true
    },
    metadata:{
        type:Object,
        default:{}
    }
},{timestamps:true,_id:false})


const agentConversationSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true
    },
    roadmapId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Roadmap",
        required:true,
        index:true
    },
    messages:[messageSchema],

    lastActiveAt: {
      type: Date,
      default: Date.now,
    },

},{timestamps:true})

const AgentConversation = mongoose.model('AgentConversation',agentConversationSchema)

module.exports = AgentConversation