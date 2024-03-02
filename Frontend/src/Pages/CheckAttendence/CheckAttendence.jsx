import {
    Box,
    Button,
    IconButton,
    Toolbar,
    Tooltip,
    Typography,
  } from "@mui/material";
  import React, { useState,useEffect, useContext } from "react";
  import InputLabel from "@mui/material/InputLabel";
  import MenuItem from "@mui/material/MenuItem";
  import FormControl from "@mui/material/FormControl";
  import Select from "@mui/material/Select";

  
import { Stack } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MaintainAttendance from "../../Components/common/MaintainAttendance";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
  import { useNavigate } from "react-router-dom";
  import axios from 'axios';
  import { AppContext } from "../../Context/AuthContext";
  import { Oval } from 'react-loader-spinner';

const CheckAttendence = () => {
    const [subject, setSubject] = React.useState("");
    const [classes,setClasses] = useState("")
    const [branch, setBranch] = React.useState("");
    const [sem, setSem] = React.useState("");
    const [students,setStudents] = useState([])
    const [totalStudents,setTotalStudents] = useState("")
    const {user} = useContext(AppContext)
    const {presentStudent,setPresentStudent,absentStu,setAbsentStu} = useContext(AppContext);
    const navigate = useNavigate();
    const [percentage,setPercentage] = useState([])
    const [sub,setSub] = useState();

   

      const engineeringSubjects = [
        {
          branch: 'Computer',
          subjects: [
            { semester: 1, subjects: ['Math', 'Physics', 'Chemistry', 'Introduction to Programming'] },
            { semester: 2, subjects: ['MathI', 'Digital Logic Design', 'Data Structures', 'Electrical Circuits'] },
            { semester: 3, subjects: ['Computer Organization and Architecture', 'Database Management Systems', 'Object-Oriented Programming', 'Discrete Mathematics'] },
            { semester: 4, subjects: ['Algorithms', 'Microprocessors', 'Operating Systems', 'Computer Networks'] },
            // Add more semesters and subjects as needed
          ]
        },
        {
          branch: 'Mechanical Engineering',
          subjects: [
            // Define subjects for each semester in the mechanical engineering branch
            { semester: 1, subjects: ['Math', 'Physics', 'Chemistry', 'Introduction to Programming'] },
            { semester: 2, subjects: ['MathI', 'Digital Logic Design', 'Data Structures', 'Electrical Circuits'] },
            { semester: 3, subjects: ['Computer Organization and Architecture', 'Database Management Systems', 'Object-Oriented Programming', 'Discrete Mathematics'] },
            { semester: 4, subjects: ['Algorithms', 'Microprocessors', 'Operating Systems', 'Computer Networks'] },
          ]
        },
        {
          branch: 'Electronics Engineering',
          subjects: [
            // Define subjects for each semester in the electronics engineering branch
            { semester: 1, subjects: ['Math', 'Physics', 'Chemistry', 'Introduction to Programming'] },
            { semester: 2, subjects: ['MathI', 'Digital Logic Design', 'Data Structures', 'Electrical Circuits'] },
            { semester: 3, subjects: ['Computer Organization and Architecture', 'Database Management Systems', 'Object-Oriented Programming', 'Discrete Mathematics'] },
            { semester: 4, subjects: ['Algorithms', 'Microprocessors', 'Operating Systems', 'Computer Networks'] },
          ]
        },
        {
          branch: 'Civil Engineering',
          subjects: [
            // Define subjects for each semester in the civil engineering branch
            { semester: 1, subjects: ['Math', 'Physics', 'Chemistry', 'Introduction to Programming'] },
            { semester: 2, subjects: ['MathI', 'Digital Logic Design', 'Data Structures', 'Electrical Circuits'] },
            { semester: 3, subjects: ['Computer Organization and Architecture', 'Database Management Systems', 'Object-Oriented Programming', 'Discrete Mathematics'] },
            { semester: 4, subjects: ['Algorithms', 'Microprocessors', 'Operating Systems', 'Computer Networks'] },
          ]
        },
        // Add more branches as needed
      ];
    
      function getSubjects(branch,sem){
        let filterSubjects;
        engineeringSubjects.forEach(sub => {
          if(sub.branch == branch){
            filterSubjects = sub.subjects.filter( semSub => {
              if(semSub.semester == sem){
                console.log("Foreach SemSub" , semSub)
                setSub(semSub);
                return semSub
              }
    
            })
          }
          
        })
        // setSub(filterSubjects)
        return filterSubjects;
       }
    
       useEffect( () => {
        getSubjects(branch,sem)
       },[branch,sem])
    
      
      //  Find All Students Based on branch,class and sem
      const fetchStu = () => {
        axios.get(`http://localhost:5000/api/att/getstu/${branch}/${classes}/${sem}`)
        .then(res => {
          // Sort By Roll No
          res.data.students.sort((a, b) => a.rollNo - b.rollNo);
          console.log("Students : ",res.data.students)
          setStudents(res.data.students)
          setTotalStudents(res.data.students.length)
        })
        .catch(err => {
          console.log(err)
        })
      }

      
  // const getAttPercentage = () => {
  //   const promises = students.map( (item) => {
  //     return axios.get(`http://localhost:5000/api/att/getatt/${item._id}/${subject}`)
  //       .then(res => res.data.calcPercentage)
  //       .catch(err => {
  //         console.log(err);
  //         return null; // or handle error as needed
  //       });
  //   });

  //   Promise.all(promises)
  //     .then(allPercentages => {
  //       // Filter out null values if any
  //       const filteredPercentages = allPercentages.filter(percentage => percentage !== null);
  //       setPercentage(filteredPercentages);
  //     })
  //     .catch(err => {
  //       console.log("Error fetching percentages for all students:", err);
  //       // Handle error as needed
  //     });

  // }

  //  useEffect( () => {
  //   getAttPercentage();
  //   console.log("percentage :",percentage)
  //  },[students.length > 0])


   const calcOverAllPercentage = () => {
     console.log(sub.subjects)
     axios.post("http://localhost:5000/api/att/calperc",{
       subjects:sub.subjects
     }).then(res => {
       console.log(res.data.attendancePercentages[0])
       setPercentage(res.data.attendancePercentages)
     }).catch(err => {
       console.log(err)
     })
  }
    


  return (
 <>
<Box  sx={{
          display: "flex",
          gap: 3,
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Toolbar>
          <Tooltip title="back">
            <IconButton
              onClick={() => navigate("/faculty/attendance", { replace: true })}
              sx={{
                marginLeft: "-2rem",
                marginRight: "1rem",
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
          <Typography fontWeight={450} fontSize={35}>
           Check Student Attendence
          </Typography>
        </Toolbar>
        <Box
          sx={{
            height: "auto",
            bgcolor: "#fff",
            borderRadius: "15px",
            padding: "20px",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "1rem",
              gap:"1rem"
            }}
          >
            <FormControl
              sx={{
                width: "8rem",
              }}
            >
              <InputLabel id="branch">Branch</InputLabel>
              <Select
                labelId="branch"
                value={branch}
                label="branch"
                onChange={(e) =>setBranch(e.target.value)}
              >
                <MenuItem value={"Computer"}>Computer</MenuItem>
                <MenuItem value={"Electronics"}>Electronics</MenuItem>
                <MenuItem value={"Mechanical"}>Mechanical</MenuItem>
                <MenuItem value={"Electronics"}>Electronics</MenuItem>
              </Select>
            </FormControl>

             <FormControl
              sx={{
                width: "8rem",
              }}
            >
              <InputLabel id="classes">Class</InputLabel>
              <Select
                labelId="class"
                value={classes}
                label="class"
                onChange={(e) => setClasses(e.target.value)}
              >
                <MenuItem value={"FE"}>FE</MenuItem>
                <MenuItem value={"SE"}>SE</MenuItem>
                <MenuItem value={"TE"}>TE</MenuItem>
                <MenuItem value={"BE"}>BE</MenuItem>
              </Select>
            </FormControl>

             <FormControl
              sx={{
                width: "8rem",
              }}
            >
              <InputLabel id="batch">Semester</InputLabel>
              {
                        classes=="FE"
                        ?
                        <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={sem}
                        onChange={(e) => setSem(e.target.value)}
                        autoWidth
                        label="Sem"
                    >
                        <MenuItem value={"1"}>1</MenuItem>
                        <MenuItem value={"2"}>2</MenuItem>
                    </Select>
                    :
                    classes == "SE"
                    ?
                    <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={sem}
                    onChange={(e) => setSem(e.target.value)}
                    autoWidth
                    label="Sem"
                >
                    <MenuItem value={"3"}>3</MenuItem>
                    <MenuItem value={"4"}>4</MenuItem>
                </Select>
                :
                classes=="TE"
                ?
                <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={sem}
                onChange={(e) => setSem(e.target.value)}
                autoWidth
                label="Sem"
            >
                <MenuItem value={"5"}>5</MenuItem>
                <MenuItem value={"6"}>6</MenuItem>
            </Select>
            : <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={sem}
            onChange={(e) => setSem(e.target.value)}
            autoWidth
            label="Sem"
        >
            <MenuItem value={"7"}>7</MenuItem>
            <MenuItem value={"8"}>8</MenuItem>
        </Select>

                    }
                    </FormControl>
 
             

            {/* <FormControl
              sx={{
                width: "40%",
              }}
            >
              <InputLabel id="subject">Subject</InputLabel>
              <Select
                    labelId="subject"
                    value={subject}
                    label="subject"
                    onChange={(e) => setSubject(e.target.value)}
                  >
                    {
                      sub?.subjects?.map( (sub,i) => {
                        return (
                          
                             <MenuItem key={i} value={sub}>{sub}</MenuItem>
                         
                        )
                      })
                    }
                  
                  </Select>
            </FormControl> */}

  
            <Button
              variant="contained"
              onClick = {() => {fetchStu(),calcOverAllPercentage()}}
              sx={{
                marginLeft: "auto",
              }}
            >
              Confirm
            </Button>
          </Stack>

          {
             students && students.length > 0 &&
          <Typography
            fontSize={22}
            fontWeight={450}
            margin="3rem 0rem 1rem 0rem"
          >
            Total Student: {totalStudents}
          </Typography>
          }
       
          {
             students && students.length > 0 &&
          <Typography fontSize={22} fontWeight={450} margin="1rem 0rem">
            List of Students
          </Typography>
          }

          <TableContainer
            component={  students && students.length > 0 && Paper}
            sx={{
              overflowY: "scroll",
              height: 400,
            }}
          >
            <Table stickyHeader>
              {
              students && students.length > 0 &&
              <TableHead>
                <TableRow>
                  <TableCell>Roll Number</TableCell>
                  <TableCell>Student Name</TableCell>
                  {/* <TableCell>Attendance</TableCell> */}
                  <TableCell>Percentage</TableCell>
                  <TableCell>Operation</TableCell>
                 
                 
                </TableRow>
              </TableHead>
              }
              <TableBody>
                {percentage && students.map((stu,per,p) => (
                
                  <TableRow
                    key={stu.rollNo}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {stu.rollNo}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {stu.firstName} {stu.lastName}
                    </TableCell>
                    {/* <TableCell>
                      <MaintainAttendance branch = {branch} classes = {classes} subject = {subject} sem = {sem} studentId = {stu._id} facultyId = {user._id}   />
                    </TableCell> */}

                    <TableCell component="th" scope="row" style={{color:percentage && percentage[per]?.averagePercentage < 75 ? "red" : ""}}>
                     {
                      percentage.length > 0
                      ?
                       percentage[per].averagePercentage.toFixed(2)
                      :
                      <Oval
                    visible={true}
                    height="30"
                    width="30"
                    color="#4fa94d"
                   ariaLabel="oval-loading"
                   
                   />
                     }
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Button varient = "contained">Send Mail</Button>
                    </TableCell>

                  </TableRow>
                ))}
                
              </TableBody>
            </Table>
          </TableContainer>

          </Box>
          </Box>

</>
    

  
  );
}

export default CheckAttendence