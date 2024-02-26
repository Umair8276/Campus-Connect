const express = require("express")
const router = express.Router();
const {createAttendence,getAttendence,fetchStudents,getFacAttendence,calcOverAllPercentage} = require("../Controllers/AttendenceController")

router.post("/createatt",createAttendence)
router.get("/getatt/:studentId/:subject",getAttendence)
router.get("/getfacatt/:facultyId",getFacAttendence)
router.post("/calperc",calcOverAllPercentage)
router.get("/getstu/:branch/:stu_class/:currentSem",fetchStudents)

module.exports = router;  