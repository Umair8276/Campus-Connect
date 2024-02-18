import React from 'react'
import { Box, Button, Toolbar, Typography } from "@mui/material";
import BatchList from '../Components/common/BatchList';
const Batches = () => {
  return (
    <Box
        sx={{
          display: "flex",
          gap: 3,
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Toolbar>
          <Typography fontWeight={450} fontSize={35}>
            Batch Details
          </Typography>
        </Toolbar>
        <BatchList/>
        <BatchList/>
        <BatchList/>
        <BatchList/>
        
        </Box>
  )
}

export default Batches