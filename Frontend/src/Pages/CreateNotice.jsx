import React, { useContext, useState } from 'react'
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
import { useNavigate } from 'react-router-dom';
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

const CreateNotice = () => {
    const [file, setFile] = useState("");
    const [content, setContent] = useState("");
    const [branch, setBranch] = useState("");
    const [classes, setClasses] = useState("");
    const [alert, setAlert] = useState(false);
    const [success, setSuccess] = useState(false);
    const [sem,setSem] = useState("")
    const {user} = useContext(AppContext);
    const [loading,setLoading] = useState()
    const navigate = useNavigate()

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
            classes,
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
        }).catch(err => {
            console.log(err)
        })
        setSuccess(true)
        setTimeout(() => {
            setSuccess(false)
        }, 2000)
        navigate(user.role == "faculty" ? `/faculty/notice`:`/clerk/notice`)
    }

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

            <h1>Create Notice</h1>
            <Divider />


            <div className="formCont">
        <div className="form-cont">
          <h3 className="Title  text-center mt-3">Create Attendence</h3>
          <div className="input_field">
            <input
              type="text"
              className="inputUser"
              name="bookName"
              value={content}
              placeholder='Enter Content'
            onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <FormControl sx={{ m: 1.5, minWidth: 350,ml:3,border:"1px solid #0abde3",borderRadius:"5px" }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Branch</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
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
                        value={classes}
                        onChange={(e) => setClasses(e.target.value)}
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
                    <VisuallyHiddenInput type="file" onChange={(e) => handleUpload(e.target.files[0])} />
                </Button>

                <Button variant="contained" sx={{ mt: "2rem", width: "20rem",marginBottom:"20px",marginLeft:"20px" }} onClick={postData}>
                    Publish 
                </Button>
                    </Box>
         
        </div>
      </div>

            {/* <Box style={{display: "flex", justifyContent: "center",alignItems:"center",width:"100%",height:"100%", }}>

            
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 2,width:"70ch" },
                }}
                style={{ width:"600px",boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",borderRadius:"10px"}}
                noValidate
                autoComplete="off"
            >

                <TextField
                    id="outlined-multiline-static"
                    label="Enter Content"
                    multiline
                    rows={5}
                    onChange={(e) => setContent(e.target.value)}
                   
                />


                <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Branch</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        autoWidth
                        label="Branch"
                    >
                        <MenuItem value={"Computer"}>Computer</MenuItem>
                        <MenuItem value={"Mechanical"}>Mechanical</MenuItem>
                        <MenuItem value={"Electrical"}>Electrical</MenuItem>
                        <MenuItem value={"Electronics"}>Electronics</MenuItem>
                    </Select>


                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Class</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={classes}
                        onChange={(e) => setClasses(e.target.value)}
                        autoWidth
                        label="Class"
                    >
                        <MenuItem value={"FE"}>FE</MenuItem>
                        <MenuItem value={"SE"}>SE</MenuItem>
                        <MenuItem value={"TE"}>TE</MenuItem>
                        <MenuItem value={"BE"}>BE</MenuItem>
                    </Select>


                </FormControl>


                <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Semester</InputLabel>
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
            
            <Box style={{ width: "100%", display: "flex", flexDirection: "column" ,marginLeft:"10px"}}>
                <Button
                    component="label"
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                    fullWidth
                    sx={{
                        mt: "2rem",
                    }}
                    style={{ width: "570px" }}
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
                    <VisuallyHiddenInput type="file" onChange={(e) => handleUpload(e.target.files[0])} />
                </Button>

                <Button variant="contained" sx={{ mt: "2rem", width: "20rem",marginLeft:"130px" }} onClick={postData}>
                    Publish 
                </Button>
                    </Box>
            </Box>
            </Box> */}
           

        </>
    )
}

export default CreateNotice