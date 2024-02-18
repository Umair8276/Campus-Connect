const express = require('express');
const dotenv = require("dotenv");
const cors = require("cors")
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const bodyParser=require('body-parser');
app.use(bodyParser.json())


const PORT = process.env.PORT
const URI = process.env.URI
// Connection
const {connection} = require("./Config/Conn")
connection(URI)    // function call

app.listen(PORT ,() => {
    console.log(`Backend Started on port ${PORT}` )
});

// Importing Routes
const facultyRoute = require("./Routes/FacultyRegistrationRoutes");
app.use("/api/fac",facultyRoute)

const AdmissionRoute = require("./Routes/AdmissionRoutes");
app.use("/api/stu",AdmissionRoute)

const AssignmentRoute= require("./Routes/AssignmentRoutes");
app.use("/api/ass",AssignmentRoute)

const NoticeRoute= require("./Routes/NoticeRoute");
app.use("/api/notice",NoticeRoute)

const attendenceRoute= require("./Routes/AttendenceRoute");
app.use("/api/att",attendenceRoute)

