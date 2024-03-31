import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import { styled, useColorScheme } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from 'axios';
import { AppContext } from '../Context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Oval } from 'react-loader-spinner'
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import { ToastContainer, toast } from 'react-toastify';
import "./EditData/Edit.css"



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

const EditNotice = () => {
    const [file, setFile] = useState("");
    const [content, setContent] = useState("");
    const [branch, setBranch] = useState("");
    const [classes, setClasses] = useState("");
    const [alert, setAlert] = useState(false);
    const [success, setSuccess] = useState(false);
    const [sem,setSem] = useState("")
    const {user} = useContext(AppContext);
    const [loading,setLoading] = useState()
    const navigate = useNavigate();
    const {id} = useParams();
     const [noticeInfo,setNoticeInfo] = useState({
        content:"",
        branch:"",
        classes:"",
     })

     const handleChange = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        setNoticeInfo({...noticeInfo,[name]:value})
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
        setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 2000)
    };

    const postData = () => {
        console.log(file, content, classes, branch)
        axios.post("http://localhost:5000/api/notice/createnotice",{
            file,
            content,
            class:classes,
            branch,
            faculty:user._id,
            sem
        }).then(res => {
            console.log(res.data)
            toast.success("Notice Uploaded Successfully", {
                autoClose: 2000, 
              })
              setContent("")
              setBranch("")
              setClasses("")
              navigate
        }).catch(err => {
            console.log(err)
        })
        setSuccess(true)
        setTimeout(() => {
            setSuccess(false)
        }, 2000)
        navigate("/faculty/notice")
    }

    const getNotice = () => {
        axios.get( `http://localhost:5000/api/notice/getnoticebyid/${id}`)
        .then(res => {
            console.log("Notice :",res.data)
            setNoticeInfo(res.data.notice)
        }).catch(err => {
            console.log(err)
        })
    }

const updateData = () => {
    const {content,branch,classes} = noticeInfo
    axios.put(`http://localhost:5000/api/notice/updatenotice/${id}`,{
        content,
        branch,
        classes,
        file
    })
    .then(res => {
        console.log(res.data)
        toast.success("Notice updated Successfully", {
            autoClose: 2000, 
          })
          setTimeout( () => {
            navigate(user.role == "clerk" ? "/clerk/notice" : "/faculty/notice")
          },2000)
    }).catch(err => {
        console.log(err)
    })
}

    useEffect( () => {
        getNotice()
    },[])

    return (
        <>
            {
                alert &&
                <Alert severity="success">
                    <AlertTitle>File Uploaded Successfully</AlertTitle>
                </Alert>
                

            }
            {
                success &&
                <Alert severity="success">
                <AlertTitle>Notice Uploaded Successfully</AlertTitle>
            </Alert>

            }

            <h1>Edit Notice</h1>
            <Divider />


            <div className="formCont">
        <div className="form-cont">
          <h3 className="Title  text-center mt-3">Edit Notice</h3>
          <div className="input_field">
            <input
              type="text"
              className="inputUser"
              name="content"
              value={noticeInfo.content}
              placeholder='Enter Content'
            onChange={(e) =>  handleChange(e)}
            />
          </div>

          <FormControl sx={{ m: 1.5, minWidth: 350,ml:3,border:"1px solid #0abde3",borderRadius:"5px" }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Branch</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={noticeInfo.branch}
                        name='branch'
                        onChange={(e) => handleChange(e)}
                        autoWidth
                        label="Branch"
                    >
                        <MenuItem value={"Computer"}>Computer</MenuItem>
                        <MenuItem value={"Mechanical"}>Mechanical</MenuItem>,
                        <MenuItem value={"Electrical"}>Electrical</MenuItem>
                        <MenuItem value={"Electronics"}>Electronics</MenuItem>
                    </Select>


                </FormControl>
             <FormControl sx={{ mt: 1, minWidth: 350,ml:3,border:"1px solid #0abde3",borderRadius:"5px" }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Class</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={noticeInfo?.classes }
                        name='classes'
                        onChange={(e) =>  handleChange(e)}
                        autoWidth
                        label="Class"
                    >
                        <MenuItem value={"FE"}>FE</MenuItem>
                        <MenuItem value={"SE"}>SE</MenuItem>
                        <MenuItem value={"TE"}>TE</MenuItem>
                        <MenuItem value={"BE"}>BE</MenuItem>
                    </Select>


                </FormControl>


                <Box style={{ width: "100%", display: "flex", flexDirection: "column",marginLeft:"15px" }}>
                <Button
                    component="label"
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                    fullWidth
                    sx={{
                        mt: "1.5rem",
                    }}
                    style={{marginLeft:"10px", width: "350px" }}
                >
                    Upload file  {loading ?       <Oval
                  visible={true}
                  height="30"
                  width="30"
                  color="#4fa94d"
                 ariaLabel="oval-loading"
                
                 />
                 :
                 loading==false
                 ?
                 <DownloadDoneIcon color="green"/>
                 :
                 <></>}
                    <VisuallyHiddenInput type="file" name='file' onChange={(e) => setFile(e.target.files[0])} />
                </Button>

                <Button variant="contained" sx={{ mt: "2rem", width: "20rem",marginBottom:"20px",marginLeft:"20px" }} onClick={updateData}>
                    Update 
                </Button>
                    </Box>
         
        </div>
      </div>

        
        </>
    )
}

export default EditNotice