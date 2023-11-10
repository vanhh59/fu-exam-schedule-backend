require('dotenv').config();

// IMPORT CONNECT DB
const { conn, sql } = require('./connect');

// IMPORT LIBRARY
const express = require('express');
const cors = require("cors");
const fileUpload = require('express-fileupload');
const session = require('express-session');
const authRouter = require('./app/routes/auth.route');
const { OAuth2Client } = require("google-auth-library");

const User = require("./app/models/users.model");
let authUser = new User();

const bodyParser = require('body-parser');

const app = express();

// Configure CORS to allow requests only from localhost:3000
const corsOptions = {
    origin: ['http://localhost:3000', 'https://fu-exam-schedule.vercel.app', 'https://login-with-google-react-kdffy6.stackblitz.io', 
  'https://fpt-swp391.postman.co/'],
    credentials: true,
};


const port = process.env.PORT || 4000;

app.use(cors({
    credentials: true,
    origin: corsOptions
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

const client = new OAuth2Client("248305583189-gi11o6gn6552ctrve0eqlfj83l9sm90c.apps.googleusercontent.com");

const users = [];

function upsert(array, item) {
  const i = array.findIndex((_item) => _item.email === item.email);
  if (i > -1) array[i] = item;
  else array.push(item);
}

// Login google
app.post("/api/google-login", async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: "248305583189-gi11o6gn6552ctrve0eqlfj83l9sm90c.apps.googleusercontent.com",
  });

  const { name, email, picture } = ticket.getPayload();
  upsert(users, { name, email, picture });
  res.status(201);
  res.json({ name, email, picture });
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
require('./app/routes/examRoom.router')(app);

//mở server tại port 4000
app.listen(4000, function () {
    console.log("Server is running at http://localhost:4000");
});
