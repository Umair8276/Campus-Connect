import React from "react";
import { Paper, Box, Typography, Stack, Rating, Divider } from "@mui/material";
const CoursesCard = ({ id, title, category,review, price, thumbnail,ratings }) => {
  return (
    <Paper
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
      <Box
        sx={{
          backgroundImage: `url(${thumbnail})`,
          width: "100%",
          height: "13rem",
          borderRadius: "8px",
          backgroundRepeat: "no-repeat",
          padding: "1rem",
        }}
      >
        <Stack
          sx={{
            maxWidth: "5rem",
            width: "auto",
            height: "2.5rem",
            padding: "15px",
            justifyContent: "center",
            borderRadius: "9px",
            background: "rgba( 255, 255, 255, 0.7 )",
            boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37",
            WebkitBackdropFilter: "blur( 4px )",
            border: "1px solid rgba( 255, 255, 255, 0.18 )",
          }}
        >
          <Typography sx={{ fontWeight: "600" }}>{category}</Typography>
        </Stack>
      </Box>
      <Typography fontWeight={500}  sx={{
        whiteSpace:'nowrap',
        width:'250px',
        overflow:'hidden',
        textOverflow:'ellipsis',

      }}>{title}</Typography>
      <Stack direction="row" gap={2}>
        <Rating precision={0.5} readOnly value={ratings} />
        <Typography>({review})</Typography>
      </Stack>
      <Divider light />
      <Stack
        px={1.5}
        py={0.5}
        borderRadius={1}
        bgcolor="#e5f7ee"
        height="fit-content"
        width="fit-content"
        
      >
        <Typography fontWeight={700} fontSize={25} color="#03753c">
          ${price}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default CoursesCard;
