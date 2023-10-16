module.exports = function (app) {
    var courseController = require('../controllers/course.controller');
    //route lấy tất cả
    app.get('/course', courseController.getListAll);
    //route lấy theo id
    app.get('/course/:id', courseController.getListByID);
    
    //route lấy theo subjectID
    app.get('/course/:subjectID', courseController.getCourseBySubjectID);
    //route lấy theo name
    app.get('/course/:name', courseController.getByName);

    //route thêm mới
    app.post('/course', courseController.createCourse);

    //route update
    app.put('/course/', courseController.updateCourse);

    //route xóa theo id
    app.delete('/course/:id', courseController.deleteCourseByID);

}

