module.exports = function (app) {
    var semesterController = require('../controllers/semester.controller');
    const { isAuthorized, isAuthenticated } = require('../controllers/auth.controller');

    //route get all
    app.get('/semester', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer", "Student"]), semesterController.getListAll);

    //route get by id
    app.get('/semester/:id', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer", "Student"]), semesterController.getListByID);

    //route create new semester
    app.post('/semester', isAuthenticated, isAuthorized(["Admin"]), semesterController.createNew);

    //route update semester
    app.put('/semester/:id', isAuthenticated, isAuthorized(["Admin"]), semesterController.update);

    //route delete by id
    app.put('/semester/:id', isAuthenticated, isAuthorized(["Admin"]), semesterController.deleteByID);
}