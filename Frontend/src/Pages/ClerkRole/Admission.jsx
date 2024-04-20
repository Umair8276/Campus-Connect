import * as React from "react";
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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, useFormik } from "formik";
import { styled } from "@mui/material/styles";
import { Oval } from 'react-loader-spinner'
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';

import TextField from "@mui/material/TextField";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form1 = () => {
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const admissionSchema = Yup.object().shape({
    firstName: Yup.string().min(4).max(30).required("Please Enter FirstName"),
    lastName: Yup.string().min(4).max(30).required("Please Enter lastName"),
    Branch: Yup.string().required("Please Enter Branch"),
    adYear: Yup.number().required("Please Enter Admission Year"),
    gradYear: Yup.number().required("Please Enter Graduation Year"),
    mobileNo: Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(10, "too short").max(10, "too long"),
    address: Yup.string().min(5).max(34).required("Please Enter address"),
    state: Yup.string().min(4).max(15).required("Please Enter state"),
    district: Yup.string().min(4).max(15).required("Please Enter district"),
    city: Yup.string().min(4).max(15).required("Please Enter city"),
    pincode: Yup.number().required("Please Enter pincode"),
    ttFees: Yup.number().required("Please Enter Total Fees"),
    feesPaid: Yup.number().required("Please Enter  Fees Paid"),
    stu_class: Yup.string().required("Please Enter Class"),
    crntSem: Yup.number().required("Please Enter Current Sem"),
    oldEmail: Yup.string().email('Invalid email address')
    .required('Email is required'),
  });


  const steps = ["Step 1 ", "Step 2 ", "Step 3"];

  const [activeStep, setActiveStep] = React.useState(0);
  const [sem,setSem] = React.useState("")
  const [formIsValid, setFormIsValid] = React.useState(false);
  const [loading,setLoading] = React.useState()
  const [file,setFile] = React.useState(false)


  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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

  const initialValues = {
    firstName: "",
    lastName: "",
    branch: "",
    adYear: "",
    gradYear: "",
    mobileNo: "",
    address: "",
    state: "",
    district: "",
    city: "",
    pincode: "",
    ttFees: "",
    feesPaid: "",
    stu_class: "",
    oldEmail: "",
  };


  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    setFieldTouched,
    isValid,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: admissionSchema,
    onSubmit: (values) => {
      console.log(values);
      resetForm();
    },
  });
  const navigate = useNavigate();

  
  const handleNext = () => {
    if (activeStep === 0) {
      if (Object.keys(errors).some((key) => key.startsWith('firstName') || key.startsWith('lastName') || key.startsWith('mobileNo') || key.startsWith('oldEmail') || key.startsWith('branch') )) {
        toast.error('Please fill all required fields in Step 1');
        return;
      }
    } else if (activeStep === 1) {
      if (Object.keys(errors).some((key) => key.startsWith('adYear') || key.startsWith('gradYear') || key.startsWith('address') || key.startsWith('city') || key.startsWith('district'))) {
        toast.error('Please fill all required fields in Step 2');
        return;
      }
    } else if (activeStep === 2) {
      if (Object.keys(errors).some((key) => key.startsWith('pincode') || key.startsWith('state') || key.startsWith('ttFees') || key.startsWith('feesPaid') || key.startsWith('stu_class') || key.startsWith('currentSem'))) {
        toast.error('Please fill all required fields in Step 3');
        return;
      }
    }
  
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  
  const handleSubmitt = () => {
    if(values.firstName && values.lastName && values.branch &&values.adYear && values.gradYear && values.mobileNo && values.address && values.state && values.city && values.district && values.pincode && values.ttFees &&  values.feesPaid &&  values.feesPaid && values.oldEmail  ){
      axios
        .post("http://localhost:5000/api/stu/admission", {
          firstName: values.firstName,
          lastName: values.lastName,
          branch: values.branch,
          startYear: values.adYear,
          endYear: values.gradYear,
          mobileNo: values.mobileNo,
          address: values.address,
          state: values.state,
          city: values.city,
          district: values.district,
          pincode: values.pincode,
          totalFees: values.ttFees,
          feesPaid: values.feesPaid,
          stu_class:  values.stu_class,
          currentSem: sem,
          oldEmail: values.oldEmail,
          profile:file
        })
        .then((res) => {
          console.log(res.data);
          setSuccess(true);
        })
        .catch((err) => {
          console.log(err);
        });
      handleNext();
    }
    else
      toast.error('Please fill all the fields ');
  };


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
    <ToastContainer/>
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
            New Admission
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
                  sx={{}}
                  style={{ textAlign: "center" }}
                >
                  Admission Successfully
                </Typography>
                <Typography>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Temporibus, veritatis?Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Veniam, unde!
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
                    navigate("/", { replace: true })
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
                component="form"
                style={{
                  marginTop: "2.5rem",
                  width: "28rem",
                  height: "content-fit",
                  margin: "2rem auto",
                  border: "1px solid #E1E1E1",
                  borderRadius: "8px",
                  padding: "2rem 2rem 1rem 2rem",
                }}
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "45ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-multiline-flexible v"
                  label="Enter FirstName"
                  multiline
                  maxRows={4}
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange("firstName")}
                  onBlur={() => setFieldTouched("firstName")}
                />
                {touched.firstName && errors.firstName && ( 
                  <h5
                    style={{
                      color: "red",
                      fontWeight: "500",
                      marginBottom: 5,
                    }}
                  >
                    {"***" + errors.firstName}
                  </h5>
                )}

                <TextField
                  id="outlined-multiline-flexible"
                  label="Enter LastName"
                  multiline
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange("lastName")}
                  onBlur={() => setFieldTouched("lastName")}
                  maxRows={4}
                />
                {touched.lastName && errors.lastName && (
                  <h5
                    style={{
                      color: "red",
                      fontWeight: "500",
                      marginBottom: 5,
                    }}
                  >
                    {"***" + errors.lastName}
                  </h5>
                )}

                <TextField
                  id="outlined-multiline-flexible"
                  label="Enter MobileNo"
                  name="mobileNo"
                  multiline
                  value={values.mobileNo}
                  onChange={handleChange("mobileNo")}
                  onBlur={() => setFieldTouched("mobileNo")}
                  maxRows={4}
                />
                {touched.mobileNo && errors.mobileNo && (
                  <h5
                    style={{
                      color: "red",
                      fontWeight: "500",
                      marginBottom: 5,
                    }}
                  >
                    {"***" + errors.mobileNo}
                  </h5>
                )}

                <TextField
                  id="outlined-multiline-flexible"
                  label="Enter Email"
                  name="oldEmail"
                  multiline
                  value={values.oldEmail}
                  onChange={handleChange("oldEmail")}
                  onBlur={() => setFieldTouched("oldEmail")}
                  maxRows={4}
                />
                {touched.oldEmail && errors.oldEmail && (
                  <h5
                    style={{
                      color: "red",
                      fontWeight: "500",
                      marginBottom: 5,
                    }}
                  >
                    {"***" + errors.oldEmail}
                  </h5>
                )}

                <FormControl sx={{ m: 1, minWidth: 360 }}>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Branch
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    name="branch"
                    onChange={handleChange("branch")}
                    onBlur={() => setFieldTouched("branch")}
                    autoWidth
                    label="Branch"
                  >
                    <MenuItem value={"Computer"}>Computer</MenuItem>
                    <MenuItem value={"Mechanical"}>Mechanical</MenuItem>
                    <MenuItem value={"Electrical"}>Electrical</MenuItem>
                    <MenuItem value={"Electronics"}>Electronics</MenuItem>
                    <MenuItem value={"Civil"}>Electronics</MenuItem>
                  </Select>
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
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                {touched.branch && errors.branch && (
                  <h5
                    style={{
                      color: "red",
                      fontWeight: "500",
                      marginBottom: 5,
                    }}
                  >
                    {"***" + errors.branch}
                  </h5>
                )}
                <TextField
                  id="outlined-multiline-flexible"
                  label="Enter Admission Year"
                  sx={{ m: 1, minWidth: 400 }}
                  name="adYear"
                  value={values.adYear}
                  onChange={handleChange("adYear")}
                  onBlur={() => setFieldTouched("adYear")}
                  multiline
                  maxRows={4}
                />
                {touched.adYear && errors.adYear && (
                  <h5
                    style={{
                      color: "red",
                      fontWeight: "500",
                      marginBottom: 5,
                    }}
                  >
                    {"***" + errors.adYear}
                  </h5>
                )}
                <TextField
                  id="outlined-multiline-flexible"
                  label="Enter Graduation Year"
                  name="gradYear"
                  sx={{ m: 1, minWidth: 400 }}
                  value={values.gradYear}
                  onChange={handleChange("gradYear")}
                  onBlur={() => setFieldTouched("gradYear")}
                  multiline
                  maxRows={4}
                />
                {touched.gradYear && errors.gradYear && (
                  <h5
                    style={{
                      color: "red",
                      fontWeight: "500",
                      marginBottom: 5,
                    }}
                  >
                    {"***" + errors.gradYear}
                  </h5>
                )}
                <TextField
                  id="outlined-multiline-static"
                  label="Address"
                  multiline
                  name="address"
                  sx={{ m: 1, minWidth: 400 }}
                  value={values.address}
                  onChange={handleChange("address")}
                  onBlur={() => setFieldTouched("address")}
                  // rows={4}
                  // defaultValue="Address"
                />
                {touched.address && errors.address && (
                  <h5
                    style={{
                      color: "red",
                      fontWeight: "500",
                      marginBottom: 5,
                    }}
                  >
                    {"***" + errors.address}
                  </h5>
                )}
                <TextField
                  id="outlined-multiline-flexible"
                  label="Enter city"
                  multiline
                  name="city"
                  sx={{ m: 1, minWidth: 400 }}
                  value={values.city}
                  onChange={handleChange("city")}
                  onBlur={() => setFieldTouched("city")}
                  maxRows={4}
                />
                {touched.city && errors.city && (
                  <h5
                    style={{
                      color: "red",
                      fontWeight: "500",
                      marginBottom: 5,
                    }}
                  >
                    {"***" + errors.city}
                  </h5>
                )}

                <TextField
                  id="outlined-multiline-flexible"
                  label="Enter District"
                  multiline
                  name="district"
                  sx={{ m: 1, minWidth: 400 }}
                  value={values.district}
                  onChange={handleChange("district")}
                  onBlur={() => setFieldTouched("district")}
                  maxRows={4}
                />
                {touched.district && errors.district && (
                  <h5
                    style={{
                      color: "red",
                      fontWeight: "500",
                      marginBottom: 5,
                    }}
                  >
                    {"***" + errors.district}
                  </h5>
                )}
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
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <TextField
                  id="outlined-multiline-flexible"
                  label="Enter Pincode"
                  multiline
                  name="pincode"
                  sx={{ m: 1, minWidth: 400 }}
                  value={values.pincode}
                  onChange={handleChange("pincode")}
                  onBlur={() => setFieldTouched("pincode")}
                  maxRows={4}
                />
                {touched.pincode && errors.pincode && (
                  <h5
                    style={{
                      color: "red",
                      fontWeight: "500",
                      marginBottom: 5,
                    }}
                  >
                    {"***" + errors.pincode}
                  </h5>
                )}
                <TextField
                  id="outlined-multiline-flexible"
                  label="Enter State"
                  multiline
                  name="state"
                  value={values.state}
                  sx={{ m: 1, minWidth: 400 }}
                  onChange={handleChange("state")}
                  onBlur={() => setFieldTouched("state")}
                  maxRows={4}
                />
                {touched.state && errors.state && (
                  <h5
                    style={{
                      color: "red",
                      fontWeight: "500",
                      marginBottom: 5,
                    }}
                  >
                    {"***" + errors.state}
                  </h5>
                )}
                <TextField
                  id="outlined-multiline-flexible"
                  label="Enter Total Fees"
                  sx={{ m: 1, minWidth: 400 }}
                  multiline
                  name="ttFees"
                  value={values.ttFees}
                  onChange={handleChange("ttFees")}
                  onBlur={() => setFieldTouched("ttFees")}
                  maxRows={4}
                />
                {touched.ttFees && errors.ttFees && (
                  <h5
                    style={{
                      color: "red",
                      fontWeight: "500",
                      marginBottom: 5,
                    }}
                  >
                    {"***" + errors.ttFees}
                  </h5>
                )}
                <TextField
                  id="outlined-multiline-flexible"
                  label="Enter Fees Paid Amt"
                  multiline
                  sx={{ m: 1, minWidth: 400 }}
                  name="feesPaid"
                  value={values.feesPaid}
                  onChange={handleChange("feesPaid")}
                  onBlur={() => setFieldTouched("feesPaid")}
                  maxRows={4}
                />
                {touched.feesPaid && errors.feesPaid && (
                  <h5
                    style={{
                      color: "red",
                      fontWeight: "500",
                      marginBottom: 5,
                    }}
                  >
                    {"***" + errors.feesPaid}
                  </h5>
                )}

                <FormControl sx={{ m: 1, minWidth: 400 }}>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Class
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    name="stu_class"
                    onBlur={() => setFieldTouched("stu_class")}
                    onChange={handleChange("stu_class")}
                    autoWidth
                    label="Class"
                  >
                    <MenuItem value={"FE"}>FE</MenuItem>
                    <MenuItem value={"SE"}>SE</MenuItem>
                    <MenuItem value={"TE"}>TE</MenuItem>
                    <MenuItem value={"BE"}>BE</MenuItem>
                  </Select>
                </FormControl>
                {touched.stu_class && errors.stu_class && (
                  <h5
                    style={{
                      color: "red",
                      fontWeight: "500",
                      marginBottom: 5,
                    }}
                  >
                    {"***" + errors.stu_class}
                  </h5>
                )}

                
             <FormControl
             sx={{ m: 1, minWidth: 400 }}
            >
              <InputLabel id="batch">Semester</InputLabel>
              {
                        values.stu_class=="FE"
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
                    values.stu_class == "SE"
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
                values.stu_class=="TE"
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


                    <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                  sx={{
                    mt: "0.6rem",
                    // marginRight:"10px"
                  }}
                >
                  Upload Profile
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

          {activeStep !== steps.length && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "2rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
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

                {activeStep === steps.length - 1 ? (
                   <Button  onClick={() => handleSubmitt()}>
                   Finish
                 </Button>
                ) : (
                  <Button  onClick={handleNext}>
                  Next
                </Button>
                )}
              </Box>
            </div>
          )}
        </Box>
      </Box>
    </>
  );
};

export const Admission = () => {
  return (
    <>
      <Form1 />
    </>
  );
};
