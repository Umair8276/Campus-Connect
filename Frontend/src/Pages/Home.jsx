import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";
import CoursesCard from "../Components/common/CoursesCard";
import CategoryCard from "../Components/common/CategoryCard";
import InstructorCard from "../Components/common/InstructorCard";
import  Dash from "../assets/main.svg";
import  Ins from "../assets/instructor.svg";
import  Std from "../assets/students.svg";
import  Video from "../assets/video.svg";
import Pepole from "../assets/pepole.svg";
import courses from "../courses.json"
import instructors from "../instructors.json"

// import { ReactComponent as HtmlB } from "../assets/htmlB.svg";
// import { ReactComponent as BusinessB } from "../assets/businessB.svg";
// import { ReactComponent as BusinessB2 } from "../assets/businessB2.svg";
// import { ReactComponent as DesignB } from "../assets/designB.svg";

// import { ReactComponent as Inst1 } from "../assets/inst1.svg";
// import { ReactComponent as Inst2 } from "../assets/inst2.svg";
// import { ReactComponent as Inst3 } from "../assets/inst3.svg";
// import { ReactComponent as Inst4 } from "../assets/inst4.svg";

import CodeIcon from "@mui/icons-material/Code";
import BrushIcon from "@mui/icons-material/Brush";
import DeveloperModeIcon from "@mui/icons-material/DeveloperMode";
import StoreIcon from "@mui/icons-material/Store";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import NextWeekOutlinedIcon from "@mui/icons-material/NextWeekOutlined";
import CastForEducationOutlinedIcon from "@mui/icons-material/CastForEducationOutlined";

