import {
    Box,
    Button,
    IconButton,
    Toolbar,
    Tooltip,
    Typography,
  } from "@mui/material";
  import React, { useState, useEffect, useContext } from "react";
  import InputLabel from "@mui/material/InputLabel";
  import MenuItem from "@mui/material/MenuItem";
  import FormControl from "@mui/material/FormControl";
  import Select from "@mui/material/Select";
  
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import { Stack } from "@mui/material";
  import Table from "@mui/material/Table";
  import TableBody from "@mui/material/TableBody";
  import TableCell from "@mui/material/TableCell";
  import TableContainer from "@mui/material/TableContainer";
  import TableHead from "@mui/material/TableHead";
  import TableRow from "@mui/material/TableRow";
  import Paper from "@mui/material/Paper";
//   import MaintainAttendance from "../../Components/common/MaintainAttendance";
  import ArrowBackIcon from "@mui/icons-material/ArrowBack";
  import { useNavigate } from "react-router-dom";
  import axios from "axios";
  import { AppContext } from "../Context/AuthContext";
  import { Oval } from "react-loader-spinner";
  import Avatar from '@mui/material/Avatar';
  
  
  const StudentAttendence = () => {
    const [subject, setSubject] = React.useState("");
    const [classes, setClasses] = useState("");
    const [branch, setBranch] = React.useState("");
    const [sem, setSem] = React.useState("");
    const [students, setStudents] = useState([]);
    const [totalStudents, setTotalStudents] = useState("");
    const { user } = useContext(AppContext);
    const { presentStudent, setPresentStudent, absentStu, setAbsentStu } =
      useContext(AppContext);
    const navigate = useNavigate();
    const [endYear, setEndyear] = React.useState("");
    const [percentage, setPercentage] = useState([]);
    const [sub, setSub] = useState();
    const [allStudents,setAllStudents] = useState("")
    const [error, setError] = useState("");
    const [id,setId] = useState("");
    const [attendence,setAttendence] = useState([])
    const [rollNo,setRollNo] = useState("")
    const [singleStu,setSingleStu] = useState("")
  
    const engineeringSubjects = [
      {
        branch: "Computer",
        subjects: [
          {
            semester: 1,
            subjects: [
              "Math",
              "Physics",
              "Chemistry",
              "Introduction to Programming",
            ],
          },
          {
            semester: 2,
            subjects: [
              "MathI",
              "Digital Logic Design",
              "Data Structures",
              "Electrical Circuits",
            ],
          },
          {
            semester: 3,
            subjects: [
              "Computer Organization and Architecture",
              "Database Management Systems",
              "Object-Oriented Programming",
              "Discrete Mathematics",
            ],
          },
          {
            semester: 4,
            subjects: [
              "Algorithms",
              "Microprocessors",
              "Operating Systems",
              "Computer Networks",
            ],
          },
          {
            semester: 5,
            subjects: [
              "TCS",
              "DWM",
              "SE",
              "Computer Networks",
              "AI"
            ],
          },
          {
            semester: 6,
            subjects: [
              "IP",
              "ML",
              "MC",
              "CSS",
            ],
          },
          {
            semester: 7,
            subjects: [
              "SPCC",
              "CCl",
              "IR",
              "BDA ",
            ],
          },
          {
            semester: 8,
            subjects: [
              "DC",
              "DL",
              "SMA",
              "EDM",
            ],
          },
        ],
      },
      {
        branch: "Mechanical Engineering",
        subjects: [
          // Define subjects for each semester in the mechanical engineering branch
          {
            semester: 1,
            subjects: [
              "Math",
              "Physics",
              "Chemistry",
              "Introduction to Programming",
            ],
          },
          {
            semester: 2,
            subjects: [
              "MathI",
              "Digital Logic Design",
              "Data Structures",
              "Electrical Circuits",
            ],
          },
          {
            semester: 3,
            subjects: [
              "Computer Organization and Architecture",
              "Database Management Systems",
              "Object-Oriented Programming",
              "Discrete Mathematics",
            ],
          },
          {
            semester: 4,
            subjects: [
              "Algorithms",
              "Microprocessors",
              "Operating Systems",
              "Computer Networks",
            ],
          },
        ],
      },
      {
        branch: "Electronics Engineering",
        subjects: [
          // Define subjects for each semester in the electronics engineering branch
          {
            semester: 1,
            subjects: [
              "Math",
              "Physics",
              "Chemistry",
              "Introduction to Programming",
            ],
          },
          {
            semester: 2,
            subjects: [
              "MathI",
              "Digital Logic Design",
              "Data Structures",
              "Electrical Circuits",
            ],
          },
          {
            semester: 3,
            subjects: [
              "Computer Organization and Architecture",
              "Database Management Systems",
              "Object-Oriented Programming",
              "Discrete Mathematics",
            ],
          },
          {
            semester: 4,
            subjects: [
              "Algorithms",
              "Microprocessors",
              "Operating Systems",
              "Computer Networks",
            ],
          },
        ],
      },
      {
        branch: "Civil Engineering",
        subjects: [
          // Define subjects for each semester in the civil engineering branch
          {
            semester: 1,
            subjects: [
              "Math",
              "Physics",
              "Chemistry",
              "Introduction to Programming",
            ],
          },
          {
            semester: 2,
            subjects: [
              "MathI",
              "Digital Logic Design",
              "Data Structures",
              "Electrical Circuits",
            ],
          },
          {
            semester: 3,
            subjects: [
              "Computer Organization and Architecture",
              "Database Management Systems",
              "Object-Oriented Programming",
              "Discrete Mathematics",
            ],
          },
          {
            semester: 4,
            subjects: [
              "Algorithms",
              "Microprocessors",
              "Operating Systems",
              "Computer Networks",
            ],
          },
          {
            semester: 5,
            subjects: [
              "TCS",
              "DWM",
              "SE",
              "Computer Networks",
              "AI"
            ],
          },
          {
            semester: 6,
            subjects: [
              "IP",
              "ML",
              "MC",
              "CSS",
            ],
          },
          {
            semester: 7,
            subjects: [
              "SPCC",
              "CCl",
              "IR",
              "BDA ",
            ],
          },
          {
            semester: 8,
            subjects: [
              "DC",
              "DL",
              "SMA",
              "EDM",
            ],
          },
        ],
      },
      // Add more branches as needed
    ];
  
    function getSubjects(branch, sem) {
      let filterSubjects;
      engineeringSubjects.forEach((sub) => {
        if (sub.branch == branch) {
          filterSubjects = sub.subjects.filter((semSub) => {
            if (semSub.semester == sem) {
              console.log("Foreach SemSub", semSub);
              setSub(semSub);
              return semSub;
            }
          });
        }
      });
      // setSub(filterSubjects)
      return filterSubjects;
    }
  
    useEffect(() => {
      getSubjects(branch, sem);
    }, [branch, sem]);
  
    //  Find All Students Based on branch,class and sem
    
  
    const calcAttPercentage = () => {
      console.log(sem)
      console.log(sub)
      axios
        .post("http://localhost:5000/api/att/getatt", {
          subjects: sub.subjects,
          sem:sem,
          id
        })
        .then((res) => {
          console.log("Att",res.data.attendancePercentages);  
          setAttendence(res.data.attendancePercentages)        
        })
        .catch((err) => {
          console.log(err);
        });
    };


    const getStudents = () => {
      axios.get(`http://localhost:5000/api/stu/gettotalstu/${branch}/${endYear}`)
      .then(res  => {
        console.log(res.data)
        setAllStudents(res.data.students)
      }).catch(err => {
        console.log(err)
      })
    }

    const getSingleStudent = () => {
      axios.get(`http://localhost:5000/api/stu/getstudent/${id}`)
      .then(res => {
        console.log(res.data.student)
        setSingleStu(res.data.student);
      })
      .catch(err => {
        console.log(err)
      })
    }

    useEffect( () => {
      getStudents();
    },[branch,endYear])
  
    return (
      <>
        <Box
          sx={{
            display: "flex",
            // gap: 3,
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
                gap: "1rem",
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
                  onChange={(e) => setBranch(e.target.value)}
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
                <InputLabel id="batch">Semester</InputLabel>
             
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
                    <MenuItem value={"3"}>3</MenuItem>
                    <MenuItem value={"4"}>4</MenuItem>
                    <MenuItem value={"5"}>5</MenuItem>
                    <MenuItem value={"6"}>6</MenuItem>
                    <MenuItem value={"7"}>7</MenuItem>
                    <MenuItem value={"8"}>8</MenuItem>
                  </Select>
               
              </FormControl>
  
              <FormControl
                sx={{
                  width: "40%",
                }}
              >
                <InputLabel id="endYear">Batch</InputLabel>
                <Select
                  labelId="EndYear"
                  value={endYear}
                  label="endYear"
                  onChange={(e) => {setEndyear(e.target.value)}}
                >
                  <MenuItem value="2020">2020 </MenuItem>
                  <MenuItem value="2021">2021 </MenuItem>
                  <MenuItem value="2022">2022 </MenuItem>
                  <MenuItem value="2023">2023 </MenuItem>
                  <MenuItem value="2024">2024 </MenuItem>
                  <MenuItem value="2025">2025</MenuItem>
                  <MenuItem value="2026">2026</MenuItem>
                  <MenuItem value="2027">2027</MenuItem>
                  <MenuItem value="2028">2028</MenuItem>
                  <MenuItem value="2029">2029</MenuItem>
                  <MenuItem value="2030">2030</MenuItem>
                </Select>
              </FormControl>


              
              <FormControl
                sx={{
                  width: "8rem",
                }}
              >
                <InputLabel id="classes">Roll No</InputLabel>
                <Select
                  labelId="class"
                  value={classes}
                  label="class"
                  onChange={(e) => setClasses(e.target.value)}
                >
  {
  allStudents.length > 0 &&
  allStudents.map((stu, i) => {
    return (
      <MenuItem key={stu._id} value={stu.rollNo} onClick={() => setId(stu._id)} onChange={(e) => setRollNo(e.target.value)}>
        {stu.rollNo}
      </MenuItem>
    )
  })
}
                </Select>
              </FormControl>
  
           
  
              <Button
                variant="contained"
                onClick={() => {
                  // fetchStu(), calcOverAllPercentage();
                  getSingleStudent()
                  calcAttPercentage()
                }}
                
              >
                Confirm
              </Button>
            </Stack>
  
            {attendence && attendence.length > 0  && (
              <Typography
                fontSize={22}
                fontWeight={450}
                margin="3rem 0rem 1rem 0rem"
              >
                SEM: {sem}
              </Typography>
            )}
  
            { attendence && attendence.length > 0   && (
              <Typography fontSize={22} fontWeight={450} margin="1rem 0rem">
                 Student Details
              </Typography>
            )}
  
            <TableContainer
              component={  attendence && attendence.length > 0  && Paper}
              sx={{
                overflowY: "scroll",
                height: 130,
              }}
            >
              <Table stickyHeader> 
                {  attendence && attendence.length > 0 &&  (
                  <TableHead>
                    <TableRow>
                      <TableCell>Profile</TableCell>
                      <TableCell>Roll Number</TableCell>
                      <TableCell>Student Name</TableCell>
                      <TableCell>Percentage</TableCell>
                      {/* <TableCell>Operation</TableCell> */}
                    </TableRow>
                  </TableHead>
                )}
                <TableBody>
                  { attendence.length > 0  ? (
                   
                      <TableRow
                        key={singleStu._id}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          <Avatar
                            alt="Profile Photo"
                            src={singleStu?.profile}
                            sx={{ width: 35, height: 35 }}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {singleStu.rollNo}
                        </TableCell>
  
                        <TableCell component="th" scope="row">
                          {singleStu.firstName} {singleStu.lastName}
                        </TableCell>
                        {/* <TableCell>
                        <MaintainAttendance branch = {branch} classes = {classes} subject = {subject} sem = {sem} studentId = {stu._id} facultyId = {user._id}   />
                      </TableCell> */}
  
                        <TableCell
                          component="th"
                          scope="row"
                         
                        >
                          {attendence.length > 0 ? (
                             attendence[0].averagePercentage.toFixed(2)
                          ) : (
                            <Oval
                              visible={true}
                              height="30"
                              width="30"
                              color="#4fa94d"
                              ariaLabel="oval-loading"
                            />
                          )}
                        </TableCell>
                      
                      </TableRow>
                   
                  ) : (
                    <h1>{error}</h1>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </>
    );
  };
  
  export default StudentAttendence;
  