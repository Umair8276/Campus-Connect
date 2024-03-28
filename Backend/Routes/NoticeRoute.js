const express = require("express")
const router = express.Router();
const {createNotice,getNotice,getFacNotice,getNoticeById,deleteNotice,updateNotice} = require("../Controllers/NoticeController")

router.post("/createnotice",createNotice)
router.get("/getnotice/:branch/:classes",getNotice)
router.get("/getfacnotice/:branch",getFacNotice)
router.get("/getnoticebyid/:id",getNoticeById)
router.delete("/deletenotice/:id",deleteNotice)
router.put("/updatenotice/:id",updateNotice)
 
module.exports = router; 