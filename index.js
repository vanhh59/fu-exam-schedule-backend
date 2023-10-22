require('dotenv').config();
const { conn, sql } = require('./connect');

const express = require('express');
const cors = require("cors");
const fileUpload = require('express-fileupload');

const bodyParser = require('body-parser');

const app = express();

// Configure CORS to allow requests only from localhost:3000
const corsOptions = {
    origin: 'http://localhost:3000',
};

app.use(cors(corsOptions))
app.use(fileUpload());
app.use(express.json());

const port = process.env.PORT || 4000;

app.use(bodyParser.json());

app.get('', function (req, res) {
    res.send('<a href="https://fu-exam-schedule.vercel.app/">FU Exam Schedule</a>');
});

// routers
require('./app/routes/student.route')(app);
require('./app/routes/examiner.route')(app);
require('./app/routes/department.route')(app);
require('./app/routes/examSlot.route')(app);
require('./app/routes/subject.route')(app);
require('./app/routes/login.route')(app);
require('./app/routes/dashboard.route')(app);


//mở server tại port 4000
app.listen(4000, function () {
    console.log("Server is running at http://localhost:4000");
});
