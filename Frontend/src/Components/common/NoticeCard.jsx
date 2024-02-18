import React, { useContext ,useState,useEffect} from "react";
import {
  Typography,
  Paper,
  Stack,
  Button,
  LinearProgress,
  Drawer,
  IconButton,
  Box,
  TextField,
  TextareaAutosize,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AuthContext";
import axios from "axios";
import { Oval } from 'react-loader-spinner'

const NoticeCard = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [notices,setNotices] = useState([])
  const [singleNotice,setSingleNotice] = useState([])
  const [loading,setLoading] = useState(true)
  const {user} = useContext(AppContext)

  const getNotice = () => {
    axios.get(`http://localhost:5000/api/notice/getfacnotice/${user.dept}`)
    .then(res => {
      console.log(res.data)
      setNotices(res.data.notice)
      setLoading(false)
    }).catch(err => {
      console.log(err)
    })
  }
  const getStuNotice = () => {
    axios.get(`http://localhost:5000/api/notice/getnotice/${user.branch}/${user.stu_class}/${user.currentSem}`)
    .then(res => {
      console.log("Student NOtice",res.data.notice)
      setNotices(res.data.notice)
      setLoading(false)
    }).catch(err => {
      console.log(err)
    })
  }
  useEffect( () => {
    if(user.role!="student")
       getNotice()
    else
       getStuNotice()
  },[]);

  const deleteNotice = (id) => {
    axios.delete(`http://localhost:5000/api/notice/deletenotice/${id}`)
    .then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
    const filterNotice = notices.filter(data => {
      return data._id!=id
    });
    setNotices(filterNotice)
  }

  const getSingleNotice = (id) => {
     axios.get(`http://localhost:5000/api/notice/getnoticebyid/${id}`)
     .then(res => {
      console.log(res.data);
      setSingleNotice(res.data.notice)
     }).catch(err => {
      console.log(err)
     })
  }
  return (
    <Box style={{display:"flex",flexDirection:"row",gap:"12px",flexWrap:"wrap"}}>
    {
      loading
      ?
      <div style={{marginLeft:"500px",marginTop:"150px"}}>
        <Oval
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
       ariaLabel="oval-loading"
       wrapperStyle={{}}
       wrapperClass=""
       />
      </div>
      :

      notices.map( (notices,i) => {
        return (
          <Box  style={{display:"flex",flexDirection:"row"}}>
          <Paper
          elevation={0.5}
          sx={{
            width: "340px",
            padding: "15px",
            borderRadius: "12px",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            border: "1px solid #E6E6E6",
            flexWrap: "wrap",
            gap: "2px",
          }}
        >
          <Box style={{display:"flex",justifyContent:"space-between"}}>
          <Typography fontWeight={550} fontSize={20} marginBottom={4}>
           {notices.content}
          </Typography >
          {
            user.role!="student" &&
          <DeleteIcon style={{color:"red",cursor:"pointer"}} onClick={()=>deleteNotice(notices._id)}/>
          }

          </Box>
          <Typography
            sx={{
              color: "#9A9A9A",
            }}
          >
            Branch : {notices.branch}
          </Typography>
          <Typography
            sx={{
              color: "#9A9A9A",
            }}
          >
            Class : {notices.class}
          </Typography>
  
          <Stack
            sx={{
              color: "#D3D3D3",
              flexDirection: "row",
              alignItems: "center",
              gap: "5px",
              margin: "15px 0px",
            }}
          >
            <CalendarMonthIcon />
            {notices.createdAt}
          </Stack>
          <Button
            fullWidth
            variant="contained"
            onClick={() => {setOpen(true)
             getSingleNotice(notices._id)
            }}
            sx={{
              bgcolor: "#3D70F5",
              padding: "10px",
              fontWeight: "light",
              margin: "15px 0px",
            }}
          >
            View Details
          </Button>
          </Paper>
          </Box>
         
        )

      })
    }
 
        <Drawer
          anchor="right"
          open={open}
          onClose={() => setOpen(false)}
          PaperProps={{
            sx: { width: 700, borderRadius: "15px 0px 0px 15px" },
          }}
        >
          <IconButton
            onClick={() => setOpen(!open)}
            sx={{
              marginRight: "auto",
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            sx={{
              margin: "3rem 2rem 2rem 2rem",
            }}
          >
            <Typography fontWeight={500} fontSize={32}>
             {singleNotice.content}
            </Typography>
            <Typography
              fontSize={20}
              color="#D3D3D3"
              fontWeight={450}
              marginTop={5}
            >
              Branch:{singleNotice.branch}
            </Typography>
            <Typography color="#D3D3D3" fontSize={20} fontWeight={450}>
              Class : {singleNotice.class}
            </Typography>
            <Stack
              sx={{
                color: "#D3D3D3",
                flexDirection: "row",
                alignItems: "center",
                gap: "5px",
                margin: "15px 0px",
              }}
            >
              <CalendarMonthIcon />
              {singleNotice.createdAt}
            </Stack>
            <Typography
              fontSize={24}
              fontWeight={450}
              marginTop={5}
            >
              Description:
            </Typography>
            <Box fullWidth sx={{
                height:'auto-fit',
                overflowY:'scroll',
            }}>
                <Typography>
                    {/* Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam maiores culpa vitae nobis ducimus, nihil, odio, dolorem praesentium vel illo ratione recusandae a. Quae sequi voluptatum illo deleniti! Nemo pariatur fuga quo culpa consequuntur eveniet illum eum magnam cumque quia, id blanditiis iusto praesentium error accusamus temporibus reprehenderit, dolorem vel aspernatur quos quisquam dolor enim animi! Beatae illum obcaecati nihil accusantium natus autem voluptatibus, illo, omnis hic provident nemo possimus ad accusamus eius reiciendis saepe ab, doloremque ratione debitis quibusdam cumque dolore magni sed eligendi. Illum eaque maxime inventore? Aperiam omnis debitis nam, saepe labore sapiente repellat ratione facilis voluptas. */}
                    {singleNotice.content}
                </Typography>
            </Box>
            <Typography marginTop={5} fontWeight={450} fontSize={20}>
              Attachment
            </Typography>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 8,
                marginTop: "1rem",
              }}
            >
              <Button color="info" variant='outlined'>
              <a href={singleNotice.file} target="_blank" style={{color:"blue"}}>Notice PDF</a>
              </Button>
            </Stack>
          </Box>
        </Drawer>
      
    </Box>
  );
};

export default NoticeCard;
