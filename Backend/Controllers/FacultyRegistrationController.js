
// const RegisterModal = require("../Modals/RegisterModal")
const RegisterModal = require("../Modals/RegisterModal")

const Facultyregistration = async(req,res) => {
  // const {name,email,password,role,dept,qualification} = req.body;
     const newRegistration = new RegisterModal({
      name:req.body.name,
      email:req.body.email,
      password:req.body.password,
      role:req.body.role,
      dept:req.body.dept,
      qualification:req.body.qualification,
      joiningDate:req.body.joiningDate
     });
     try {
       await newRegistration.save();
     } catch (error) {
        console.log(error)
     }
     res.send({msg:"Registration Successfully",newRegistration})
}

const getAllFaculty = async(req,res) => {
  let fac;
  try {
     fac = await RegisterModal.find({});
  } catch (error) {
    console.log(error)
  }
  if(fac)
    return res.send({fac})
  else
  return req.send({err:"Something went wrong"})
}

const facultyLogin = async(req,res) => {
  const {email,password} = req.body;
  let facLogin;
  try {
   facLogin = await RegisterModal.findOne({email});
  } catch (error) {
    console.log(error)
  }
  if(facLogin){
    if(facLogin.password==password)
      return res.send({msg:"Login Successfully",user:facLogin});
    else 
      return res.send({msg:"Password is incorrect"});
  }
  else{
    return res.send({err:"Please Signup"});
  }
}
exports.Facultyregistration = Facultyregistration
exports.getAllFaculty = getAllFaculty
exports.facultyLogin = facultyLogin