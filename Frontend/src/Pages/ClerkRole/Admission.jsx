import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useState } from 'react';
import axios from 'axios';
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';



export const Form1 = () => {

  const admissionSchema = Yup.object().shape({
    firstName: Yup.string().min(4).max(30).required("Please Enter FirstName"),
    lastName: Yup.string().min(4).max(30).required("Please Enter lastName"),
    Branch: Yup.string().required("Please Enter Branch"),
    adYear: Yup.number().required("Please Enter Admission Year"),
    gradYear: Yup.number().required("Please Enter Graduation Year"),
    mobileNo: Yup.number().required("Please Enter Mobile No"),
    address: Yup.string().min(8).max(34).required("Please Enter address"),
    state: Yup.string().min(10).max(15).required("Please Enter state"),
    district: Yup.string().min(4).max(15).required("Please Enter district"),
    city: Yup.string().min(4).max(15).required("Please Enter city"),
    pincode: Yup.number().required("Please Enter pincode"),
    ttFees: Yup.number().required("Please Enter Total Fees"),
    feesPaid: Yup.number().required("Please Enter  Fees Paid"),
    stu_class: Yup.string().required("Please Enter Class"),
    crntSem: Yup.number().required("Please Enter Current Sem"),
    oldEmail: Yup.string().required("Please Enter valid email"),
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
    crntSem: "",
    oldEmail:""
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
    }
  });



  const handleSubmitt = () => {
    console.log(values)
    axios.post("http://localhost:5000/api/stu/admission", {
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
      stu_class: values.stu_class,
      currentSem: values.crntSem,
      oldEmail: values.oldEmail,

    }).then(res => {
      console.log(res.data);
      setSuccess(true)
    }).catch(err => {
      console.log(err)
    })
  }
  return (
    <>
 
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '45ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>

          <TextField
            id="outlined-multiline-flexible"
            label="Enter FirstName"
            multiline
            maxRows={4}
            name='firstName'
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
            name='lastName'
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
            name='mobileNo'
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
            name='oldEmail'
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

         
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-autowidth-label">Branch</InputLabel>
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
            name='adYear'
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
            name='gradYear'
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
            name='address'
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
            name='city'
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
            name='district'
            value={values.district}
            onChange={handleChange("district")}
            onBlur={() => setFieldTouched("district")}
            maxRows={4} />
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
          <TextField
            id="outlined-multiline-flexible"
            label="Enter Pincode"
            multiline
            name='pincode'
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
            name='state'
            value={values.state}
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
            multiline
            name='ttFees'
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
            name='feesPaid'
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
          {/* <TextField
            id="outlined-multiline-flexible"
            label="Enter Class"
            multiline
            name='stu_class'
            value={values.stu_class}
            onChange={handleChange("stu_class")}
            onBlur={() => setFieldTouched("stu_class")}
            maxRows={4}
          /> */}
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-autowidth-label">Class</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              name='stu_class'
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
          {/* <TextField
            id="outlined-multiline-flexible"
            label="Enter Current Sem"
            multiline
            name='crntSem'
            value={values.crntSem}
            onChange={handleChange("crntSem")}
            onBlur={() => setFieldTouched("crntSem")}
            maxRows={4}
          /> */}
           <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-autowidth-label">Current Sem</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              name='crntSem'
              onBlur={() => setFieldTouched("crntSem")}
            onChange={handleChange("crntSem")}
              autoWidth
              label="sem"
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

          {touched.crntSem && errors.crntSem && (
            <h5
              style={{
                color: "red",
                fontWeight: "500",
                marginBottom: 5,
              }}
            >
              {"***" + errors.crntSem}
            </h5>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
          <Button variant="contained" onClick={() => handleSubmitt()}>Submit</Button>

        </div>
      </Box>
    </>
  )
}

const Admission = () => {
  //   const [step, setStep] = React.useState(0);
  //   const [completed, setCompleted] = React.useState({});

  //   const steps = [
  //     'Admission',
  //     'Final Step',
  //   ];




  // const handleStep = () => {
  //   console.log("object")
  //   setStep(step + 1);

  // }

  const handleSubmit = () => {

  }

  return (
    <>
      <Form1 />

    </>
    //     <div >
    //       <Box sx={{ width: '100%' }}>
    //       <Stepper activeStep={step} alternativeLabel>
    //         {steps.map((label) => (
    //           <Step key={label}>
    //             <StepLabel>{label}</StepLabel>
    //           </Step>
    //         ))}
    //       </Stepper>
    //     </Box>

    //     {
    //        step==0
    //        ?
    //        <Form1/>
    //        :
    //        <Form2/>

    //  }

    //     <div style={{marginTop:"50px",display:"flex",justifyContent:"flex-end",padding:"0 9%"}}>
    //     <Button variant="contained" onClick={() => handleStep()}>{step==0 ? "Next" : "submit"}</Button> 
    //     </div>
    //     </div>
  )
}
export default Admission
