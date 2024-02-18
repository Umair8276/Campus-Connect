const assignmentModal= require("../Modals/AssignmentModal");
const uploadModal= require("../Modals/AssignmentUpload");

const createAssignment = async(req,res) => {
    const newAssignment = new assignmentModal(req.body);   //Accept data from Backend
    try {
        await newAssignment.save();
    } catch (error) {
        console.log(error)
    }
    res.send({msg:"Assignment Created Successfully",newAssignment})
}

const getAssignmentById = async(req,res) => {
    let ass;
    const {id} = req.params;
    try {
        ass = await assignmentModal.findById(id)
    } catch (error) {
        console.log(error)
    }
    if(ass){
        return res.send({ass})
    }
    else 
      return res.send({err:"Something went wrong"})
}



// Check Assignment and Upload Assignment
const checkAssignment = async(req,res) => {
    const {assignmentId,studentId,file} = req.body;
    // Upload Assignment
    const newUpload = new uploadModal({
        assignmentId,
        studentId,
        file,
    });
    try {
        await newUpload.save();
    } catch (error) {
        console.log(error) 
    }

    let checkedAss;
    try {
        checkedAss = await assignmentModal.findByIdAndUpdate(assignmentId,{
            $push:{response:studentId},
        },{
            new:true
        })
    } catch (error) {
        console.log(error)
    }
    res.send({checkedAss,newUpload})
}

// Find Total Response
const findResponse = async(req,res) => {
    const {assId} = req.params;
    let count,resp;
    try {
        count = await uploadModal.find({assignmentId:assId}).populate("studentId").count()
        resp = await uploadModal.find({assignmentId:assId}).populate("studentId")
    } catch (error) {
        console.log(error)
    }
    res.send({count,resp})
}

// Find Assignment Based on Branch and class
const getAssignment = async(req,res) => {
    const {branch,currentSem} = req.params;
    let data;
    try {
        data = await assignmentModal.find({branch,sem:currentSem})
    } catch (error) {
        console.log(error)
    }
    if(data)
      return res.send({data})
    else 
      return res.send({err:"Something went wrong"})
}

// 
const completedAss = async(req,res) => {
    let ass;
    try {
        ass = await uploadModal.find({assignmentId:req.params.assignmentId,studentId:req.params.studentId})
    } catch (error) {
        console.log(error)
    }
    return res.send({ass})
}

// Get Assignment of specific faculty
const getAssByBranch = async(req,res) => {
    const {id} = req.params;
    let ass;
    try {
        ass = await assignmentModal.find({faculty:id})
    } catch (error) {
        console.log(error)
    }
    if(ass) {
        return res.send({ass})
    }
    return res.send({err:"Something went wrong"})
}

// Sending Comment to the Student
const sendComment = async(req,res) => {
    const {id,comment} = req.body;
    let comments;
    try{
       comments = await uploadModal.findByIdAndUpdate(id,{
         comment
       },{
        new:true
       })
    }
    catch(err) {
        console.log(err)
    }
    if(comments)
        return res.send({comments})
    else
       return res.send({err:"Something went wrong"})
}

// Get Assignment based on assignmentId and StudentId
 const getUserAssignment = async(req,res) => {
    console.log(req.params)
    let {studentId,assignmentId} = req.params;
    let data;
    try {
     data = await uploadModal.findOne({studentId,assignmentId})
    } catch (error) {
        console.log(error)
    }
    if(data) 
      return res.send({data})
    else  
      return res.send({err:"Something went wrong"})
 }

//  ReUpload Assignment
const reUpload = async(req,res) => {
    const {file} = req.body
    let UpdateFile;
    try {
        UpdateFile = await uploadModal.findByIdAndUpdate(req.params.id,{
           file
        },{
            new:true
        })
    } catch (error) {
        console.log(error)
    }
    if(UpdateFile)
       return res.send({msg:"Assignment Updated Successfully",UpdateFile})
    else  
      return res.send({err:"Something went wrong"})
}

exports.createAssignment = createAssignment
// exports.AssignmentUpload = AssignmentUpload
exports.getAssignmentById = getAssignmentById
exports.checkAssignment = checkAssignment
exports.findResponse = findResponse
exports.getAssignment = getAssignment
exports.completedAss = completedAss
exports.getAssByBranch = getAssByBranch
exports.sendComment = sendComment
exports.getUserAssignment = getUserAssignment
exports.reUpload = reUpload