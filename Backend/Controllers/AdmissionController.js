const AdmissionModal = require("../Modals/AdmissionModal");
const nodemailer = require("nodemailer");

const Admission = async (req, res) => {
    const { firstName,lastName, branch, startYear, endYear, totalFees, feesPaid, remainingFees, mobileNo, stu_class, currentSem, rollNo, address,state,city,district,pincode,oldEmail,profile } = req.body;
    let findStudent;
    // Check If Student Already exists in Db?
    try {
        findStudent = await AdmissionModal.findOne({ mobileNo });
    } catch (error) {
        console.log(error)
    }
    if (findStudent) {
        return res.send({ err: "Student Already Exists" });
    }

    // Finding Total COunt of a Student than Allocating Roll No
    let total_count;
    try {
        total_count = await AdmissionModal.find({stu_class,branch,endYear,currentSem}).count()
    } catch (error) {
        console.log(error)
    }
    let roll_No = total_count == 0 ?  1 : total_count + 1
    let generateEmail = startYear.substring(0,2) + branch.substring(0,2).toUpperCase() + (roll_No > 9 ? roll_No : `0${roll_No}`) + `@gmail.com`;
    let newPass = firstName+endYear;
    //New Admission
    const newAdmission = new AdmissionModal({
        firstName,
        lastName,
        branch,
        startYear,
        endYear,
        totalFees,
        feesPaid,
        address,
        state,
        city,
        district,
        pincode,
        remainingFees,
        mobileNo,
        stu_class,
        currentSem,
        rollNo: roll_No,
        oldEmail,
        profile,
        newEmail:generateEmail ,
        password:newPass
    });
 
    try {
        await newAdmission.save();
    }
    catch (err) {
        console.log(err)
    }
    res.send({ newAdmission })


    // const {email} = req.body;
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
      to: oldEmail,
      subject: 'Your Username and Password',
      html: `
          <p>Here are your login credentials:</p>
          <p><strong>Email: ${generateEmail}</strong></p>
          <p><strong>Password: ${newPass}</strong> </p>
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

   
}

const sendFeesEmail = async(req,res) => {
    const {email,feesPaid,totalFees} = req.body;
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
        subject: 'Notice Regarding fees',
        html: `
            <h3>Your Total fees is <strong>${totalFees}</strong> and you are payed till now is rs.<strong>${feesPaid}<strong/> . You Have to pay your remaining fees which is <strong>${totalFees - feesPaid}</strong> otherwise you will not allowed to sit in the exam</h3>
         
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
}

  


const getAllStudent = async(req,res) => {
    let student;
    try {
        student = await AdmissionModal.find({})
    } catch (error) {
        console.log(error)
    }
    if(student)
      return res.send({student})
    else 
      return res.send({err:"Error Occured"})
}

const studentLogin = async(req,res) => {
    const {oldEmail,password} = req.body;
    let stLogin;
    try {
     stLogin = await AdmissionModal.findOne({newEmail:oldEmail});
    } catch (error) {
      console.log(error)
    }
    if(stLogin){
      if(stLogin.password==password)
        return res.send({msg:"Login Successfully",user:stLogin});
      else 
        return res.send({err:"Password is incorrect"});
}
else{
    return res.send({err:"Please Signup first than login"});
}
// return res.send({msg:"Login Successfully",user:stLogin})
  }

//   search student by class and branch
const SearchStudent  = async(req,res) => {
    const {branch,stu_class,rollNo,endYear} = req.body;
    console.log(req.body)
    let student;
    try{
      student = await AdmissionModal.find({branch,stu_class,rollNo,endYear})
    }
    catch(err)  {
        console.log(err);
    }
    if(student){
        return  res.send({student})
    }
    else{
        return res.send({err:"Something went Wrong"})
    }
}

const updateStudent = async (req,res) => {
    let student;
     try { 
       student = await AdmissionModal.findByIdAndUpdate(req.params.id,{
         $set:req.body
       },{
        new:true
       })
     } catch (error) {
        console.log(error)
     }
     if(student)
       return res.send({student})
    else
      return res.send({err:"Something went Wrong"})
}

const getSingleStudent = async(req,res) => {
    let student;
    try {
         student = await AdmissionModal.findById(req.params.id)
    } catch (error) {
        console.log(error)
    }
    if(student)
      res.send({student})
    else
      res.send({err:"Something went Wrong"})
}

exports.Admission = Admission;
exports.getAllStudent = getAllStudent;
exports.studentLogin = studentLogin;
exports.SearchStudent = SearchStudent;
exports.updateStudent = updateStudent;
exports.getSingleStudent = getSingleStudent;
exports.sendFeesEmail = sendFeesEmail;

