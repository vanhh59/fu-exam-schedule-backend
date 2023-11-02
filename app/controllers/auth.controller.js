const express = require('express');
const app = express();
const session = require('express-session');


function isAuthorized(allowedRoles) {
  return (req, res, next) => {
    const user = session.user;
    if (!user) {
      return res.status(401).send('Unauthorized');
    } else if (!allowedRoles.includes(user[0].Role.trim())) {
      return res.status(403).send('Forbidden');
    }
    next();
  };
}

// Middleware to check if a user is authenticated
function isAuthenticated(req, res, next) {
  if (session.user) {
    return next();
  }
  res.status(401).send('Unauthenticated');
}

module.exports = { isAuthorized, isAuthenticated };
