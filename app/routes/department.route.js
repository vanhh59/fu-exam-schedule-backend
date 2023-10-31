module.exports = function (app) {
    let departmentController = require('../controllers/department.controller');
    const { isAuthorized, isAuthenticated } = require('../controllers/auth.controller');

    //route get all
    app.get('/department', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer", "Student"]), departmentController.getListAll);

    //route get by examinerID
    app.get('/department/:id', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Lecturer"]), departmentController.getDepartmentByID);

    //route get by location
    app.get('/department/address/:location', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer"]), departmentController.getByLocation);

    //route tất cả tổng salary của department
    app.get('/department/salaries/all', isAuthenticated, isAuthorized(["Admin"]), departmentController.getAllDepartmentSalary)

    //route get by phone
    app.get('/department/cellphone/:phone', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer", "Student"]), departmentController.getByPhone);

    //route get by name
    app.get('/department/name/:name', isAuthenticated, isAuthorized(["Admin", "Testing Admin", "Testing Staff", "Lecturer", "Student"]), departmentController.getByName);

    //route create new department
    app.post('/department', isAuthenticated, isAuthorized(["Admin"]), departmentController.createDepartment);

    //route update department
    app.put('/department/', isAuthenticated, isAuthorized(["Admin"]), departmentController.updateDepartment);

    //route delete department
    app.put('/department/delete', isAuthenticated, isAuthorized(["Admin"]), departmentController.deleteDepartment);
}