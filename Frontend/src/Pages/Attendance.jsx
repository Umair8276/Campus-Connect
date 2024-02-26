import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Toolbar, Typography } from "@mui/material";
import AttandanceList from "../Components/common/AttendanceList.jsx";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../Context/AuthContext.jsx";

const attendance = [
  {
    date:'Mon 25th July 2023',
    subject:'Data Structure & Alogorithm',
    present:66,
  },
  {
    date:'Tue 26th July 2023',
    subject:'Data Structure & Alogorithm',
    present:60,
  },
  {
    date:'Wed 27th July 2023',
    subject:'Data Structure & Alogorithm',
    present:65,
  },
  {
    date:'Thus 28th July 2023',
    subject:'Data Structure & Alogorithm',
    present:75,
  },
  {
    date:'Fri 29th July 2023',
    subject:'Data Structure & Alogorithm',
    present:46,
  },
]
const Attendance = () => {
  const {user} = useContext(AppContext);
  const [data,setData] = useState([])
  const navigate = useNavigate();
  const getFacultyAttendence = () => {
     axios.get(`http://localhost:5000/api/att/getfacatt/${user._id}`)
     .then(res => {
      console.log("Attendence ",res.data.facAtt)
      setData(res.data.facAtt)
     })
     .catch(err => {
      console.log(err)
     })
  }
  useEffect( () => {
    getFacultyAttendence()
  },[])

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Toolbar>
          <Typography fontWeight={450} fontSize={35}>
            Attendance
          </Typography>
          <Button
            sx={{
              marginLeft: "auto",
            }}
            variant="contained"
            startIcon={<AddIcon />}
            onClick={()=>navigate('/faculty/create-attendance',{replace:true})}
          >
            Create
          </Button>
        </Toolbar>
        {
          data.map((attendance,index)=>(
            <AttandanceList 
              key={index}
              data={attendance}
              date={attendance.createdAt}
              subject={attendance.subject}
              branch = {attendance.branch}
              sem = {attendance.sem}
              present={attendance.present}
              classes={attendance.classes}
            />
          ))
        }
      </Box>
    </>
  );
};

export default Attendance;
