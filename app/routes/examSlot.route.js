module.exports = function (app) {
    var examSlotController = require('../controllers/examSlot.controller');
    const { isAuthorized, isAuthenticated } = require('../controllers/auth.controller');

    //route lấy tất cả
    app.get('/examSlot', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer", "Student"]), examSlotController.getListAll);

    //router lấy full thông tin của ExamSlot, Examiner đã đăng ký vào ExamSlot, Examiner dự phòng, ExamRoom
    app.get('/getExamSlotFullInfo', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer", "Student"]), examSlotController.getExamSlotFullInfo);

    //router lấy full thông tin của ExamSlot, Examiner đã đăng ký vào ExamSlot, Examiner dự phòng, ExamRoom by ID
    app.get('/getExamSlotFullInfo/:id', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer", "Student"]), examSlotController.getExamSlotFullInfoByID);

    //route lấy theo id
    app.get('/examSlot/:id', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer", "Student"]), examSlotController.getListByID);

    //route thêm mới
    // app.post('/examSlot', isAuthenticated, isAuthorized(["Admin", "Testing Admin"]), examSlotController.createExamSlot);

    // router lấy thông tin subjectID, subjectName by examSlotID
    app.get('/examSlot/info/:id', isAuthenticated, isAuthorized(["Admin", "Testing Admin"]), examSlotController.getSubjectIDSubjectNameByExamSlotID);

    //route lấy examSlot vừa mới tạo, chưa có thông tin, phục vụ cho việc nhập thông tin
    app.get('/getExamSlotNull', isAuthenticated, isAuthorized(["Admin", "Testing Admin"]), examSlotController.getExamSlotNull)

    //route update
    app.put('/examSlot/:id', isAuthenticated, isAuthorized(["Admin", "Testing Admin"]), examSlotController.updateExamSlot);

    //route xóa theo id
    app.delete('/examSlot/:id', isAuthenticated, isAuthorized(["Admin", "Testing Admin"]), examSlotController.deleteExamSlot);
}

