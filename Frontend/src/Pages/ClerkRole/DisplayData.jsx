import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import { useState } from 'react';
import axios from "axios"


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const DisplayData = () => {
  const [branch,setBranch] = useState("")
  const [stu_class,setStu_Class] = useState("");
  const [rollNo,setRollNo] = useState("")
  const [data,setData] = useState([])

  const getData = () => {
    console.log(branch,stu_class,rollNo)
    axios.post("http://localhost:5000/api/stu/search",{
     branch,
     stu_class,
     rollNo
    }).then(res => {
      console.log(res.data)
      setData(res.data.student)
    }).catch(err =>{
      console.log(err)
    })
  }

  return (
    <>

      <Box sx={{ minWidth: 120,display:"flex",gap:"20px",marginBottom:"20px" }}>
      <Box
        sx={{
          width: 500,
          width: '50%',
        }}
      >
        <TextField fullWidth label="Search By Roll No" value={rollNo} id="fullWidth" onChange={(e) =>setRollNo(e.target.value)} />
      </Box>

        <FormControl sx={{width:"200px"}} >
          <InputLabel id="demo-simple-select-label"  >Branch</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={branch}
            label="Age"
            onChange= {(e) => setBranch(e.target.value)}
          >
            <MenuItem value="Computer" >Computer</MenuItem>
            <MenuItem value="Mechanical" >Mechanical</MenuItem>
            <MenuItem value="Civil" >Civil</MenuItem>
            <MenuItem value="Electronics">Electronics</MenuItem>
            <MenuItem  value="Electrical">Electrical</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{width:"200px"}} >
          <InputLabel id="demo-simple-select-label"  >Class</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={stu_class}
            label="Age"
            onChange={(e) =>setStu_Class(e.target.value)}
          >
            <MenuItem value="FE">FE</MenuItem>
            <MenuItem value="SE">SE</MenuItem>
            <MenuItem value="TE">TE</MenuItem>
            <MenuItem value="BE">BE</MenuItem>
          </Select>
        </FormControl>

      
        <Button variant="contained" onClick={() => getData()}>Search</Button>
      
      </Box>

     

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          {
            data.length!=0
            ?
            <TableHead>
            <TableRow>
              <StyledTableCell>Admission Id</StyledTableCell>
              <StyledTableCell align="right">First Name</StyledTableCell>
              <StyledTableCell align="right">Last Name</StyledTableCell>
              <StyledTableCell align="right">Roll no</StyledTableCell>
              <StyledTableCell align="right">Branch</StyledTableCell>
              <StyledTableCell align="right">Class</StyledTableCell>
              <StyledTableCell align="right">Operation</StyledTableCell>
            </TableRow>
          </TableHead>
          :
          <></>
          }
        
          <TableBody>
            {data.map((data) => (
              <StyledTableRow key={data._id}>
                  <StyledTableCell align="left">
                  {data._id}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {data.firstName}
                </StyledTableCell>
                <StyledTableCell align="right">{data.lastName}</StyledTableCell>
                <StyledTableCell align="right">{data.rollNo}</StyledTableCell>
                <StyledTableCell align="right">{data.branch}</StyledTableCell>
                <StyledTableCell align="right">{data.stu_class}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button variant="contained"  >Edit</Button>
                </StyledTableCell>

              </StyledTableRow>
            ))}
          </TableBody>
        </Table>

        {/* <TablePagination rowsPerPageOptions={[10, 50, { value: -1, label: 'All' }]} /> */}
      </TableContainer>
    </>

  );
}
export default DisplayData