// authRouter.js
const express = require('express');
const User = require('../models/users.model');
const user = new User();
const axios = require('axios');
const session = require('express-session');

const { isAuthenticated, isAuthorized } = require('../controllers/auth.controller');
const authRouter = express.Router();

// Login thủ công -> Phân quyền
authRouter.post('/login', (req, res) => {
  const { email } = req.body;
  user.getUsersByEmail(email, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    } else {
      // User found, store user information in the session
      session.user = user;
      console.log(session);
      res.status(200).send({ ok:true, message: 'Login successful', userInfo: user });
    }
  });
});

// Logout
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

// Đăng ký tài khoản
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
          res.status(200).send({ userInfo: data, message: 'Register successful', role: 'Student' });
          return;
        }
      });
    }
  });
});

// Chức năng phân quyền dành cho role Admin
authRouter.post('/authorize', isAuthenticated, isAuthorized(["Admin"]), (req, res) => {
  user.authorizeUser(req.body, (err, data) => {
    if (err) {
      res.status(400).send({ result: data, error: err });
    } else {
      res.status(200).send({ result: data, message: `Authorize Successful for user ${req.body.ID}`, role: `${req.body.Role}`, error: err });
    }
  });
});

authRouter.get(
  "/get-account",
  isAuthenticated,
  isAuthorized(["Admin"]),
  (req, res) => {
    user.getAllUsers(function (err, data) {
      if (err) {
        res.status(400).send({ result: data, error: err });
      } else {
        res.status(200).send({ result: data, error: err });
      }
    });
  }
);

module.exports = authRouter;