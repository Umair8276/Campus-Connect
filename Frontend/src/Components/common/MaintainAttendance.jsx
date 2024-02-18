import React, { useContext, useEffect, useState } from 'react';
import { ToggleButton,ToggleButtonGroup } from '@mui/material';
import axios from 'axios'
import { AppContext } from '../../Context/AuthContext';

const MaintainAttendance = ({branch,classes,subject,sem,studentId,facultyId}) => {
    const [color, setColor] = React.useState("");
   const {setAttendancePercentage} = useContext(AppContext)
    // Mark Attendence
    const handleAttendence = (status) => {
      console.log(branch,classes,subject,sem)
      setColor(status)
      axios.post('http://localhost:5000/api/att/createatt',{
        branch,
        classes,
        subject,
        sem,
        status,
        studentId,
        facultyId
      })
      .then(res => {
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      })
    }

  // Get Student Attendence Percentage
    const getAttendence = () => {
      axios.get(`http://localhost:5000/api/att/getatt/${subject}/${studentId}/${facultyId}`)
      .then(res => {
       console.log(res.data)
       setAttendancePercentage(res.data.calcPercentage)
      }).catch(err => {
       console.log(err)

      })
   }
   useEffect( () => {
     getAttendence()
   },[])

 
  return (
    <>
    <ToggleButtonGroup>
    <ToggleButton value={true} onClick={() =>handleAttendence("present")} color="success" sx={{color: color=="present" && "green"}}>
      Present
    </ToggleButton>
    <ToggleButton value={false} onClick={() =>handleAttendence("absent")} color="error" sx={{color: color=="absent" && "red"}}>
      Absent
    </ToggleButton>
  </ToggleButtonGroup>
  </>
  )
}

export default MaintainAttendance