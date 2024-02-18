const express = require("express")
const router = express.Router();
const {Admission,getAllStudent,studentLogin,SearchStudent} = require("../Controllers/AdmissionController")

router.post("/admission",Admission);
router.get("/getallstu",getAllStudent);
router.post("/login",studentLogin);
router.post("/search",SearchStudent);

module.exports = router