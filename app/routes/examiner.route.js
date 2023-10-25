module.exports = function (app) {
    var examinerController = require('../controllers/examiner.controller');
    const { isAuthorized, isAuthenticated } = require('../controllers/auth.controller');

    //route lấy tất cả
    app.get('/examiner', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer"]), examinerController.getListAll);

    //route lấy theo id
    app.get('/examiner/:id', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer"]), examinerController.getListByID);

    //route lấy theo email
    app.get('/examiner/email/:email', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer"]), examinerController.getExaminerByEmail);

    //route lấy lương trog 1 semester
    app.get('/examiner/income/:id', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Lecturer"]), examinerController.getIncome)

    //route lấy thông tin exam slot của giáo viên cụ thể
    app.get('/examiner/exam-rooms/:id', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Lecturer"]), examinerController.getExamRoomByExaminerID)

    //route tất cả mọi người lấy lương trog 1 semester
    app.get('/examiner/incomeAll/all', isAuthenticated, isAuthorized(["Admin", "Testing Admin"]), examinerController.getAllIncome)

    //route tất cả mọi người lấy lương trog 1 semester
    app.get('/examiner/slot-available/all', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer"]), examinerController.getAllAvailableSlot)

    //route thêm mới
    app.post('/examiner', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Lecturer"]), examinerController.createNewExaminer);

    //route update
    app.put('/examiner/', isAuthenticated, isAuthorized(["Admin", "Testing Admin"]), examinerController.updateExaminer);

    //route xóa theo id
    app.delete('/examiner/:id', isAuthenticated, isAuthorized(["Admin", "Testing Admin"]), examinerController.deleteExaminer);
}

