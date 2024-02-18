import { Paper,Box,Typography,Stack,Card,CardMedia,CardContent } from '@mui/material'
import React from 'react'


const InstructorCard = ({id,name,title,img}) => {
  return (
    <Card
    elevation={2}
    sx={{
      width: "280px",
      padding: "10px",
      "&:hover": {
        boxShadow: "0 22px 45px 2px rgba(176, 176, 176, 0.1)",
      },
      cursor: "pointer",
      borderRadius: "12px",
      height: "auto",
      display: "flex",
      flexDirection: "column",
      gap: 2,
    }}
    >
        <CardMedia
            image={img}
            sx={{
                width: "100%",
                height: "13rem",
                borderRadius: "8px",
                backgroundRepeat: "no-repeat",
              }}
        />
        <CardContent sx={{
            display: "flex",
            flexDirection: "column",
            textAlign:'center',
            gap:(1),
        }}>
              <Typography fontWeight={600}>{name}</Typography>
              <Typography fontWeight={400}>{title}</Typography>
        </CardContent>
    </Card>
  )
}

export default InstructorCard