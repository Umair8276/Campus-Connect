
const mongoose = require("mongoose")
const registerSchema = new mongoose.Schema({
 name:{
    type:String,
    required:true
 },
 email:{
    type:String,
    required:true
 },
 jobId:{
    type:Number,
   //  required:true
 },
 password:{
    type:String,
    required:true
 },
 role:{
    type:String,
    required:true
 },
 joiningDate:{
    type:Date,
    required:true
 },
 dept:{
    type:String,
 },
 qualification:{
    type:String,
 },
},
{timestamps:true}
);

const registerModal = new mongoose.model("Register",registerSchema);
module.exports = registerModal;