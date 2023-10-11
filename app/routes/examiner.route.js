module.exports = function (app) {
    var examinerController = require('../controllers/examiner.controller');

    //route lấy tất cả
    app.get('/examiner', examinerController.getListAll);

    //route lấy theo id
    app.get('/examiner/:id', examinerControllerr.getListByID);

    //route lấy theo email
    app.get('/examiner/email/:email', examinerController.getExaminerByEmail);

    //route thêm mới
    app.post('/examiner', examinerController.createNewExaminer);

    //route update
    app.put('/examiner/', examinerController.updateExaminer);

    //route xóa theo id
    app.delete('/examiner/:id', examinerController.deleteByID);

    //route xóa tất cả
    app.delete('/examiner', examinerController.deleteAll);
}