const HomePage = () => {
  // const courses = [
  //   {
  //     id: 1,
  //     title: "HTML Courses for Beginners",
  //     thumbnail: <HtmlB/>,
  //     category: "HTML",
  //     ratings: 3.5,
  //     review: "100",
  //     price: "200",
  //   },
  //   {
  //     id: 2,
  //     title: "Make Business Courses for Beginners",
  //     thumbnail: <BusinessB/>,
  //     category: "Business",
  //     ratings: 4.5,
  //     review: "150",
  //     price: "500",
  //   },
  //   {
  //     id: 3,
  //     title: "C++ Courses for Beginners",
  //     thumbnail: <BusinessB2 />,
  //     category: "Coding",
  //     ratings: 5,
  //     review: "1000",
  //     price: "700",
  //   },
  //   {
  //     id: 4,
  //     title: "Design Courses for Beginners to experience",
  //     thumbnail: <DesignB/>,
  //     category: "Design",
  //     ratings: 4,
  //     review: "100",
  //     price: "100",
  //   },
  // ];

  const category = [
    {
      id: 1,
      title: "Design",
      icon: <BrushIcon />,
    },
    {
      id: 2,
      title: "Development",
      icon: <CodeIcon />,
    },
    {
      id: 3,
      title: "Programming",
      icon: <DeveloperModeIcon />,
    },
    {
      id: 4,
      title: "Business",
      icon: <StoreIcon />,
    },
    {
      id: 5,
      title: "Health",
      icon: <FavoriteBorderOutlinedIcon />,
    },
    {
      id: 6,
      title: "Self development",
      icon: <LightbulbOutlinedIcon />,
    },
    {
      id: 7,
      title: "Finance",
      icon: <NextWeekOutlinedIcon />,
    },
    {
      id: 8,
      title: "Teaching",
      icon: <CastForEducationOutlinedIcon />,
    },
  ];

  // const instructors =[
  //   {
  //     id:1,
  //     name:'Jacob Jones',
  //     title:'UI-UX Design Expart',
  //     img:<Inst1/>,
  //   },
  //   {
  //     id:2,
  //     name:'Alice Michael',
  //     title:'Social Media Expart',
  //     img:<Inst2/>,
  //   },
  //   {
  //     id:3,
  //     name:'San Fero',
  //     title:'Business Idea Expart',
  //     img:<Inst3/>,
  //   },
  //   {
  //     id:4,
  //     name:'Adidas Co',
  //     title:'Photograpy Expart',
  //     img:<Inst4/>,
  //   },
  // ];
  return (
    <Box
  
      sx={{
        bgcolor: "#EEEEEE",
        padding:'0px 0px 10px 0px'
      }}
    >
      <Box
      
        sx={{
          bgcolor: "#7286D3",
          width: "auto",
          height: "auto",
          display: "flex",
          flexWrap: "wrap",
          flexdirection: { xs: "row", sm: "column" },
          justifyContent: "space-around",
        }}
      >
        <Stack
          sx={{
            marginTop: "10rem",
            gap: 2,
          }}
        >
          <Typography
            sx={{
              color: "#ECF2FF",
            }}
          >
            START TO SUCCESS
          </Typography>
          <Typography
            variant="h4"
            color="white"
            sx={{
              width: "25rem",
            }}
          >
            Access To 5000+ Courses from 300 Instructors & Institutions
          </Typography>
        </Stack>
        <Stack>
          <Dash height="25rem" width="25rem" />
        </Stack>
      </Box>
      <Box
        sx={{
          flexWrap: "wrap",
          gap: 2,
          display: "flex",
          flexdirection: { xs: "row", sm: "column" },
          justifyContent: "center",
          padding: "1.5rem",
          bgcolor: "#E9F8F3",
        }}
      >
        <Box display="flex" gap={0.5}>
          <Ins height="3rem" />
          <Stack direction="column">
            <Typography sx={{ fontWeight: "600" }}>300</Typography>
            <Typography>Instructor</Typography>
          </Stack>
        </Box>
        <Box display="flex" gap={0.5}>
          <Std height="3rem" />
          <Stack direction="column">
            <Typography sx={{ fontWeight: "600" }}>2200+</Typography>
            <Typography>Students</Typography>
          </Stack>
        </Box>
        <Box display="flex" gap={0.5}>
          <Video height="3rem" />
          <Stack direction="column">
            <Typography sx={{ fontWeight: "600" }}>300+</Typography>
            <Typography>Video</Typography>
          </Stack>
        </Box>
        <Box display="flex" gap={0.5}>
          <Pepole height="3rem" />
          <Stack direction="column">
            <Typography sx={{ fontWeight: "600" }}>4000+</Typography>
            <Typography>Users</Typography>
          </Stack>
        </Box>
      </Box>
      <Box
        sx={{
          margin: "3rem 7rem",
          display: "flex",
          gap: 5,
          flexDirection: "column",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "450", fontSize: "2.5rem" }}>
          Most <span style={{ color: "#3461FD" }}>Popular Course</span>
        </Typography>
        <Box
          sx={{
            gap: 5,
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
          }}
        >
          {courses.map((course) => (
            <CoursesCard
              key={course.id}
              id={course.id}
              title={course.title}
              category={course.category}
              review={course.review}
              price={course.price}
              thumbnail={course.thumbnail}
              ratings={course.ratings}
            />
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          margin: "13rem 7rem",
          display: "flex",
          gap: 5,
          flexDirection: "column",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "450", fontSize: "2.5rem" }}>
          Most <span style={{ color: "#3461FD" }}>Popular Category</span>
        </Typography>
        <Box
          sx={{
            gap: 5,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          
          {category.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              title={category.title}
              icon={category.icon}
            />
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          margin: "3rem 7rem",
          display: "flex",
          gap: 5,
          flexDirection: "column",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "450", fontSize: "2.5rem" }}>
          Our Best <span style={{ color: "#3461FD" }}>Instructor</span>
        </Typography>
        <Box
          sx={{
            gap: 5,
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
          }}
        >
          {
            instructors.map((instructor) =>(

              <InstructorCard
                key={instructor.id}
                id={instructor.id}
                title={instructor.title}
                name={instructor.name}
                img={instructor.img}
              />
            ))
          }
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
