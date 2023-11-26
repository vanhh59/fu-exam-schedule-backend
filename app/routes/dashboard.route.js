module.exports = function (app) {
    var dashboardController = require('../controllers/dashboard.controller');
    const { isAuthorized, isAuthenticated } = require('../controllers/auth.controller');

    // Xem lịch thi tổng quan và chi tiết
    app.get('/exam-schedule', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer", "Student"]), dashboardController.getExamSchedule)

    // Tạo một Slot thi
    app.post('/exam-schedule', isAuthenticated, isAuthorized(['Testing Admin', 'Admin']), dashboardController.createExamSchedule)

    // Đăng ký xem thi trong một Slot nào đó
    app.post('/register', isAuthenticated, isAuthorized(['Testing Admin', 'Admin', 'Lecturer']), dashboardController.register)

    // Lấy danh sách Examiner đã đăng ký vào ExamSlot với status = true
    app.get('/exam-slot/examiner/:id', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer", "Student"]), dashboardController.getListExaminerRegister)

    // Nhập thông tin tạo Exam Room trong một Slot thi
    app.post('/exam-room', isAuthenticated, isAuthorized(['Testing Admin', 'Admin']), dashboardController.fieldInfoExamSchedule)

    // Tạo multiple exam-room
    app.post('/exam-multiple-room', isAuthenticated, isAuthorized(['Testing Admin', 'Admin']), dashboardController.createMultipleExamRoom)

    // Nhập thông tin student vào Exam room bằng file excel
    app.post('/exam-room/import-excel', isAuthenticated, isAuthorized(['Testing Admin', 'Admin', 'Lecturer']), dashboardController.importExcelFile)

    // Nhập thông tin student vào Exam room thủ công
    app.post('/exam-room/add-student', isAuthenticated, isAuthorized(['Testing Admin', 'Admin']), dashboardController.addStudentIntoExamRoom)

    // Hủy đăng ký xem thi với điều kiện không được hủy nếu ngày hủy và ngày thi cách nhau 3 ngày
    app.put('/exam-room/update-register', isAuthenticated, isAuthorized(['Testing Admin', 'Admin', 'Lecturer']), dashboardController.updateRegister)
}