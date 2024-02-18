import React from "react";
import {
  Box,
  Typography,
  Toolbar,
  Button,
  AppBar,
  Tabs,
  Tab,
  Divider,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Result = () => {
  const [value, setValue] = React.useState(0);

  function TabPanel(props) {
    const { children, value, page } = props;
    return <div>{page === value && children}</div>;
  }
  return (
    <>
      <Toolbar>
        <Typography fontWeight={450} fontSize={35}>
          Result's
        </Typography>
        <Button startIcon={<AddIcon/>} variant="outlined" sx={{
          ml:'auto'
        }}>
          Add Unit Result
        </Button>
      </Toolbar>
      <Box
          sx={{
            bgcolor: "#fff",
            display: "flex",
            flexWrap: "wrap",
            borderRadius: "15px",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              padding: "1rem",
              width: "100%",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Tabs onChange={(e, value) => setValue(value)} value={value}>
              <Tab label="Unit Test" />
              <Tab label="Semester" />
            </Tabs>
          </Box>
          <Box p={2} >
            <TabPanel value={value} page={0}>
              Unit tess
            </TabPanel>
            <TabPanel value={value} page={1}>
              Sem
            </TabPanel>
          </Box>

      </Box>
    </>
  );
};

export default Result;
