import React from "react";
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

const AttendanceList = ({date,subject,present}) => {
  const [open, setOpen] = React.useState(false);
  const absent = 75 - present;
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
          {date}
        </Typography>
        <Button variant="text">75/{present}</Button>
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
              Batch: BECO-20
            </Button>
            <Button
              startIcon={<AccessTimeOutlinedIcon />}
              size="small"
              sx={{
                color: "#D3D3D3",
              }}
            >
              12:45 PM
            </Button>
            <Button
              startIcon={<CalendarMonthOutlinedIcon />}
              size="small"
              sx={{
                color: "#D3D3D3",
              }}
            >
              25 july 2023
            </Button>
          </Stack>
          <Typography
            fontSize={22}
            fontWeight={450}
            margin="3rem 0rem 1rem 0rem"
          >
            Total Student: 75
          </Typography>
          <Stack display="felx" flexWrap="wrap" flexDirection="row" gap={5}>
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
          </Stack>
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
                {rows.map((row) => (
                  <TableRow
                    key={row.rollNumber}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.rollNumber}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>

                    <TableCell>
                      {false ? (
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
