module.exports = function (app) {
    var studentController = require('../controllers/student.controller');

    //route lấy tất cả
    app.get('/student', studentController.getListAll);

    //route lấy theo id
    app.get('/student/:id', studentController.getListByID);

    //route thêm mới
    app.post('/student', studentController.create);

    //route update
    app.put('/student', studentController.update);

    //route xóa theo id
    app.delete('/student/:id', studentController.deleteByID);

    //route xóa tất cả
    app.delete('/student', studentController.deleteAll);
}

