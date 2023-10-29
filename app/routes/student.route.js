module.exports = function (app) {
    let studentController = require('../controllers/student.controller');
    const { isAuthorized, isAuthenticated } = require('../controllers/auth.controller');

    //route get all
    app.get('/student', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer", "Student"]), studentController.getListAll);

    //route get by id
    app.get('/student/:id', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer", "Student"]), studentController.getListByID);

    //route get by email
    app.get('/student/email/:email', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer", "Student"]), studentController.getStudentByEmail);

    //View all exam slot belong to the user
    app.get('/student/viewExamSlot/all', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer", "Student"]), studentController.getExamSlotByStudentId);

    //route create new student
    app.post('/student', isAuthenticated, isAuthorized(["Admin"]), studentController.createStudent);

    //route update student
    app.put('/student/', isAuthenticated, isAuthorized(["Admin"]), studentController.updateStudent);

    //route update status
    app.put('/student/status/:id', isAuthenticated, isAuthorized(["Admin"]), studentController.deleteStudent);
}