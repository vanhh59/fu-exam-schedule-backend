module.exports = function (app) {
    var loginController = require('../controllers/login.controller');


    app.get('/login', loginController.getRole);
}