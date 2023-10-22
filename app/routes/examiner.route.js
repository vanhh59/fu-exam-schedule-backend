module.exports = function (app) {
    var examinerController = require('../controllers/examiner.controller');

    //route lấy tất cả
    app.get('/examiner', examinerController.getListAll);

    //route lấy theo id
    app.get('/examiner/:id', examinerController.getListByID);

    //route lấy theo email
    app.get('/examiner/email/:email', examinerController.getExaminerByEmail);

    //route lấy lương trog 1 semester
    app.get('/examiner/income/:id', examinerController.getIncome)

    //route tất cả mọi người lấy lương trog 1 semester
    app.get('/examiner/income/all', examinerController.getAllIncome)

    //route tất cả mọi người lấy lương trog 1 semester
    app.get('/examiner/slot-available/all', examinerController.getAllAvailableSlot)

    //route thêm mới
    app.post('/examiner', examinerController.createNewExaminer);

    //route update
    app.put('/examiner/', examinerController.updateExaminer);

    //route xóa theo id
    app.delete('/examiner/:id', examinerController.deleteExaminer);
}

