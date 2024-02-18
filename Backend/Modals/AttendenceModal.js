const mongoose = require("mongoose")

const attendenceSchema = new mongoose.Schema({
  studentId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Admission"
  },
  facultyId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Register"
  },
  subject:{
    type:String,
    required:true
  },
  branch:{
    type:String,
    required:true
  },
  sem:{
    type:String,
    required:true
  },
  status:{
    type:String,
    required:true
  }

},
{timestamps:true}
);

const attendenceModal = new mongoose.model("Attendence",attendenceSchema);
module.exports = attendenceModal;