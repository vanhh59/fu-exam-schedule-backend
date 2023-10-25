module.exports = function (app) {
    var examBatchController = require('.../controllers/exambatch.controller');
    const { isAuthorized, isAuthenticated } = require('../controllers/auth.controller');

    //route lấy tất cả

    app.get('/exambatch', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer", "Student"]), examBatchController.getListAll);
    //route lấy theo id

    app.get('/exambatch/:id', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer", "Student"]), examBatchController.getListByID);

     //route get by CourseID

    app.get('/exambatch/:CourseID', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer", "Student"]),  examBatchController.getExambatchByCourseID);
    //route lay theo code

    app.get('/exambatch:code', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer", "Student"]), examBatchController.getByCode);

    //route thêm mới
    app.post('/exambatch', isAuthenticated, isAuthorized(["Admin", "Testing Admin"]),  examBatchController.createExambatch);

    //route update

    app.put('/exambatch/', isAuthenticated, isAuthorized(["Admin", "Testing Admin"]),  examBatchController.updateExamBatch);

    //route xóa theo id
    app.delete('/exambatch/:id', isAuthenticated, isAuthorized(["Admin", "Testing Admin"]),  examBatchControllerr.deleteExambatch);
}
