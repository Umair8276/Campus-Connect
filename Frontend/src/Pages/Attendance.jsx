import React, { useContext, useEffect, useMemo, useState } from "react";
import { Box, Button, Toolbar, Typography } from "@mui/material";
import AttandanceList from "../Components/common/AttendanceList.jsx";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../Context/AuthContext.jsx";
import TextField from '@mui/material/TextField';
import moment from 'moment';

const Attendance = () => {
  const {user} = useContext(AppContext);
  const [data,setData] = useState([])
  const navigate = useNavigate();
  const [search,setSearch] = useState("")
  const [query,setQuery] = useState("")
  const getFacultyAttendence = () => {
     axios.get(`http://localhost:5000/api/att/getfacatt/${user._id}`)
     .then(res => {
      console.log(res.data)
      setData(res.data.facAtt)
     })
     .catch(err => {
      console.log(err)
     })
  }
  useEffect( () => {
    getFacultyAttendence()
  },[])
  


  const handleSearch = (e) => {
    console.log(e.target.value)
    let searchInp = e.target.value
    // setQuery(e.target.value)
    let filterData;
    if(searchInp){
       filterData = data.filter( (data) => {
       return moment(data.createdAt).format('DD-MM-YYYY').includes(searchInp)
     })
    }
    console.log("filterData" , filterData)
    if(filterData?.length > 1)
       setData(filterData)
    else
       getFacultyAttendence()
       
  }

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

        <Box
      component="form"
      sx={{
        '& > :not(style)': { ml: 1,width:"150ch"},
      }}
      noValidate
      
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Search by date"  variant="outlined" onChange={(e) =>setSearch(e.target.value) } />
    </Box>
        {
          data && data.length > 0 && data
          .filter(att => {
            if(search == "") {
              return att
            }
            else if(att.createdAt.toString() == search){
              console.log("att",att)
            }
          }).map((attendance,index)=>(
            <AttandanceList 
              key={index}
              data={attendance}
              date={attendance.createdAt}
              subject={attendance.subject}
              branch = {attendance.branch}
              sem = {attendance.sem}
              present={attendance.present}
              classes={attendance.classes}
              batch = {attendance.batch}
            />
          ))
        }
      </Box>
    </>
  );
};

export default Attendance;
