const mongoose = require("mongoose")

const attendenceSchema = new mongoose.Schema({
    studentId:{
        type:String,
        required:true
    },
    totalLec:{
        type:String,
        required:true
    },
    attendedLec:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    percentage:{
        type:Number,
        requiresd:true
    }
   
   
   
},{timestamps:true})

const attendenceModal = new mongoose.model("AttendencePercentage",attendenceSchema)
module.exports = attendenceModal