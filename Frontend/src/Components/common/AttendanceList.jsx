import React, { useContext, useEffect,useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from 'moment';
import axios from "axios"
import { AppContext } from "../../Context/AuthContext";

const AttendanceList = ({date,subject,present,branch,sem,classes,data,batch}) => {
  const [open, setOpen] = React.useState(false);
  const absent = 75 - present;
  const [students,setStudents] = useState([])
  const [totalStudents,setTotalStudents] = useState("")
  const {user} = useContext(AppContext)
 
  const handleClick = () => {
    setOpen(!open);
  };
  const [attendance, setAttendance] = React.useState([false]);

  // Function to toggle attendance for a specific row
  const handleAttendance = (index) => {
    const newAttendance = [...attendance];
    newAttendance[index] = !newAttendance[index];
    setAttendance(newAttendance);
  };


  function createData(rollNumber, name) {
    return { rollNumber, name };
  }

  const rows = [
    createData("20CO01", "Test"),
    createData("20CO02", "Test"),
    createData("20CO03", "Test"),
    createData("20CO04", "Test"),
    createData("20CO05", "Test"),
    createData("20CO06", "Test"),
    createData("20CO07", "Test"),
    createData("20CO08", "Test"),
    createData("20CO09", "Test"),
    createData("20CO15", "Test"),
    createData("20CO16", "Test"),
  ];

  const fetchStu = () => {
    axios.get(`http://localhost:5000/api/att/getstu/${branch}/${classes}/${sem}/${batch}`)
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
  useEffect( () => {
    fetchStu()
  },[open])

  const timestamp = new Date(date);

  // Extract time components
  const hours = timestamp.getUTCHours();
  const minutes = timestamp.getUTCMinutes();
  const seconds = timestamp.getUTCSeconds();


  return (
    <>
      <Box
        sx={{
          bgcolor: "#fff",
          flexWrap: "wrap",
          borderRadius: "15px",
          flexDirection: "row",
          height: "5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0px 20px",
        }}
      >
        <Typography fontWeight={500} fontSize={20}>
          {moment(date).format('DD-MM-YYYY')}
        </Typography>
        {/* <Button variant="text">75/{data.length}</Button> */}
        <IconButton title="More" onClick={handleClick}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>
      {open ? (
        <Box
          sx={{
            height: "auto",
            bgcolor: "#fff",
            borderRadius: "15px",
            padding: "20px",
          }}
        >
          <Typography fontWeight={500} fontSize={28}>
            Review Attendance Report
          </Typography>
          <Typography fontSize={22} fontWeight={450}>
            {subject}
          </Typography>
          <Stack
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              gap: "14px",
              margin: "10px 0px",
              alignItems: "center",
            }}
          >
            <Button
              variant="outlined"
              size="small"
              sx={{
                color: "#D3D3D3",
                borderColor: "#D3D3D3",
                ":hover": {
                  borderColor: "#D3D3D3",
                },
              }}
            >
              Batch:{branch}
            </Button>
            <Button
              startIcon={<AccessTimeOutlinedIcon />}
              size="small"
              sx={{
                color: "#D3D3D3",
              }}
            >
              {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </Button>
            <Button
              startIcon={<CalendarMonthOutlinedIcon />}
              size="small"
              sx={{
                color: "#D3D3D3",
              }}
            >
              {moment(date).format('DD-MM-YYYY')}
            </Button>
          </Stack>
          <Typography
            fontSize={22}
            fontWeight={450}
            margin="3rem 0rem 1rem 0rem"
          >
            Total Student: {students.length}
          </Typography>
          {/* <Stack display="felx" flexWrap="wrap" flexDirection="row" gap={5}>
            <Typography
              sx={{
                fontWeight: 450,
                fontSize: 22,
                color: "#11A529",
              }}
            >
              Present: {present}
            </Typography>
            <Typography
              sx={{
                fontWeight: 450,
                fontSize: 22,
                color: "#F93333",
              }}
            >
              Absent: {absent}
            </Typography>
          </Stack> */}
          <Typography fontSize={22} fontWeight={450} margin="1rem 0rem">
            List of Absent Students
          </Typography>

          <TableContainer
            component={Paper}
            sx={{
              overflowY: "scroll",
              height: 400,
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Roll Number</TableCell>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Attendance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((row) => (
                  <TableRow
                    key={row.rollNumber}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.rollNo}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {row.firstName} {row.lastName}
                    </TableCell>

                    <TableCell>
                      { data && data?.studentId?.includes(row._id)? (
                        <Button
                          sx={{
                            color: "#11A529",
                            bgcolor: "#e5e5e5",
                          }}
                        >
                          Present
                        </Button>
                      ) : (
                        <Button
                          sx={{
                            bgcolor: "#FFEFEF",
                            color: "#F93333",
                          }}
                        >
                          Absent
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : null}
    </>
  );
};

export default AttendanceList;
