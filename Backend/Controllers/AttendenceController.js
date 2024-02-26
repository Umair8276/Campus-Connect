const attendenceModal = require("../Modals/AttendenceModal")
const studentModal = require("../Modals/AdmissionModal")
const attendencePerc = require("../Modals/AttendencePercModal")

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
// const getAttendence = async(req,res) => {
//     const {subject,studentId,facultyId} = req.params;
//     let attendence,totalLecture;
//    try {
//      attendence = await attendenceModal.find({subject,studentId}).count()
//      totalLecture = await attendenceModal.find({subject,facultyId}).count()
//    } catch (error) {
//     console.log(error)
//    }
//       let calcPercentage  =  (attendence / totalLecture) * 100
//    if(attendence)
//       return res.send({attendence,totalLecture,calcPercentage})
//    else 
//       return res.send({err:"Something went wrong"})
// }

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

const getAttendence = async(req,res) => {
  let ttLecture,attendedLec;
  const {subject,studentId} = req.params
  try{
     ttLecture = await attendenceModal.find({subject}).count()
     attendedLec = await attendenceModal.find({subject,studentId: { $in: [studentId] }}).count()
  }
  catch(err){
    console.log(err)
  }
  let calcPercentage = (attendedLec / ttLecture) * 100;
  // console.log("attendedLec : ",attendedLec,"ttLecture :" ,ttLecture)
  return res.send({calcPercentage})
}

// Get Faculty subject Attendence
const getFacAttendence = async(req,res) => {
  let facAtt;
  try {
      facAtt = await attendenceModal.find({facultyId:req.params.facultyId})
  } catch (error) {
    console.log(error)
  }
  if(facAtt)
    return res.send({facAtt})
  else
    return res.send({err:"Something went Wrong"});
}



const calcOverAllPercentage = async (req, res) => {
  try {
    const students = await studentModal.find(); // Assuming you have a Admission model

    const attendancePercentages = [];

    // Iterate over each student
    for (const student of students) {
      let totalLectures = 0;
      let totalAttended = 0;

      // Iterate over each subject sent from frontend
      for (const subject of req.body.subjects) { // Assuming subjects are sent from frontend in the request body
        // Find total lectures for the subject
        const ttLecture = await attendenceModal.find({ subject }).count();

        // Find attended lectures for the student for the subject
        const attendedLecs = await attendenceModal.find({ subject, studentId: student._id }).count();

        totalLectures += ttLecture;
        totalAttended += attendedLecs;
      }

      // Calculate average attendance percentage for the student
      const averagePercentage = (totalAttended / totalLectures) * 100;
      
      // Push the student's average percentage to the array
      attendancePercentages.push({ studentId: student._id, averagePercentage });
    }

    return res.send({ attendancePercentages });
  } catch (err) {
    console.log(err);
    return res.send({ error: 'Internal Server Error' });
  }
};




// const calcOverAllPercentage = async (req, res) => {
//   try {
//     // Extract subjects array from the request body
//     const { subjects } = req.body;

//     // Validate subjects
//     if (!Array.isArray(subjects) || subjects.length === 0) {
//       return res.status(400).send({ error: 'Subjects must be provided as a non-empty array' });
//     }

//     // Fetch all attendance records for the specified subjects
//     const allAttendances = await attendenceModal.find({ subject: { $in: subjects } });

//     // Create an object to store attendance percentages for each student
//     const attendancePercentages = {};

//     // Process attendance data
//     allAttendances.forEach(attendance => {
//       const { studentId, attended } = attendance;
//       if (!attendancePercentages[studentId]) {
//         attendancePercentages[studentId] = { totalLectures: 0, totalAttended: 0 };
//       }
//       attendancePercentages[studentId].totalLectures++;
//       if (attended) {
//         attendancePercentages[studentId].totalAttended++;
//       }
//     });

//     // Calculate average attendance percentage for each student
//     for (const studentId in attendancePercentages) {
//       const { totalLectures, totalAttended } = attendancePercentages[studentId];
//       const averagePercentage = totalLectures !== 0 ? (totalAttended / totalLectures) * 100 : 0;
//       attendancePercentages[studentId].averagePercentage = averagePercentage;
//     }

//     // Respond with the calculated attendance percentages for each student
//     return res.send({ attendancePercentages });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).send({ error: 'Internal Server Error' });
//   }
// };






exports.createAttendence = createAttendence     
exports.getAttendence = getAttendence     
exports.fetchStudents = fetchStudents     
exports.getFacAttendence = getFacAttendence     
exports.calcOverAllPercentage = calcOverAllPercentage     


