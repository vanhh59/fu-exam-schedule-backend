module.exports = function (app) {
    var courseController = require('../controllers/course.controller');
    const { isAuthorized, isAuthenticated } = require('../controllers/auth.controller');
    
    //route lấy tất cả
    app.get('/course', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer", "Student"]), courseController.getListAll);
    //route lấy theo id
    app.get('/course/:id', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer", "Student"]), courseController.getListByID);
    
    //route lấy theo subjectID
    app.get('/course/subject/:id', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer", "Student"]), courseController.getCourseBySubjectID);
    //route lấy theo name
    app.post('/course/name', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer", "Student"]), courseController.getByName);

    //route thêm mới
    app.post('/course', isAuthenticated, isAuthorized(["Admin"]), courseController.createCourse);

    //route update
    app.put('/course/:id', isAuthenticated, isAuthorized(["Admin"]), courseController.updateCourse);

    //route xóa theo id
    app.delete('/course/:id', isAuthenticated, isAuthorized(["Admin"]), courseController.deleteCourseByID);
}

