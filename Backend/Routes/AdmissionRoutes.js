const express = require("express")
const router = express.Router();
const {Admission,getAllStudent,studentLogin,SearchStudent,updateStudent,getSingleStudent,sendFeesEmail,getStudents} = require("../Controllers/AdmissionController")

router.post("/admission",Admission);
router.get("/getallstu",getAllStudent);
router.post("/login",studentLogin);
router.post("/search",SearchStudent);
router.post("/sendmail",sendFeesEmail);
router.put("/update/:id",updateStudent);
router.get("/getstudent/:id",getSingleStudent);
router.get("/gettotalstu/:branch/:endYear",getStudents);

module.exports = router