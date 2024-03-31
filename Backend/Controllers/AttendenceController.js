const attendenceModal = require("../Modals/AttendenceModal")
const studentModal = require("../Modals/AdmissionModal")
const attendencePerc = require("../Modals/AttendencePercModal")
const nodemailer = require("nodemailer");

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
   const {branch,stu_class,currentSem,endYear} = req.params;
    let students;
    try {
      students = await studentModal.find({branch,stu_class,currentSem,endYear})
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
  let {batch,branch} = req.body;
  console.log(batch,branch)
  try {
    const students = await studentModal.find({endYear:batch,branch}); // Assuming you have a Admission model
    // console.log(students)

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


const sendEmail = async(req,res) => {
    const {email,attendence} = req.body;
      // Sending Mail to the user
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'umairdadan1999@gmail.com',
            pass: 'qvhv pott uauj jubh'
        }
    });

    const mailOptions = {
        from: 'umairdadan1999@gmail.com',
        to: email,
        subject: 'Low Attendence',
        html: `
            <p>Your Attendence Percentage is ${attendence}% . Maintain Your Attendence otherwise i'll not allowed you to sit in the exam</p>
        `
    };

  
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Failed to send email' });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ success: true, message: 'Email sent successfully' });
        }
    });
    res.send({msg:"mail sent successfully"})
}






exports.createAttendence = createAttendence     
exports.getAttendence = getAttendence     
exports.fetchStudents = fetchStudents     
exports.getFacAttendence = getFacAttendence     
exports.calcOverAllPercentage = calcOverAllPercentage     
exports.sendEmail = sendEmail     


