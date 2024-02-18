import { Paper, Stack, Tooltip, Typography } from '@mui/material'
import React from 'react'
const CategoryCard = ({id,title,icon}) => {
  return (
    <Paper
        elevation={2}
        sx={{
            height:'3rem',
            width:'15rem',
            borderRadius:'15px',
        }}
    >
        <Stack
        sx={{
            padding:'1rem',
            display:'flex',
            flexDirection:'row',
            gap:(2),
        }}
        >
            {icon}
            <Typography fontWeight={500}>{title}</Typography>
        </Stack>
        

    </Paper>
  )
}

export default CategoryCard