const mongoose = require('mongoose')

const roadmapTaskSchema = new mongoose.Schema({
    weekId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'RoadmapWeek',
        required:true
    },
    roadmapId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Roadmap',
        required:true
    },
    taskTitle:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    completedAt:Date,
    taskOrder:{
  type:Number
},

},{timestamps:true})

roadmapTaskSchema.index({roadmapId:1})
roadmapTaskSchema.index({weekId:1})
const RoadmapTask = mongoose.model('RoadmapTask',roadmapTaskSchema)
module.exports = RoadmapTask