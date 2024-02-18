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
  ];


  export const clerkMenu = [
    
    { 
      title: "Admission",
      icon: <BackHandOutlinedIcon />,
      path: "/clerk/admission",
    },
    {
      title: "Students",
      icon: <NoteAltOutlinedIcon />,
      path: "/clerk/students",
    },
    {
      title: "Notice",
      icon: <NoteAddOutlinedIcon />,
      path: "/clerk/notice",
    },
  ];
  
  export const studentMenu = [
    
    {
      title: "student",
      icon: <BackHandOutlinedIcon />,
      path: "/student/attendance",
    },
    {
      title: "Assignments",
      icon: <NoteAltOutlinedIcon />,
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
      title: "Attendece",
      icon: <BackHandOutlinedIcon />,
      path: "/faculty/attendance",
    },
    {
      title: "Assignments",
      icon: <NoteAltOutlinedIcon />,
      path: "/faculty/assignments",
    },
    // {
    //   title: "Batches",
    //   icon: <LayersIcon />,
    //   path: "/faculty/batches",
    // },
    {
      title: "Notice",
      icon: <NoteAddOutlinedIcon />,
      path: "/faculty/notice",
    },
  ]
  
  