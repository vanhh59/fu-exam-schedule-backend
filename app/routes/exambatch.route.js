module.exports = function (app) {
    let examBatchController = require('.../controllers/exambatch.controller');

    //route lấy tất cả

    app.get('/exambatch', examBatchController.getListAll);
    //route lấy theo id

    app.get('/exambatch/:id', examBatchController.getListByID);

    //route get by CourseID

    app.get('/exambatch/:CourseID', examBatchController.getExambatchByCourseID);
    //route lay theo code

    app.get('/exambatch:code', examBatchController.getByCode);

    //route thêm mới
    app.post('/exambatch', examBatchController.createExambatch);

    //route update

    app.put('/exambatch/', examBatchController.updateExamBatch);

    //route xóa theo id
    app.delete('/exambatch/:id', examBatchControllerr.deleteExambatch);
}
