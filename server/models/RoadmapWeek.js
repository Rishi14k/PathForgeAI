const mongoose = require('mongoose')

const roadmapWeekSchema = new mongoose.Schema({
    roadmapId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Roadmap',
        required:true
    },
    weekNumber:{
        type:Number,
        required:true
    },
    topics:{
        type:[String],
        require:true
    },
    project:{
        type:String,
        required:true
    },
    projectCompleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const RoadmapWeek = mongoose.model('RoadmapWeek',roadmapWeekSchema)
roadmapWeekSchema.index({roadmapId:1,weekNumber:1},{unique:true})

module.exports = RoadmapWeek