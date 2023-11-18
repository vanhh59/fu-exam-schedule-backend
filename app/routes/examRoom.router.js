module.exports = function (app) {
    var examRoomController = require('../controllers/examRoom.controller');
    const { isAuthorized, isAuthenticated } = require('../controllers/auth.controller');

    //route lấy tất cả
    app.get('/examRoom', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer", "Student"]), examRoomController.getListAll);
   
    //route lấy theo id
    app.get('/examRoom/:id', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer", "Student"]), examRoomController.getListByID);

    //route cập nhật ExamRoom thay đổi ExaminerID với điều kiện Examiner này chưa được assign trong bất kỳ Room nào trong Slot hiện tại
    app.put('/examRoom', isAuthenticated, isAuthorized(["Admin", "Testing Admin"]), examRoomController.updateExamRoomAddExaminer);

    //route lây thông tin ExamRoom và danh sách Student -- Ví dụ: /examRoomWithStudent/R015
    app.get("/examRoomWithStudent/:id", isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff"]), examRoomController.getExamRoomInfoAndStudent)
    
    //route download file excel thông tin phòng thi -- Ví dụ: /examRoom/download/R015
    app.get("/examRoom/download/:id", isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff"]), examRoomController.exportExcelExamRoomFullInfo)

    //route điểm danh cho Examiner đối với role Testing Admin, Testing Staff
    app.put("/examRoom/attendance/:id", isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff"]), examRoomController.updateAttendanceStatus)
}
