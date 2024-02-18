import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
  InputBase,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Slider,
  Divider,
} from "@mui/material";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import {AppContext} from "../Context/AuthContext"
import { Oval } from 'react-loader-spinner'
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import axios from 'axios'

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const steps = [
  "Select Course",
  "Select Subject and batch",
  "Specifications",
  "Preview",
];

const Course = [
  {
    id: 1,
    label: "Computer ",
    value: "Computer",
  },
  {
    id: 2,
    label: "Mechanical",
    value: "Mechanical",
  },
  {
    id: 3,
    label: "Electronics",
    value: "Electronics",
  },
  {
    id: 4,
    label: "Electrical",
    value: "Electrical",
  },
  {
    id: 5,
    label: "Civil",
    value: "Civil",
  },
  {
    id: 6,
    label: "Pharmacy",
    value: "Pharmacy",
  },
  {
    id: 7,
    label: "BSC It",
    value: "BSC It",
  },

];

const CreateAssignment = () => {
  const navigate = useNavigate();
  const {user} = useContext(AppContext)
  // const [percentage, setPercentage] = React.useState("70");
  const [branch,setBranch] = useState("")
  const [classes,setClasses] = useState("")
  const [subject,setSubject] = useState("")
  const [startDate,setStartDate] = useState("")
  const [endDate,setEndDate] = useState("")
  const [title,setTitle] = useState("")
  const [startTime,setStartTime] = useState("")
  const [endTime,setEndTime] = useState("")
  const [file,setFile] = useState("");
  const [sem,setSem] = useState("")
  const [sub,setSub] = useState();
  const [loading,setLoading] = useState()


  const [activeStep, setActiveStep] = React.useState(0);
  const [batch, setBatch] = React.useState("");

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const ChangeBatch = (event) => {
    setBatch(event.target.value);
  }

// Define an array of objects representing semester subjects in various engineering branches
const engineeringSubjects = [
  {
    branch: 'Computer',
    subjects: [
      { semester: 1, subjects: ['Mathematics-I', 'Physics', 'Chemistry', 'Introduction to Programming'] },
      { semester: 2, subjects: ['Mathematics-II', 'Digital Logic Design', 'Data Structures', 'Electrical Circuits'] },
      { semester: 3, subjects: ['Computer Organization and Architecture', 'Database Management Systems', 'Object-Oriented Programming', 'Discrete Mathematics'] },
      { semester: 4, subjects: ['Algorithms', 'Microprocessors', 'Operating Systems', 'Computer Networks'] },
      // Add more semesters and subjects as needed
    ]
  },
  {
    branch: 'Mechanical Engineering',
    subjects: [
      // Define subjects for each semester in the mechanical engineering branch
      { semester: 1, subjects: ['Mathematics-I', 'Physics', 'Chemistry', 'Introduction to Programming'] },
      { semester: 2, subjects: ['Mathematics-II', 'Digital Logic Design', 'Data Structures', 'Electrical Circuits'] },
      { semester: 3, subjects: ['Computer Organization and Architecture', 'Database Management Systems', 'Object-Oriented Programming', 'Discrete Mathematics'] },
      { semester: 4, subjects: ['Algorithms', 'Microprocessors', 'Operating Systems', 'Computer Networks'] },
    ]
  },
  {
    branch: 'Electronics Engineering',
    subjects: [
      // Define subjects for each semester in the electronics engineering branch
      { semester: 1, subjects: ['Mathematics-I', 'Physics', 'Chemistry', 'Introduction to Programming'] },
      { semester: 2, subjects: ['Mathematics-II', 'Digital Logic Design', 'Data Structures', 'Electrical Circuits'] },
      { semester: 3, subjects: ['Computer Organization and Architecture', 'Database Management Systems', 'Object-Oriented Programming', 'Discrete Mathematics'] },
      { semester: 4, subjects: ['Algorithms', 'Microprocessors', 'Operating Systems', 'Computer Networks'] },
    ]
  },
  {
    branch: 'Civil Engineering',
    subjects: [
      // Define subjects for each semester in the civil engineering branch
      { semester: 1, subjects: ['Mathematics-I', 'Physics', 'Chemistry', 'Introduction to Programming'] },
      { semester: 2, subjects: ['Mathematics-II', 'Digital Logic Design', 'Data Structures', 'Electrical Circuits'] },
      { semester: 3, subjects: ['Computer Organization and Architecture', 'Database Management Systems', 'Object-Oriented Programming', 'Discrete Mathematics'] },
      { semester: 4, subjects: ['Algorithms', 'Microprocessors', 'Operating Systems', 'Computer Networks'] },
    ]
  },
  // Add more branches as needed
];

// Accessing information from the array
// console.log('Computer Engineering - Subjects in Semester 1:', engineeringSubjects[0].subjects[0].subjects.join(', '));
// console.log('Mechanical Engineering - Subjects in Semester 1:', engineeringSubjects[1].subjects[0].subjects.join(', '));
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
    console.log(batch.substr(0,3))
   getSubjects(branch,sem)
   },[branch,sem])


  const postAssignment = () => {
    axios.post("http://localhost:5000/api/ass/assignment",{
      faculty:user._id,
      subject,
      content:title,
      sem,
      branch,
      file,
      lastDate:endDate
    }).then(res => {
       console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
     
    handleNext()
  }

  const handleUpload = async (url) => {
    setLoading(true)
    const data = new FormData();
    data.append("file", url);
    data.append("upload_preset", "pehzflst");
    data.append("cloud_name", "zaidsiddiqui");
    fetch("https://api.cloudinary.com/v1_1/zaidsiddiqui/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.url);
        setFile(data.url)
        setLoading(false)
      });
      
  };

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
          <Tooltip title="back">
            <IconButton
              onClick={() =>
                navigate("/faculty/assignments", { replace: true })
              }
              sx={{
                marginLeft: "-2rem",
                marginRight: "1rem",
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
          <Typography fontWeight={450} fontSize={35}>
            Create New Assignment
          </Typography>
        </Toolbar>
        <Box
          sx={{
            // minHeight: "25rem",
            bgcolor: "#fff",
            borderRadius: "15px",
            padding: "20px",
            position: "relative",
          }}
        >
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length && (
            <React.Fragment>
              <Box
                sx={{
                  width: "40rem",
                  display: "flex",
                  flexDirection: "column",
                  margin: "auto",
                  gap: 5,
                  marginTop: "5rem",
                }}
              >
                <Typography
                  fontWeight={700}
                  fontSize={36}
                  sx={{ mt: 2, mb: 1 }}
                >
                  Assignment Created Successfully
                </Typography>
                <Typography>
                  New Assignment within {title} with
                  subject {subject} Added Succesfully with the
                  following Name : {title}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    padding: "12px",
                    width: "fit-content",
                    bgcolor: "#2C62EE",
                    margin: "auto",
                  }}
                  fontWeight="light"
                  onClick={() =>
                    navigate("/faculty/assignments", { replace: true })
                  }
                >
                  Back to Dashboard
                </Button>
              </Box>
            </React.Fragment>
          )}
          {activeStep === 0 && (
            <>
              <Box
                sx={{
                  width: "28rem",
                  height: "fit-content",
                  margin: "2rem auto",
                  border: "1px solid #E1E1E1",
                  borderRadius: "8px",
                  padding: "2rem 2rem 1rem 2rem",
                }}
              >
                <Typography fontWeight={500} fontSize={26}>
                  Select Branch and class
                </Typography>
                
                <FormControl
                  fullWidth
                  sx={{
                    margin: "1rem 0rem",
                  }}
                >
                  <InputLabel id="branch">branch</InputLabel>
                  <Select
                    labelId="branch"
                    value={branch}
                    label="branch"
                    onChange={(e) =>setBranch(e.target.value)}
                  >
                    <MenuItem value={"Computer"}>Computer</MenuItem>
                    <MenuItem value={"Mechanical"}>Mechanical</MenuItem>
                    <MenuItem value={"Electrical"}>Electrical</MenuItem>
                    <MenuItem value={"Electronics"}>Electronics</MenuItem>
                  </Select>

                  <FormControl
                  fullWidth
                  sx={{
                    margin: "1rem 0rem",
                  }}
                >
                  <InputLabel id="batch">Class</InputLabel>
                  {
                    branch == "Computer"
                    ?
                    <Select
                    labelId="batch"
                    value={batch}
                   onChange={(e) => ChangeBatch(e)}
                    label="Batch"
                   
                  >
                    <MenuItem value={"FECO"}>FECO</MenuItem>
                    <MenuItem value={"SECO"}>SECO</MenuItem>
                    <MenuItem value={"TECO"}>TECO</MenuItem>
                    <MenuItem value={"BECO"}>BECO</MenuItem>
                  </Select>
                  :
                  branch == "Mechanical"
                  ?
                  <Select
                  labelId="batch"
                  value={batch}
                  onChange={(e) => ChangeBatch(e)}
                  label="Batch"
                
                >
                  <MenuItem value={"FEME"}>FEME</MenuItem>
                  <MenuItem value={"SEME"}>SEME</MenuItem>
                  <MenuItem value={"TEME"}>TEME</MenuItem>
                  <MenuItem value={"BEME"}>BEME</MenuItem>
                </Select>
                :
                branch == "Civil"
                ?
                <Select
                labelId="batch"
                value={batch}
                onChange={(e) => ChangeBatch(e)}
                label="Batch"
               
              >
                <MenuItem value={"FECE"}>FECE</MenuItem>
                <MenuItem value={"SECE"}>SECE</MenuItem>
                <MenuItem value={"TECE"}>TECE</MenuItem>
                <MenuItem value={"BECE"}>BECE</MenuItem>
              </Select>
              :
              branch=="Electronics"
              ?
              <Select
              labelId="batch"
              value={batch}
              onChange={(e) => ChangeBatch(e)}
              label="Batch"
            
            >
              <MenuItem value={"FEET"}>FEET</MenuItem>
              <MenuItem value={"SEET"}>SEET</MenuItem>
              <MenuItem value={"TEET"}>TEET</MenuItem>
              <MenuItem value={"BEET"}>BEET</MenuItem>
            </Select>
            :
            branch == "Pharmacy"
            ?
            <Select
            labelId="batch"
            value={batch}
            onChange={(e) => ChangeBatch(e)}
            label="Batch"
           
          >
            <MenuItem value={"FEPH"}>FEPH</MenuItem>
            <MenuItem value={"SEPH"}>SEPH</MenuItem>
            <MenuItem value={"TEPH"}>TEPH</MenuItem>
            <MenuItem value={"BEPH"}>BEPH</MenuItem>
          </Select>
          :
          branch == "BSC It"
          ?
          <Select
          labelId="batch"
          value={batch}
          onChange={(e) => ChangeBatch(e)}
          label="Batch"
         
        >
          <MenuItem value={"FEIT"}>FEIT</MenuItem>
          <MenuItem value={"SEIT"}>SEIT</MenuItem>
          <MenuItem value={"TEIT"}>TEIT</MenuItem>
          <MenuItem value={"BEIT"}>BEIT</MenuItem>
        </Select>
        :
        <Select
        labelId="batch"
        value={batch}
        onChange={(e) => ChangeBatch(e)}
        label="Batch"
        
      >
        <MenuItem value={"FEET"}>FEET</MenuItem>
        <MenuItem value={"SEET"}>SEET</MenuItem>
        <MenuItem value={"TEET"}>TEET</MenuItem>
        <MenuItem value={"BEET"}>BEET</MenuItem>
      </Select>
}
                </FormControl>

                </FormControl>
              </Box>
            </>
          )}
          {activeStep === 1 && (
            <>
              <Box
                sx={{
                  width: "28rem",
                  height: "content-fit",
                  margin: "2rem auto",
                  border: "1px solid #E1E1E1",
                  borderRadius: "8px",
                  padding: "2rem 2rem 1rem 2rem",
                }}
              >
                  <Typography fontWeight={500} fontSize={26}>
                  Select Sem
                </Typography>
                <FormControl
                  fullWidth
                  sx={{
                    margin: "1rem 0rem",
                  }}
                >
                  <InputLabel id="batch">Sem</InputLabel>
                 
                    {

                      batch.substr(0,2) == "FE"
                      ?
                      <Select
                    labelId="sem"
                    value={sem}
                    label="sem"
                    onChange={(e) => setSem(e.target.value)}
                  >
                     <MenuItem value={"1"}>1</MenuItem>
                        <MenuItem value={"2"}> 2</MenuItem>
                    </Select>
                      
                      :

                      batch.substr(0,2) == "SE"
                      ?
                      <Select
                      labelId="sem"
                      value={sem}
                      label="sem"
                      onChange={(e) => setSem(e.target.value)}
                    >
                       <MenuItem value={"3"}>3</MenuItem>
                          <MenuItem value={"4"}> 4</MenuItem>
                      </Select>
                      :

                      batch.substr(0,2) == "TE"
                      ?
                      <Select
                      labelId="sem"
                      value={sem}
                      label="sem"
                      onChange={(e) => setSem(e.target.value)}
                    >
                       <MenuItem value={"5"}>5</MenuItem>
                          <MenuItem value={"6"}> 6</MenuItem>
                      </Select>
                      :

                      batch.substr(0,2) == "BE"
                      ?
                      <Select
                      labelId="sem"
                      value={sem}
                      label="sem"
                      onChange={(e) => setSem(e.target.value)}
                    >
                       <MenuItem value={"7"}>7</MenuItem>
                          <MenuItem value={"8"}> 8</MenuItem>
                      </Select>
                      :

                      <></>
                    }
                  
                </FormControl>


                <Typography fontWeight={500} fontSize={26}>
                  Select Subject
                </Typography>
                <FormControl
                  fullWidth
                  sx={{
                    margin: "1rem 0rem",
                  }}
                >
                  <InputLabel id="batch">Subject</InputLabel>
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
                </FormControl>
           
              </Box>
            </>
          )}
          {activeStep === 2 && (
            <>
              <Box
                sx={{
                  width: "28rem",
                  // height: "fit-content",
                  margin: "2rem auto",
                  border: "1px solid #E1E1E1",
                  borderRadius: "8px",
                  padding: "2rem 2rem 1rem 2rem",
                  flexDirection: "column",
                }}
              >
                <Typography fontWeight={500} fontSize={26}>
                  Assignment Specifications
                </Typography>
                <Paper
                  component="form"
                  elevation={0}
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: "auto",
                    bgcolor: "#F1F1F1",
                    borderRadius: "8px",
                    margin: "2rem 0rem",
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    inputProps={{ "aria-label": "title" }}
                    type="text"
                  />
                </Paper>
        
              
                <Typography
                  marginTop={2}
                  fontWeight={400}
                  fontSize={18}
                  marginBottom={1}
                >
                  Schedule
                </Typography>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Paper
                    component="form"
                    elevation={0}
                    sx={{
                      p: "2px 4px",
                      display: "flex",
                      alignItems: "center",
                      width: "fit-content",
                      bgcolor: "#F1F1F1",
                      borderRadius: "8px",
                    }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Enter Date"
                      value={startDate}
                      inputProps={{ "aria-label": "search course" }}
                      onChange={(e) => setStartDate(e.target.value)}
                      type="date"
                    />
                  </Paper>
                  <Paper
                    component="form"
                    elevation={0}
                    sx={{
                      p: "2px 4px",
                      display: "flex",
                      alignItems: "center",
                      width: "fit-content",
                      bgcolor: "#F1F1F1",
                      borderRadius: "8px",
                    }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Enter Due Date"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      inputProps={{ "aria-label": "search course" }}
                      type="time"
                    />
                  </Paper>
                </Stack>
                <Typography
                  marginTop={2}
                  fontWeight={400}
                  fontSize={18}
                  marginBottom={1}
                >
                  Due Date
                </Typography>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Paper
                    component="form"
                    elevation={0}
                    sx={{
                      p: "2px 4px",
                      display: "flex",
                      alignItems: "center",
                      width: "fit-content",
                      bgcolor: "#F1F1F1",
                      borderRadius: "8px",
                    }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Total Marks"
                      inputProps={{ "aria-label": "search course" }}
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      type="date"
                    />
                  </Paper>
                  <Paper
                    component="form"
                    elevation={0}
                    sx={{
                      p: "2px 4px",
                      display: "flex",
                      alignItems: "center",
                      width: "fit-content",
                      bgcolor: "#F1F1F1",
                      borderRadius: "8px",
                    }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Total Marks"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      inputProps={{ "aria-label": "search course" }}
                      type="time"
                    />
                  </Paper>
                </Stack>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                  sx={{
                    mt: "2rem",
                    marginRight:"10px"
                  }}
                >
                  Upload file
                  {
                  loading
                  ?
                  <Oval
                    visible={true}
                    height="20"
                    width="20"
                    color="#4fa94d"
                   ariaLabel="oval-loading"
                  
                   />
                   :
                   loading==false
                   ?
                   <DownloadDoneIcon color="green"/>
                   :
                   <></>
                }
                  <VisuallyHiddenInput type="file" onChange={(e)=> handleUpload(e.target.files[0])} />
                </Button> 
             
              </Box>
            </>
          )}
          {activeStep === 3 && (
            <>
              <Box
                sx={{
                  width: "28rem",
                  height: "fit-content",
                  margin: "2rem auto",
                  border: "1px solid #E1E1E1",
                  borderRadius: "8px",
                  padding: "2rem 2rem 1rem 2rem",
                  flexDirection: "column",
                }}
              >
                <Typography fontWeight={500} fontSize={26}>
                  Preview
                </Typography>
                <Divider />
                <Typography
                  fontWeight={550}
                  mt={2}
                  fontSize={20}
                  marginBottom={4}
                >
                 {subject}
                </Typography>
                <Typography
                  sx={{
                    color: "#9A9A9A",
                  }}
                >
                  Branch : {branch}
                </Typography>
                <Typography
                  sx={{
                    color: "#9A9A9A",
                  }}
                >
                  Subject : {subject}
                </Typography>
                <Typography
                  sx={{
                    color: "#9A9A9A",
                  }}
                >
                  class : {sem}
                </Typography>
                {/* <Typography fontSize={18} m='1rem 0rem' fontWeight={450}>Total Marks : 50</Typography> */}
                <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            gap:(5)
          }}
        >
          {/* <Typography fontSize={16}>Passing Percentage</Typography>
          <Typography color="#3D70F5">70%</Typography> */}
        </Stack>
        <Typography
                  marginTop={2}
                  fontWeight={400}
                  fontSize={18}
                  marginBottom={1}
                >
                  Schedule
                </Typography>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Paper
                    component="form"
                    elevation={0}
                    sx={{
                      p: "8px 10px",
                      display: "flex",
                      alignItems: "center",
                      width: "fit-content",
                      bgcolor: "#F1F1F1",
                      borderRadius: "8px",
                      gap:'1rem',
                      alignItems: "center",
                    }}
                  >
                    {startDate}<CalendarMonthIcon/>
                  </Paper>
                  <Paper
                     component="form"
                     elevation={0}
                     sx={{
                       p: "8px 10px",
                       display: "flex",
                       alignItems: "center",
                       width: "fit-content",
                       bgcolor: "#F1F1F1",
                       borderRadius: "8px",
                       gap:'1rem',
                       alignItems: "center",
                      }}
                  >
                   {startTime}<AccessTimeFilledIcon/>
                  </Paper>
                </Stack>
                <Typography
                  marginTop={2}
                  fontWeight={400}
                  fontSize={18}
                  marginBottom={1}
                >
                  Due Date
                </Typography>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                 <Paper
                    component="form"
                    elevation={0}
                    sx={{
                      p: "8px 10px",
                      display: "flex",
                      alignItems: "center",
                      width: "fit-content",
                      bgcolor: "#F1F1F1",
                      borderRadius: "8px",
                      gap:'1rem',
                      alignItems: "center",
                    }}
                  >
                    {endDate}<CalendarMonthIcon/>
                  </Paper>
                  <Paper
                     component="form"
                     elevation={0}
                     sx={{
                       p: "8px 10px",
                       display: "flex",
                       alignItems: "center",
                       width: "fit-content",
                       bgcolor: "#F1F1F1",
                       borderRadius: "8px",
                       gap:'1rem',
                       alignItems: "center",
                      }}
                  >
                   {endTime}<AccessTimeFilledIcon/>
                  </Paper>
                </Stack>
              </Box>
            </>)}
          {activeStep !== steps.length && (
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent:"center",
                  alignItems:"center",
                  pt: 2,
                  position: "absolute",
                  bottom: 0,
                 
                }}
              >
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
               
                  {activeStep === steps.length - 1 ?
                  <Button onClick={postAssignment}>Finish</Button>
                 : 
                 <Button onClick={handleNext}>Next</Button>
                 }
               
              </Box>
            </div>
          )}
        </Box>
      </Box>
    </>
  );
};

export default CreateAssignment;
