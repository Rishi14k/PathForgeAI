const mongoose = require('mongoose')

const roadmapSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    // roadmapWeekId:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'RoadmapWeek'
    // },
    // raodmapTaksId:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'RoadmapTask'
    // },
    goal:{
        type:String,
        required:true
    },
    skillLevel:{
  type:String,
  required:true
},
    dailyStudyTime:{
        type:Number,
        required:true
    },
    durationWeeks:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['active','completed','archived'],
    },
    aiRawResponse:{
        type:String,
        required:true
    },
    aiProvider:{
  type:String,
  default:'gemini'
},

},{timestamps:true})

roadmapSchema.index({userId:1})
const Roadmap = mongoose.model('Roadmap',roadmapSchema)

module.exports = Roadmap