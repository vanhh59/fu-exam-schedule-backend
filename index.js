require('dotenv').config();

// IMPORT CONNECT DB
const { conn, sql } = require('./connect');

// IMPORT LIBRARY
const express = require('express');
const cors = require("cors");
const fileUpload = require('express-fileupload');
const session = require('express-session');
const authRouter = require('./app/routes/auth.route');

const bodyParser = require('body-parser');

const app = express();

// Configure CORS to allow requests only from localhost:3000
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};


const port = process.env.PORT || 4000;

app.use(cors({
    credentials: true,
    origin: '*'
}))
app.use(fileUpload());
app.use(express.json());
app.use(session({
    secret: 'local',
    resave: false,
    saveUninitialized: true,
}));
app.use(bodyParser.json());
app.use('/auth', authRouter);

app.get('', function (req, res) {
    res.send('<a href="https://fu-exam-schedule.vercel.app/">FU Exam Schedule</a>');
});

require('./app/routes/classroom.route')(app);
require('./app/routes/exambatch.route')(app);
require('./app/routes/course.route')(app);
require('./app/routes/student.route')(app);
require('./app/routes/semester.route')(app);
require('./app/routes/examiner.route')(app);
require('./app/routes/department.route')(app);
require('./app/routes/examSlot.route')(app);
require('./app/routes/subject.route')(app);
require('./app/routes/login.route')(app);
require('./app/routes/dashboard.route')(app);
require('./app/routes/download.route')(app);

app.get("/", (req, res) => {
    req.session
})

//mở server tại port 4000
app.listen(4000, function () {
    console.log("Server is running at http://localhost:4000");
});
