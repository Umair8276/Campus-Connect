const express = require("express")
const router = express.Router();
const {createAttendence,getAttendence,fetchStudents} = require("../Controllers/AttendenceController")

router.post("/createatt",createAttendence)
router.get("/getatt/:subject/:studentId/:facultyId",getAttendence)
router.get("/getstu/:branch/:stu_class/:currentSem",fetchStudents)

module.exports = router; 