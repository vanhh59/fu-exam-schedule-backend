module.exports = function (app) {
    var dashboardController = require('../controllers/dashboard.controller');
    const { isAuthorized, isAuthenticated } = require('../controllers/auth.controller');

    //route exam schedule
    app.get('/exam-schedule', isAuthenticated, isAuthorized(['Testing Admin', 'Admin']), dashboardController.getExamSchedule)
    app.post('/exam-schedule', isAuthenticated, isAuthorized(['Testing Admin', 'Admin']), dashboardController.createExamSchedule)
    app.post('/register', isAuthenticated, isAuthorized(['Testing Admin', 'Admin', 'Lecturer']), dashboardController.register)
    app.post('/exam-room', isAuthenticated, isAuthorized(['Testing Admin', 'Admin']), dashboardController.fieldInfoExamSchedule)
    app.post('/exam-room/import-excel', isAuthenticated, isAuthorized(['Testing Admin', 'Admin']), dashboardController.importExcelFile)
    app.post('/exam-room/add-student', isAuthenticated, isAuthorized(['Testing Admin', 'Admin']), dashboardController.addStudentIntoExamRoom)
    app.put('/exam-room/update-register', isAuthenticated, isAuthorized(['Testing Admin', 'Admin', 'Lecturer']), dashboardController.updateRegister)
}