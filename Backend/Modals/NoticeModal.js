const mongoose = require("mongoose")

const noticeSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    faculty:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    file:{
        type:String,
    },
    branch:{
        type:String,
        required:true
    },

    classes:{
        type:String,
    },
   
},{timestamps:true})

const noticeModal = new mongoose.model("Notice",noticeSchema)
module.exports = noticeModal