// authRouter.js
const express = require('express');
const User = require('../models/users.model'); // Import the authentication model
const user = new User();
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
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid username or password');
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

// Middleware to check if a user is authenticated
function isAuthenticated(req, res, next) {
	if (req.session?.user) {
    return next();
  }
  return res.status(401).send('Unauthorized');
}

module.exports = authRouter;
