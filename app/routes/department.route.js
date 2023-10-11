module.exports = function (app) {
    var departmentController = require('../controllers/department.controller');

    //route lấy tất cả
    app.get('/department', departmentController.getListAll);

    //route lấy theo examinerID
    app.get('/department/:examinerID', departmentController.getDepartmentByExaminerID);

    //route lấy theo loaction
    app.get('/department/:location', departmentController.getByLocation);

    //route lấy theo phone
    app.get('/department/:examinerID', departmentController.getByPhone);

    //route lấy theo name
    app.get('/department/:name', departmentController.getByName);

    //route thêm mới
    app.post('/department', departmentController.createDepartment);

    //route update
    app.put('/department/', departmentController.updateDepartment);

    //route xóa theo name
    app.delete('/department/:name', departmentController.deleteDepartment);

    //route xóa tất cả
    app.delete('/department', departmentController.deleteAll);
}

