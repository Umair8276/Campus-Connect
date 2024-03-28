const express = require("express")
const router = express.Router();
const {createAttendence,getAttendence,fetchStudents,getFacAttendence,calcOverAllPercentage,sendEmail} = require("../Controllers/AttendenceController")

router.post("/createatt",createAttendence)
router.get("/getatt/:studentId/:subject",getAttendence)
router.get("/getfacatt/:facultyId",getFacAttendence)
router.post("/calperc",calcOverAllPercentage)
router.post("/sendmail",sendEmail)
router.get("/getstu/:branch/:stu_class/:currentSem/:endYear",fetchStudents)

module.exports = router;  