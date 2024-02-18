import React from "react";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
const BatchList = () => {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <Box
        sx={{
          bgcolor: "#fff",
          flexWrap: "wrap",
          borderRadius: "15px",
          flexDirection: "row",
          height: "5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0px 20px",
        }}
      >
        <Typography fontWeight={500} fontSize={20}>
          BECO-20
        </Typography>
        <Button variant="text">Computer</Button>
        <IconButton title="More" onClick={handleClick}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>
      {open ? (
        <>
          <Box
            sx={{
              height: "auto",
              bgcolor: "#fff",
              borderRadius: "15px",
              padding: "20px",
            }}
          >
            <Stack flexDirection="row" justifyContent="space-between">
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Typography color="#7E7E7E" fontSize={16}>
                  Department :
                </Typography>
                <Typography fontSize={16} fontWeight={450}>
                  Computer Science
                </Typography>
              </Stack>
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Typography color="#7E7E7E" fontSize={16}>
                  Batch :
                </Typography>
                <Typography fontSize={16} fontWeight={450}>
                  2020
                </Typography>
              </Stack>
            </Stack>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                mt: 2,
              }}
            >
              <Typography color="#7E7E7E" fontSize={16}>
                Course :
              </Typography>
              <Typography fontSize={16} fontWeight={450}>
                B.Tech In Computer Science and Engineering Specialization in
                Health Informatics
              </Typography>
            </Stack>
            <Typography mt={5} fontSize={20} fontWeight={450}>Total Students : 66</Typography>
            <Box
              sx={{
                display: "flex",
                mt: 6,
                flexDirection: "column",
              }}
            >
              <Typography color="#7E7E7E" fontSize={22} fontWeight={450}>
                Subjects
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  gap: "3rem",
                  padding: "2rem",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent:'space-between'
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <Typography fontWeight={450} fontSize={18}>
                      Semester 1
                    </Typography>
                    <Typography color="#7E7E7E" fontSize={16}>
                      C++ Language
                    </Typography>
                    <Typography color="#7E7E7E" fontSize={16}>
                      OOPS using C#
                    </Typography>
                    <Typography color="#7E7E7E" fontSize={16}>
                      Introduction to Bootstrap
                    </Typography>
                    <Typography color="#7E7E7E" fontSize={16}>
                      Graphics Designing
                    </Typography>
                  </Box>
                  <Button startIcon={<FileDownloadOutlinedIcon/>}  >
                    Download Syllabus
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent:'space-between'
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <Typography fontWeight={450} fontSize={18}>
                      Semester 2
                    </Typography>
                    <Typography color="#7E7E7E" fontSize={16}>
                      C++ Language
                    </Typography>
                    <Typography color="#7E7E7E" fontSize={16}>
                      OOPS using C#
                    </Typography>
                    <Typography color="#7E7E7E" fontSize={16}>
                      Introduction to Bootstrap
                    </Typography>
                    <Typography color="#7E7E7E" fontSize={16}>
                      Graphics Designing
                    </Typography>
                  </Box>
                  <Button startIcon={<FileDownloadOutlinedIcon/>}  >
                    Download Syllabus
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent:'space-between'
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <Typography fontWeight={450} fontSize={18}>
                      Semester 3
                    </Typography>
                    <Typography color="#7E7E7E" fontSize={16}>
                      C++ Language
                    </Typography>
                    <Typography color="#7E7E7E" fontSize={16}>
                      OOPS using C#
                    </Typography>
                    <Typography color="#7E7E7E" fontSize={16}>
                      Introduction to Bootstrap
                    </Typography>
                    <Typography color="#7E7E7E" fontSize={16}>
                      Graphics Designing
                    </Typography>
                  </Box>
                  <Button startIcon={<FileDownloadOutlinedIcon/>}  >
                    Download Syllabus
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent:'space-between'
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <Typography fontWeight={450} fontSize={18}>
                      Semester 4
                    </Typography>
                    <Typography color="#7E7E7E" fontSize={16}>
                      C++ Language
                    </Typography>
                    <Typography color="#7E7E7E" fontSize={16}>
                      OOPS using C#
                    </Typography>
                    <Typography color="#7E7E7E" fontSize={16}>
                      Introduction to Bootstrap
                    </Typography>
                    <Typography color="#7E7E7E" fontSize={16}>
                      Graphics Designing
                    </Typography>
                  </Box>
                  <Button startIcon={<FileDownloadOutlinedIcon/>}  >
                    Download Syllabus
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent:'space-between'
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <Typography fontWeight={450} fontSize={18}>
                      Semester 5
                    </Typography>
                    <Typography color="#7E7E7E" fontSize={16}>
                      C++ Language
                    </Typography>
                    <Typography color="#7E7E7E" fontSize={16}>
                      OOPS using C#
                    </Typography>
                    <Typography color="#7E7E7E" fontSize={16}>
                      Introduction to Bootstrap
                    </Typography>
                    <Typography color="#7E7E7E" fontSize={16}>
                      Graphics Designing
                    </Typography>
                  </Box>
                  <Button startIcon={<FileDownloadOutlinedIcon/>}  >
                    Download Syllabus
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent:'space-between'
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <Typography fontWeight={450} fontSize={18}>
                      Semester 6
                    </Typography>
                    <Typography color="#7E7E7E" fontSize={16}>
                      C++ Language
                    </Typography>
                    <Typography color="#7E7E7E" fontSize={16}>
                      OOPS using C#
                    </Typography>
                    <Typography color="#7E7E7E" fontSize={16}>
                      Introduction to Bootstrap
                    </Typography>
                    <Typography color="#7E7E7E" fontSize={16}>
                      Graphics Designing
                    </Typography>
                  </Box>
                  <Button startIcon={<FileDownloadOutlinedIcon/>}  >
                    Download Syllabus
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent:'space-between'
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <Typography fontWeight={450} fontSize={18}>
                      Semester 7
                    </Typography>
                    <Typography color="#7E7E7E" fontSize={16}>
                      C++ Language
                    </Typography>
                    <Typography color="#7E7E7E" fontSize={16}>
                      OOPS using C#
                    </Typography>
                    <Typography color="#7E7E7E" fontSize={16}>
                      Introduction to Bootstrap
                    </Typography>
                    <Typography color="#7E7E7E" fontSize={16}>
                      Graphics Designing
                    </Typography>
                  </Box>
                  <Button startIcon={<FileDownloadOutlinedIcon/>}  >
                    Download Syllabus
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent:'space-between'
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <Typography fontWeight={450} fontSize={18}>
                      Semester 8
                    </Typography>
                    <Typography color="#7E7E7E" fontSize={16}>
                      C++ Language
                    </Typography>
                    <Typography color="#7E7E7E" fontSize={16}>
                      OOPS using C#
                    </Typography>
                    <Typography color="#7E7E7E" fontSize={16}>
                      Introduction to Bootstrap
                    </Typography>
                    <Typography color="#7E7E7E" fontSize={16}>
                      Graphics Designing
                    </Typography>
                  </Box>
                  <Button startIcon={<FileDownloadOutlinedIcon/>}  >
                    Download Syllabus
                  </Button>
                </Box>

               
              </Box>
            </Box>
          </Box>
        </>
      ) : null}
    </>
  );
};

export default BatchList;
