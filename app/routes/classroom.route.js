module.exports = function (app) {
    var classRoomController = require('../controllers/classroom.controller');
    const { isAuthorized, isAuthenticated } = require('../controllers/auth.controller');

    //route lấy tất cả

    app.get('/classroom', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer", "Student"]), classRoomController.getListAll);
    //route lấy theo id

    app.get('/classroom/:id', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer", "Student"]), classRoomController.getListByID);
    //route thêm mới

    app.post('/classroom', isAuthenticated, isAuthorized(["Admin"]), classRoomController.createClassroom);
    //route update

    app.put('/classroom/:id', isAuthenticated, isAuthorized(["Admin"]), classRoomController.updateClassroom);

    //route xóa theo id
    app.delete('/classroom/:id', isAuthenticated, isAuthorized(["Admin"]), classRoomController.deleteClassroom);
}
