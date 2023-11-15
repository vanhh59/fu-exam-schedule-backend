const passport = require('passport');

module.exports = function (app) {
    var loginController = require('../controllers/login.controller');
    const { isAuthorized, isAuthenticated } = require('../controllers/auth.controller');

    // app.get('/login', loginController.getRole);
}