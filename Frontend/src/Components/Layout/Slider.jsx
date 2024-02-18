import React, { useContext, useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  ListItemIcon,
  Box,
  useColorScheme
} from "@mui/material";
import  Logo  from "../../assets/campusLogo.jpg";
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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Rotate90DegreesCcw } from "@mui/icons-material";
import {adminMenu,clerkMenu,studentMenu,facultyMenu} from "./SliderData"
import { AppContext } from "../../Context/AuthContext";

const Slider = ({role}) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [menu,setMenu] = useState([]);
  const [openHomeDrawer, setHomeOpenDrawer] = useState(false);
  const navigate = useNavigate();
  const location = useLocation()
  const {dispatch} = useContext(AppContext)

 
  
  useEffect( () => {
    let url = location.pathname
    if(url.includes("clerk") || role=="clerkMenu"){
      setMenu(clerkMenu)
    }
    else if(url.includes("admin") || role=="adminMenu"){
      setMenu(adminMenu)
    }
    else if(url.includes("student") || role=="studentMenu"){
      setMenu(studentMenu)
    }
    else{
      setMenu(facultyMenu)
    }
    console.log(menu)
    // if(role=="facultyMenu")
    // setMenu(facultyMenu)
   
  },[menu])

  useEffect( () => {
    console.log(role)
  },[])
 
  
  const [selectedIndex, setSelectedIndex] = React.useState();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const Logout = () => {
    dispatch({type:"LOGOUT"})
    navigate("/")
  }
  return  (
    <>
      <Drawer
        anchor="left"
        open={openHomeDrawer}
        onClose={() => setHomeOpenDrawer(false)}
        sx={{
          width: 240,
         
        }}
        variant="permanent"
        PaperProps={{
          sx: { width: 240 },
        }}
      >
        <IconButton
          onClick={() => setHomeOpenDrawer(!openHomeDrawer)}
          sx={{
            height: "4rem",
          }}
        >
          {/* <TipsLogo /> */}
          <h4 style={{color:"#16a085",fontSize:"20px"}}>Campus</h4>
          <img src={Logo} style={{width:"70px",height:"70px"}}/>
          <h4 style={{color:"#2980b9",fontSize:"20px"}}>Connect</h4>
          {/* <h3><span style={{color:"blue",fontSize:"35px"}}>C</span>ampus<span style={{color:"red",fontSize:"35px"}}>C</span>onnect</h3> */}
        </IconButton>

        <List>
          {menu.map((menu, index) => (
            <ListItem
              sx={{
                alignItems: "center",
              }}
              key={index}
            >
              <ListItemButton
                selected={selectedIndex === index}
                sx={{
                  borderRadius: "12px",
                  padding: "1rem",
                  color: selectedIndex === index ? "#2C62EE" : null,
                  bgcolor: selectedIndex === index ? "#ECF1FF" : null,
                  width: "10rem",
                }}
                key={index}
                onClick={(event) => {
                  handleListItemClick(event, index);
                  navigate(menu.path, { replace: true });
                }}
              >
                <ListItemIcon
                  sx={{
                    color: selectedIndex === index ? "#2C62EE" : null,
                  }}
                >
                  {menu.icon}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    fontWeight: selectedIndex === index ? 800 : "normal",
                  }}
                >
                  {menu.title}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
          
          <ListItem >
            <ListItemButton sx={{
              borderRadius:'12px',
              padding:'1rem',
              bgcolor:"#FFEFEF",
              color:"#F93333",
            }} onClick={Logout}>
              <ListItemIcon >
                <PowerSettingsNewOutlinedIcon sx={{
                  transform:"rotate(270deg)",
                  color:"#F93333"
                }}/>
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>

      </Drawer>
    </>
  );
};

export default Slider;
