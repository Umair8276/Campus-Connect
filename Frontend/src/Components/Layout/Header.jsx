import React, { useContext, useEffect, useRef, useState } from "react";

// MUI Materials
import {
  Container,
  Box,
  Stack,
  Typography,
  AppBar,
  Toolbar,
  Tab,
  Tabs,
  Button,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
} from "@mui/material";

// Components
import Slider from "./Slider";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AuthContext";

const Header = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [openLogin, setOpenLogin] = useState(false);
  const {user} = useContext(AppContext)

  const handleClickOpenLogin = () => {
    setOpenLogin(true);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickCloseLogin = () => {
    setOpenLogin(false);
  };
  const handleClickClose = () => {
    setOpen(false);
  };


  const settings = ["Profile"];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleProfileMenu = () => {
    navigate("/instructor/profile",{replace:true});
    setAnchorElUser(null);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const drawerWidth = 240;



  return  (
    <AppBar
      position="fixed"
      elevation={0}
      // fullWidth
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
    >
      <Toolbar>
        <Typography variant="h5">{user.name}</Typography>
        <Box
          sx={{
            flexGrow: 0,
            marginLeft: "auto",
          }}
        >
          <Tooltip title="Open Settings">
            <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
              <Avatar />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleProfileMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
