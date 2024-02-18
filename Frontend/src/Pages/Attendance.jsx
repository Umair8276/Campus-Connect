import React from "react";
import { Box, Button, Toolbar, Typography } from "@mui/material";
import AttandanceList from "../Components/common/AttendanceList.jsx";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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
          attendance.map((attendance,index)=>(
            <AttandanceList 
              key={index}
              date={attendance.date}
              subject={attendance.subject}
              present={attendance.present}
            />
          ))
        }
      </Box>
    </>
  );
};

export default Attendance;
