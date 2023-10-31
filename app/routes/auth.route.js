// authRouter.js
const express = require('express');
const User = require('../models/users.model');
const user = new User();

const { isAuthorized } = require('../controllers/auth.controller');
const authRouter = express.Router();

// Define your routes for authentication
authRouter.get('/login', (req, res) => {
  // Create a login form in your view
  res.redirect('https://fu-exam-schedule.vercel.app/');
//   res.send('/login');
});

authRouter.post('/login', (req, res) => {
  const { email } = req.body;

  user.getUsersByEmail(email, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    if (user) {
      // User found, store user information in the session
      req.session.user = user;
      res.status(200).send({message: 'Login successful', userInfo: user});
    } else {
      res.status(401).send('Email invalid');
    }
  });
});

authRouter.get('/logout', isAuthenticated, (req, res) => {
  // Clear the session and log the user out
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
    // res.redirect('/login');
    res.status(200).send('Logout successful');
  });
});

authRouter.post('/register', (req, res) => {
  const { email } = req.body;

  user.checkEmailIsValid(email, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send({ result: data, error: err });
      return;
    }
    if (data[0]?.EmailExists == 1) {
      res.status(401).send('Account is valid');
    } else {
      user.registerUser(req.body, (err, data) => {
        if (err) {
          console.error(err);
          res.status(400).send('Email is valid');
          return;
        } else {
          // User found, store user information in the session
          req.session.user = user;
          res.status(200).send({message: 'Register successful', role: 'Student'});
          return;
        }
      });
    }
  });
});

authRouter.post('/authorize', isAuthorized(["Admin"]), (req, res) => {
  user.authorizeUser(req.body, (err, data) => {
    if (err) {
      res.status(400).send({ result: data, error: err });
    } else {
      res.status(200).send({ result: data, message:`Authorize Successful for user ${req.body.ID}`, role: `${req.body.Role}`, error: err });
    }
  });
});

// Middleware to check if a user is authenticated
function isAuthenticated(req, res, next) {
	if (req.session?.user) {
    return next();
  }
  return res.status(401).send('Unauthorized');
}

module.exports = authRouter;
