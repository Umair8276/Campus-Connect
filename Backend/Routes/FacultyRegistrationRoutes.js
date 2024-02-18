const express = require("express")
const router = express.Router();
const {Facultyregistration,getAllFaculty,facultyLogin} = require("../Controllers/FacultyRegistrationController");


router.post("/facregister",Facultyregistration)
router.get("/faculty",getAllFaculty)
router.post("/login",facultyLogin)

module.exports = router;