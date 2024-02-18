import React from "react";
import {
  Box,
  IconButton,
  InputBase,
  Paper,
  Stack,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Table,
  TableBody
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// import { DataGrid } from '@mui/x-data-grid';


const clerkColumns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'fullName', headerName: 'Full Name', width: 170 },
  { field: 'age', headerName: 'Age', width: 70 },
  { field: 'department', headerName: 'Department', width: 170 },
  { field: 'joinDate', headerName: 'Join Date', width: 120 },
  { field: 'address', headerName: 'Address', width: 270 },
];

const clerkRows = [
  {id:1,fullName:'Snow John', age:30, department:'Computer',joinDate:'22/03/2015',address:'tfete etdtde gvtetde tdvted'},
]
const InstructorDashboard = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        <Box
          sx={{
            flex: 1,
            padding: "20px",
            borderRadius: "15px",
            display: "flex",
            flexWrap: "wrap",
            bgcolor: "#fff",
            flexDirection: "column",
            minHeight: "40rem",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              flexWrap: "wrap",
            }}
          >
            <Typography variant="h3" fontWeight={450} fontSize="2.45rem">
              Clerk
            </Typography>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 500,
                marginLeft: "auto",
              }}
            >
              <InputBase
                sx={{
                  flex: 1,
                  ml: 1,
                }}
                placeholder="Search for Clerk"
              />
              <IconButton
                type="button"
                sx={{
                  p: "10px",
                }}
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </Stack>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {clerkColumns.map((column)=>{
                          <TableCell key={column.id} >{column.headerName}</TableCell>
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        clerkRows.map((row)=>{

                      <TableRow key={row.id}>

                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.fullName}</TableCell>
                        <TableCell>{row.age}</TableCell>
                        <TableCell>{row.department}</TableCell>
                        <TableCell>{row.joinDate}</TableCell>
                        <TableCell>{row.address}</TableCell>
                      </TableRow>
                        })
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
        </Box>
        <Box
          sx={{
            flex: 1,
            padding: "20px",
            borderRadius: "15px",
            display: "flex",
            flexWrap: "wrap",
            bgcolor: "#fff",
            flexDirection: "column",
            minHeight: "40rem",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              flexWrap: "wrap",
            }}
          >
            <Typography variant="h3" fontWeight={450} fontSize="2.45rem">
              Instructors
            </Typography>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 500,
                marginLeft: "auto",
              }}
            >
              <InputBase
                sx={{
                  flex: 1,
                  ml: 1,
                }}
                placeholder="Search for Instructors"
              />
              <IconButton
                type="button"
                sx={{
                  p: "10px",
                }}
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </Stack>
        </Box>
        <Box
          sx={{
            flex: 1,
            padding: "20px",
            borderRadius: "15px",
            display: "flex",
            flexWrap: "wrap",
            bgcolor: "#fff",
            flexDirection: "column",
            minHeight: "40rem",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              flexWrap: "wrap",
            }}
          >
            <Typography variant="h3" fontWeight={450} fontSize="2.45rem">
              Students
            </Typography>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 500,
                marginLeft: "auto",
              }}
            >
              <InputBase
                sx={{
                  flex: 1,
                  ml: 1,
                }}
                placeholder="Search for Students"
              />
              <IconButton
                type="button"
                sx={{
                  p: "10px",
                }}
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default InstructorDashboard;
