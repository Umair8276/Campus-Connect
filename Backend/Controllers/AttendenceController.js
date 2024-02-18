const attendenceModal = require("../Modals/AttendenceModal")
const studentModal = require("../Modals/AdmissionModal")

const createAttendence = async(req,res) => {
   const newAttendence = new attendenceModal(req.body)
   try {
      await newAttendence.save()
   } catch (error) {
    console.log(error)
   }
   if(newAttendence)
      return res.send({newAttendence})
    else
    return res.send({err:"Something went wrong"})
}

// get Individual student attendence percentage
const getAttendence = async(req,res) => {
    const {subject,studentId,facultyId} = req.params;
    let attendence,totalLecture;
   try {
     attendence = await attendenceModal.find({subject,studentId}).count()
     totalLecture = await attendenceModal.find({subject,facultyId}).count()
   } catch (error) {
    console.log(error)
   }
      let calcPercentage  =  (attendence / totalLecture) * 100
   if(attendence)
      return res.send({attendence,totalLecture,calcPercentage})
   else 
      return res.send({err:"Something went wrong"})
}

  //  Find Total Students of particular branch
  const fetchStudents = async(req,res) => {
   const {branch,stu_class,currentSem} = req.params;
    let students;
    try {
      students = await studentModal.find({branch,stu_class,currentSem})
    } catch (error) {
      console.log(error)
    }
    if(students)
      return res.send({students})
    else
    return res.send({err:"Something went wrong"})
  }


exports.createAttendence = createAttendence     
exports.getAttendence = getAttendence     
exports.fetchStudents = fetchStudents     


// firstName:"Umair"
// lastName:"Dadan"
// branch:"Computer"
// stu_class:"FE"
// address:"Jeevan Baugh Mumbra"
// state:"maharashttra"
// city:"thane"
// district:"mumbra"
// endYear:"2019"
// role:"student"
// totalFees:93000
// feesPaid:50200
// mobileNo:897609173
// rollNo:"1"
// currentSem:"1"
// email:"zs@gmail.com"
// password:"123456"