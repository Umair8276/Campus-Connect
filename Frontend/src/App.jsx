import "./App.css";
import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Login,
  StLogin,
  InstructorDashboard,
  Result,
  InstructorProfile,
  Notice,
  Attendance,
  Batches,
  Assignments,
  Home,
  CreateAttendance,
  CreateAssignment,
  Admission,
  DisplayData,
  CreateNotice,
  EditData,
  CheckAttendence,
  StudentProfile,
  EditNotice,
  EditAssgn,
  CheckFees
} from "./Pages/index.ts";
import { Layout } from "./Components/Layout/index.ts";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { UserAuth } from "./Authentication/UserAuth";
import { AppContext } from "./Context/AuthContext";
import {FacultyAccess,ClerkAccess,IsLoggedin,StudentAccess} from "./Authentication/UserAuth.jsx"

function App() {
  const {user} = useContext(AppContext)
  return (
    <>
    <ToastContainer/>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Routes>
          <Route path="/" element={user && user.role ?  <UserAuth /> :  <Login />} />
          <Route path="/stlogin" element={  <StLogin />} />
          <Route path="/login" element={ <IsLoggedin><Login /></IsLoggedin>}/>
          <Route
            path="/faculty/*"
            element={
              <FacultyAccess>
              <Layout>
                <Routes>
                  <Route path="/result" element={<Result />} />
                  <Route path="/notice" element={
                    <FacultyAccess> <Notice /> </FacultyAccess>
                  } />
                  <Route path="/attendance" element={<FacultyAccess><Attendance /></FacultyAccess>} />
                  {/* <Route path="/profile" element={<InstructorProfile />} /> */}
                  <Route path="/batches" element={<Batches />} />
                 
                  <Route path="/assignments" element={<FacultyAccess><Assignments/></FacultyAccess>} />
                  <Route path="/createnotice" element={<FacultyAccess><CreateNotice /></FacultyAccess>} />
                  <Route path="/create-attendance" element={<FacultyAccess><CreateAttendance /></FacultyAccess>} />
                  <Route path="/create-assignment" element={<FacultyAccess><CreateAssignment /></FacultyAccess>} />
                  <Route path="/editnotice/:id" element={<FacultyAccess><EditNotice /></FacultyAccess>} />
                  <Route path="/editassgn/:id" element={<FacultyAccess><EditAssgn /></FacultyAccess>} />
                  <Route path="/checkfees" element={<FacultyAccess><CheckFees /></FacultyAccess>} />
                </Routes>
              </Layout>
              </FacultyAccess>
        
            }
          />
       
          <Route 
          path="/clerk/*"
          element={
            <ClerkAccess>
            <Layout>
            <Routes>
              <Route path="/admission" element={<ClerkAccess><Admission/></ClerkAccess>}/>
              <Route path="/students" element={<ClerkAccess><DisplayData/></ClerkAccess>}/>
              <Route path="/notice" element={<ClerkAccess><Notice/></ClerkAccess>}/>
              <Route path="/attendence" element={<ClerkAccess><CheckAttendence/></ClerkAccess>}/>
              <Route path="/createnotice" element={<ClerkAccess><CreateNotice /></ClerkAccess>} />
              <Route path="/edit/:id" element={<ClerkAccess><EditData/></ClerkAccess>}/>
              <Route path="/editnotice/:id" element={<ClerkAccess><EditNotice /></ClerkAccess>} />
              <Route path="/checkfees" element={<ClerkAccess><CheckFees /></ClerkAccess>} />
            </Routes>
            </Layout>
            </ClerkAccess>
          }

          />

          <Route 
          path="/admin/*"
          element={
            <Layout>
            <Routes>
              <Route path="/admission" element={<FacultyAccess><Admission/></FacultyAccess>}/>
            </Routes>
            </Layout>
          }

          />
          <Route 
          path="/student/*"
          element={
            <StudentAccess>
            <Layout>
            <Routes>
              {/* <Route path="/attendance" element={<Admission/>}/> */}
              <Route path="/assignments" element={<StudentAccess><Assignments/></StudentAccess>}/>
              <Route path="/notice" element={ <StudentAccess> <Notice/></StudentAccess> }/>
              <Route path="/profile" element={ <StudentAccess> <StudentProfile/></StudentAccess> }/>
            </Routes>
            </Layout>
            </StudentAccess>
          }

          />
        
        </Routes>
      
      </LocalizationProvider>
    </>
  );
}

export default App;
