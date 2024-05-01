const express = require("express")
const router = express.Router();
const {createAttendence,getAttendence,fetchStudents,getFacAttendence,calcOverAllPercentage,sendEmail,CalcAttPercentage,getStudent} = require("../Controllers/AttendenceController")

router.post("/createatt",createAttendence)
router.get("/getatt/:studentId/:subject",getAttendence)
router.get("/getfacatt/:facultyId",getFacAttendence)
router.post("/calperc",calcOverAllPercentage)
router.post("/sendmail",sendEmail)
router.post("/getatt",CalcAttPercentage)
router.get("/getstu/:branch/:sem/:batch",getStudent)
router.get("/getstu/:branch/:stu_class/:currentSem/:endYear",fetchStudents)

module.exports = router;  