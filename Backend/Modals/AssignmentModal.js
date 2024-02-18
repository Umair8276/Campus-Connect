const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
    faculty:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Register"
    },
    subject:{
        type:String,
        required:true
    },
    content:{
        type:String,
    },
    file:{
        type:String,
    },
    sem:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    response:[
       {
         type:mongoose.Schema.Types.ObjectId,
         ref:"Admission"
    }
    ],
    lastDate:{
        type:String,
        required:true
    }, 
    
},
{timestamps:true}
);

const assignmentModal = new mongoose.model("Assignment",assignmentSchema);
module.exports = assignmentModal;