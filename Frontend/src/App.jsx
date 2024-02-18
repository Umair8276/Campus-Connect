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
  CreateNotice
} from "./Pages/index.ts";
import { Layout } from "./Components/Layout/index.ts";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { UserAuth } from "./Authentication/UserAuth";
import { AppContext } from "./Context/AuthContext";
import { Assignment } from "@mui/icons-material";

function App() {
  const {user} = useContext(AppContext)
  return (
    <>
    <ToastContainer/>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Routes>
          <Route path="/" element={user && user.role ?  <UserAuth /> :  <Login />} />
          <Route path="/stlogin" element={ user && user.role ?  <UserAuth /> : <StLogin />} />
          <Route
            path="/faculty/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/result" element={<Result />} />
                  <Route path="/notice" element={<Notice />} />
                  <Route path="/attendance" element={<Attendance />} />
                  <Route path="/profile" element={<InstructorProfile />} />
                  <Route path="/batches" element={<Batches />} />
                 
                  <Route path="/assignments" element={<Assignments />} />
                  <Route path="/createnotice" element={<CreateNotice />} />
                  <Route path="/create-attendance" element={<CreateAttendance />} />
                  <Route path="/create-assignment" element={<CreateAssignment />} />
                </Routes>
              </Layout>
            }
          />
       
          <Route 
          path="/clerk/*"
          element={
            <Layout>
            <Routes>
              <Route path="/admission" element={<Admission/>}/>
              <Route path="/students" element={<DisplayData/>}/>
              <Route path="/notice" element={<Notice/>}/>
            </Routes>
            </Layout>
          }

          />

          <Route 
          path="/admin/*"
          element={
            <Layout>
            <Routes>
              <Route path="/admission" element={Admission}/>
            </Routes>
            </Layout>
          }

          />
          <Route 
          path="/student/*"
          element={
            <Layout>
            <Routes>
              <Route path="/admission" element={<Admission/>}/>
              <Route path="/assignments" element={<Assignments/>}/>
              <Route path="/notice" element={<Notice/>}/>
            </Routes>
            </Layout>
          }

          />
        
        </Routes>
      
      </LocalizationProvider>
    </>
  );
}

export default App;
