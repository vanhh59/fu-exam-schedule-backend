module.exports = function (app) {
    var examSlotController = require('../controllers/examSlot.controller');

    //route lấy tất cả
    app.get('/examSlot', examSlotController.getListAll);

    //route lấy theo id
    app.get('/examSlot/:id', examSlotController.getListByID);

    //route thêm mới
    app.post('/examSlot', examSlotController.createExamSlot);

    //route update
    app.put('/examSlot/', examSlotController.updateExamSlot);

    //route xóa theo id
    app.delete('/examSlot/:id', examSlotController.deleteExamSlot);

}

