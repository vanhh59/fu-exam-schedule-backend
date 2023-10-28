module.exports = function (app) {
    let subjectController = require('../controllers/subject.controller');
    const { isAuthorized, isAuthenticated } = require('../controllers/auth.controller');

    //route get all
    app.get('/subject', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer", "Student"]), subjectController.getAll);

    //route get by id
    app.get('/subject/:id', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer", "Student"]), subjectController.getByID);

    //route create new subject
    app.post('/subject', isAuthenticated, isAuthorized(["Admin"]), subjectController.create);

    //route update subject
    app.put('/subject', isAuthenticated, isAuthorized(["Admin"]), subjectController.update);

    //route delete by id
    app.delete('/subject/:id', isAuthenticated, isAuthorized(["Admin"]), subjectController.deleteByUpdate);
}


