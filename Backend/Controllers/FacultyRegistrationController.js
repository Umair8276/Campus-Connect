
const jwt = require('jsonwebtoken');
const RegisterModal = require("../Modals/RegisterModal")
const JWT_SECRET_KEY = 'Zaid';

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
      if(fac){
        
        return res.send({fac})
      }
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
    if(facLogin.password==password){
      const token = jwt.sign({ userId: facLogin._id }, JWT_SECRET_KEY, { expiresIn: '1h' });
      return res.send({msg:"Login Successfully",user:facLogin,token});

    }
    else 
      return res.send({err:"Password is incorrect"});
  }
  else{
    return res.send({err:"Please Signup"});
  }
}
exports.Facultyregistration = Facultyregistration
exports.getAllFaculty = getAllFaculty
exports.facultyLogin = facultyLogin