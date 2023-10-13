module.exports = function (app) {
    var departmentController = require('../controllers/department.controller');

    //route get all
    app.get('/department', departmentController.getListAll);

    //route get by examinerID
    app.get('/department/:examinerID', departmentController.getDepartmentByExaminerID);

    //route get by location
    app.get('/department/:location', departmentController.getByLocation);

    //route get by phone
    app.get('/department/:phone', departmentController.getByPhone);

    //route get by name
    app.get('/department/:name', departmentController.getByName);

    //route create new department
    app.post('/department', departmentController.createDepartment);

    //route update department
    app.put('/department/', departmentController.updateDepartment);

    //route delete department
    app.put('/department/delete', departmentController.deleteDepartment);

}
