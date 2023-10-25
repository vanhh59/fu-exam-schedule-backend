const express = require('express');
const app = express();


function isAuthorized(allowedRoles) {
  return (req, res, next) => {
    const user = req.session.user;

    if (!user) {
      return res.status(401).send('Unauthorized');
    }

    // Check if the user has one of the allowed roles
    if (!allowedRoles.includes(user[0].Role.trim())) {
      return res.status(403).send('Forbidden');
    }

    // If the user is authorized, allow them to access the route
    next();
  };
}

// Middleware to check if a user is authenticated
function isAuthenticated(req, res, next) {
	if (req.session?.user) {
    return next();
  }
  res.status(401).send('Unauthorized');
}

module.exports = { isAuthorized, isAuthenticated };