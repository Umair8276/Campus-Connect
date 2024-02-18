const express = require("express")
const router = express.Router();
const {createAssignment,AssignmentUpload,getAssignmentById,checkAssignment,findResponse,getAssignment,completedAss,getAssByBranch,sendComment,getUserAssignment,reUpload} = require("../Controllers/AssignmentController")

router.post("/assignment",createAssignment)
// router.post("/assupload",AssignmentUpload)
router.post("/checkass",checkAssignment)
router.get("/findresponse/:assId",findResponse)
router.get("/getassbyid/:id",getAssignmentById)
router.get("/getass/:branch/:currentSem",getAssignment)
router.get("/completedass/:assignmentId/:studentId",completedAss)
router.get("/getassbybranch/:id",getAssByBranch)
router.put("/updatecomment",sendComment)
router.put("/updatefile/:id",reUpload)
router.get("/getuserass/:studentId/:assignmentId",getUserAssignment)

module.exports = router; 