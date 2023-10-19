module.exports = function (app) {
    var dashboardController = require('../controllers/dashboard.controller');

    //route exam schedule
    app.get('/exam-schedule', dashboardController.getExamSchedule)
    app.post('/exam-schedule', dashboardController.createExamSchedule)
    app.post('/register', dashboardController.register)
}