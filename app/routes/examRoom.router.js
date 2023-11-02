module.exports = function (app) {
    var examRoomController = require('../controllers/examRoom.controller');
    const { isAuthorized, isAuthenticated } = require('../controllers/auth.controller');

    //route lấy tất cả

    app.get('/examRoom', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer", "Student"]), examRoomController.getListAll);
    //route lấy theo id

    app.get('/examRoom/:id', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer", "Student"]), examRoomController.getListByID);
}
