module.exports = function (app) {
    var examSlotController = require('../controllers/examSlot.controller');
    const { isAuthorized, isAuthenticated } = require('../controllers/auth.controller');

    //route lấy tất cả
    app.get('/examSlot', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer", "Student"]), examSlotController.getListAll);

    //route lấy theo id
    app.get('/examSlot/:id', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer", "Student"]), examSlotController.getListByID);

    //route thêm mới
    app.post('/examSlot', isAuthenticated, isAuthorized(["Admin", "Testing Admin"]), examSlotController.createExamSlot);

    //route update
    app.put('/examSlot/', isAuthenticated, isAuthorized(["Admin", "Testing Admin"]), examSlotController.updateExamSlot);

    //route xóa theo id
    app.delete('/examSlot/:id', isAuthenticated, isAuthorized(["Admin", "Testing Admin"]), examSlotController.deleteExamSlot);
}

