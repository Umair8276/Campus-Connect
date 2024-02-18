import React, { useEffect, useState } from "react";
import { Header } from "./index.ts";
import { Slider } from "./index.ts";
import { Box,useTheme } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";

const Layout = ({ children }) => {
  // const [url,setUrl] = useState("");
  // const location = useLocation()
  //  useEffect( () => {
  //   setUrl(location.pathname);
  //  },[])
  return (
    <Box display='flex'  height='100%'>
      {/* {
        url == "/clerk"
        ?

      } */}
      <Slider />
      <Header />
      <Box  sx={{
        margin: '6rem 2rem',
        width: '100%',
      }}>
      {children}
      </Box>
    </Box>
  );
};

export default Layout;
