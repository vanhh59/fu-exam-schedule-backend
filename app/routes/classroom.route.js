module.exports = function (app) {
    var classRoomController = require('.../controllers/classroom.controller');

    //route lấy tất cả

    app.get('/classroom', classRoomController.getListAll);
    //route lấy theo id

    app.get('/classroom/:id', classRoomController.getListByID);
    //route thêm mới

    app.post('/classroom', classRoomController.createClassroom);
    //route update

    app.put('/classroom/', classRoomController.updateClassroom);

    //route xóa theo id
    app.delete('/classroom/:id', classRoomController.deleteClassroom);

}
