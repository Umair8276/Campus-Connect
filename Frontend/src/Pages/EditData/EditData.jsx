import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import axios from "axios";
import { useState,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditData() {
  const {id} =useParams();
  const navigate = useNavigate()
  const [user,setUser] = useState({
    firstName:"",
    lastName:"",
    branch:"",
    startYear:"",
    endYear:"",
    totalFees:"",
    feesPaid:"",
    mobileNo:"",
    stu_class:"",
    currentSem:"",
    rollNo:"",
    address:"",
    state:"",
    city:"",
    district:"",
    pincode:"",
    oldEmail:""
  })
  const handleChange = (e) => {
     let value = e.target.value;
     let name = e.target.name;
     setUser({...user,[name]:value})
  }
  const fetchData = () => {
    console.log(user)
    axios.get(`http://localhost:5000/api/stu/getstudent/${id}`)
    .then(res => {
      console.log(res.data)
      setUser(res.data.student)
    }).catch(err => {
      console.log(err)
    })
  }
  
  React.useEffect( () => {
    fetchData()
  },[])

  const updateStudent = () => {
    axios.put(`http://localhost:5000/api/stu/update/${id}`,{
      ...user
    })
    .then(res => {
      console.log(res.data)
      toast.success("Student details Updated Successfully", {
        autoClose: 2000, 
      })
      setTimeout( () => {
        navigate("/clerk/students")
      },2000)
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <>
    <Box>
      <Typography fontWeight={550} fontSize={20} marginBottom={4}>Edit Student Details</Typography>
      <TextField id="outlined-basic" label="First Name" name='firstName' value={user.firstName} onChange={(e) => handleChange(e)} variant="outlined" sx={{m:1}} />
      <TextField id="outlined-basic" label="Last Name" name="lastName" value={user.lastName} onChange={(e) => handleChange(e)} variant="outlined" sx={{m:1}} />
      <TextField id="outlined-basic" label="Branch" name="branch" value={user.branch} onChange={(e) => handleChange(e)} variant="outlined" sx={{m:1}} />
      <TextField id="outlined-basic" label="Class" name="stu_class" value={user.stu_class} onChange={(e) => handleChange(e)} variant="outlined" sx={{m:1}} />
      <TextField id="outlined-basic" label="Address" name="address" value={user.address} onChange={(e) => handleChange(e)} variant="outlined" sx={{m:1}} />
      <TextField id="outlined-basic" label="State" name="state" value={user.state} onChange={(e) => handleChange(e)} variant="outlined" sx={{m:1}} />
      <TextField id="outlined-basic" label="City" name="city" value={user.city} onChange={(e) => handleChange(e)} variant="outlined" sx={{m:1}} />
      <TextField id="outlined-basic" label="District" name="district" value={user.district} onChange={(e) => handleChange(e)} variant="outlined" sx={{m:1}} />
      <TextField id="outlined-basic" label="Start Year" name="startYear" value={user.startYear} onChange={(e) => handleChange(e)} variant="outlined" sx={{m:1}} />
      <TextField id="outlined-basic" label="Graduation Year" name="endYear" value={user.endYear} onChange={(e) => handleChange(e)} variant="outlined" sx={{m:1}} />
      <TextField id="outlined-basic" label="Total Fees" name="totalFees" value={user.totalFees} onChange={(e) => handleChange(e)} variant="outlined" sx={{m:1}} />
      <TextField id="outlined-basic" label="Fees Paid" name="feesPaid" value={user.feesPaid} onChange={(e) => handleChange(e)} variant="outlined" sx={{m:1}} />
      <TextField id="outlined-basic" label="Mobile No" name="mobileNo" value={user.mobileNo} onChange={(e) => handleChange(e)} variant="outlined" sx={{m:1}} />
      <TextField id="outlined-basic" label="Roll No" name="rollNo" value={user.rollNo} onChange={(e) => handleChange(e)} variant="outlined" sx={{m:1}} />
      <TextField id="outlined-basic" label="Sem" name="currentSem" value={user.currentSem} onChange={(e) => handleChange(e)} variant="outlined" sx={{m:1}} />
      <TextField id="outlined-basic" label="old Email" name="oldEmail" value={user.oldEmail} onChange={(e) => handleChange(e)} variant="outlined" sx={{m:1}} />
      <TextField id="outlined-basic" label="New Email" name="newEmail" value={user.newEmail} onChange={(e) => handleChange(e)} variant="outlined" sx={{m:1}} />
          </Box>
          <Box style={{width:"100%",display:"flex",justifyContent:"center"}}>

          <Button variant="contained" onClick={() => updateStudent()}>Submit</Button>       
          </Box>
             </>
  );
}