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
  EditAssgn
} from "./Pages/index.ts";
import { Layout } from "./Components/Layout/index.ts";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { UserAuth } from "./Authentication/UserAuth";
import { AppContext } from "./Context/AuthContext";
import {CampusAccess,IsLoggedin,StudentAccess} from "./Authentication/UserAuth.jsx"

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
              <CampusAccess>
              <Layout>
                <Routes>
                  <Route path="/result" element={<Result />} />
                  <Route path="/notice" element={
                    <CampusAccess> <Notice /> </CampusAccess>
                  } />
                  <Route path="/attendance" element={<CampusAccess><Attendance /></CampusAccess>} />
                  {/* <Route path="/profile" element={<InstructorProfile />} /> */}
                  <Route path="/batches" element={<Batches />} />
                 
                  <Route path="/assignments" element={<CampusAccess><Assignments/></CampusAccess>} />
                  <Route path="/createnotice" element={<CampusAccess><CreateNotice /></CampusAccess>} />
                  <Route path="/create-attendance" element={<CampusAccess><CreateAttendance /></CampusAccess>} />
                  <Route path="/create-assignment" element={<CampusAccess><CreateAssignment /></CampusAccess>} />
                  <Route path="/editnotice/:id" element={<CampusAccess><EditNotice /></CampusAccess>} />
                  <Route path="/editassgn/:id" element={<CampusAccess><EditAssgn /></CampusAccess>} />
                </Routes>
              </Layout>
              </CampusAccess>
        
            }
          />
       
          <Route 
          path="/clerk/*"
          element={
            <CampusAccess>
            <Layout>
            <Routes>
              <Route path="/admission" element={<CampusAccess><Admission/></CampusAccess>}/>
              <Route path="/students" element={<CampusAccess><DisplayData/></CampusAccess>}/>
              <Route path="/notice" element={<CampusAccess><Notice/></CampusAccess>}/>
              <Route path="/attendence" element={<CampusAccess><CheckAttendence/></CampusAccess>}/>
              <Route path="/edit/:id" element={<CampusAccess><EditData/></CampusAccess>}/>
            </Routes>
            </Layout>
            </CampusAccess>
          }

          />

          <Route 
          path="/admin/*"
          element={
            <Layout>
            <Routes>
              <Route path="/admission" element={<CampusAccess><Admission/></CampusAccess>}/>
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
              <Route path="/assignments" element={<Assignments/>}/>
              <Route path="/notice" element={<Notice/>}/>
              <Route path="/profile" element={<StudentProfile/>}/>
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
