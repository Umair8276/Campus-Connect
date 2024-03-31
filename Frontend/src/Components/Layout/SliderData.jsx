import  TipsLogo  from "../../assets/tips.svg";
// icons
import BackHandOutlinedIcon from '@mui/icons-material/BackHandOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import MenuIcon from "@mui/icons-material/Menu";
import GridViewIcon from "@mui/icons-material/GridView";
import SchoolIcon from "@mui/icons-material/School";
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import LayersIcon from "@mui/icons-material/Layers";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PaymentsIcon from '@mui/icons-material/Payments';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PersonIcon from '@mui/icons-material/Person';

export const adminMenu = [

    
    {
      title: "Attendance",
      icon: <BackHandOutlinedIcon />,
      path: "/admin/attendance",
    },
    {
      title: "Assignments",
      icon: <NoteAltOutlinedIcon />,
      path: "/admin/assignments",
    },
    {
      title: "Batches",
      icon: <LayersIcon />,
      path: "/admin/batches",
    },
    {
      title: "Notice",
      icon: <NoteAddOutlinedIcon />,
      path: "/admin/notice",
    },
    {
      title: "Fees",
      icon: <NoteAddOutlinedIcon />,
      path: "/clerk/checkfees",
    },
  ];


  export const clerkMenu = [
    
    { 
      title: "Admission",
      icon: <AccountBalanceIcon />,
      path: "/clerk/admission",
    },
    {
      title: "Students",
      icon: <GroupAddIcon />,
      path: "/clerk/students",
    },
    {
      title: "Attendence",
      icon: <BackHandOutlinedIcon />,
      path: "/clerk/attendence",
    },
    {
      title: "Notice",
      icon: <NoteAddOutlinedIcon />,
      path: "/clerk/notice",
    },
    {
      title: "Fees",
      icon: <PaymentsIcon />,
      path: "/clerk/checkfees",
    },
  ];
  
  export const studentMenu = [
    
    {
      title: "Student",
      icon: <PersonIcon />,
      path: "/student/profile",
    },
    {
      title: "Assignments",
      icon: <AutoStoriesIcon />,
      path: "/student/assignments",
    },

    {
      title: "Notice",
      icon: <NoteAddOutlinedIcon />,
      path: "/student/notice",
    },
  ];
  
  export const facultyMenu = [
    
    {
      title: "Attendence",
      icon: <BackHandOutlinedIcon />,
      path: "/faculty/attendance",
    },
    {
      title: "Assignments",
      icon: <AutoStoriesIcon />,
      path: "/faculty/assignments",
    },
  
    {
      title: "Notice",
      icon: <NoteAddOutlinedIcon />,
      path: "/faculty/notice",
    },
    {
      title: "Fees",
      icon: <PaymentsIcon />,
      path: "/faculty/checkfees",
    },
  ]
  
  