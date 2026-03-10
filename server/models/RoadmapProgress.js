const mongoose = require('mongoose')

const roadmapProgressSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    roadmapId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Roadmap',
        required:true
    },

    totalTasks:{
        type:Number,
        required:true
    },
    completedTasks:{
        type:Number,
        required:true
    
    },
    progressPercent:{
        type:Number
    }

},{timestamps:true})

const RoadmapProgress = mongoose.model('RoadmapProgress',roadmapProgressSchema)

module.exports = RoadmapProgress