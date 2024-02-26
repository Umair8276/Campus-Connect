import React, { useContext, useEffect, useState } from 'react';
import { ToggleButton,ToggleButtonGroup } from '@mui/material';
import axios from 'axios'
import { AppContext } from '../../Context/AuthContext';

const MaintainAttendance = ({branch,classes,subject,sem,studentId,facultyId}) => {
    const [color, setColor] = React.useState("");
    const {presentStudent,setPresentStudent,absentStu,setAbsentStu} = useContext(AppContext);
   const {setAttendancePercentage} = useContext(AppContext)

   const presentStudents = (id) => {
      let user = presentStudent.find(stu => stu == id);
      if(user){
        presentStudent.pop(user)
      }
      else
         setPresentStudent([...presentStudent,studentId])
   }

  const absentStudent = (id) => {
    let present = presentStudent.find(stu => stu == id);
    let checkAbs = absentStu.find(stu => stu == id );
    if(checkAbs){
       absentStu.pop(checkAbs);
    }
    else
      setAbsentStu([...absentStu,id]);

    if(present){
      presentStudent.pop(present);
      setAbsentStu([...absentStu,id]);
    }
    else
      setAbsentStu([...absentStu,id]);
  }

    // Mark Attendence
    const handleAttendence = (status) => {
      setColor(status)
    }

  // Get Student Attendence Percentage
  //   const getAttendence = () => {
  //     axios.get(`http://localhost:5000/api/att/getatt/${subject}/${studentId}/${facultyId}`)
  //     .then(res => {
  //      console.log(res.data)
  //      setAttendancePercentage(res.data.calcPercentage)
  //     }).catch(err => {
  //      console.log(err)

  //     })
  //  }
  //  useEffect( () => {
  //    getAttendence()
  //  },[])

 
  return (
    <>
    <ToggleButtonGroup>
    <ToggleButton value={true} onClick={() =>{handleAttendence("present") , presentStudents(studentId)}}  color="success" sx={{color: color=="present" && "green"}}>
    Present
    </ToggleButton>
    <ToggleButton value={false} onClick={() => {handleAttendence("absent"), absentStudent(studentId)} } color="error" sx={{color: color=="absent" && "red"}}>
      Absent
    </ToggleButton>
  </ToggleButtonGroup>
  </>
  )
}
// disabled = {presentStudent.includes(studentId) ? true : absentStu.includes(studentId) ? false : false}

export default MaintainAttendance