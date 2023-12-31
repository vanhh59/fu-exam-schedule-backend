module.exports = function (app) {
    var studentController = require('../controllers/student.controller');

    //route get all
    app.get('/student', studentController.getListAll);

    //route get by id
    app.get('/student/:id', studentController.getListByID);

    //route get by email
    app.get('/student/email/:email', studentController.getStudentByEmail);

    //route create new student
    app.post('/student', studentController.createStudent);

    //route update student
    app.put('/student/', studentController.updateStudent);

    //route update status
    app.put('/student/status', studentController.deleteStudent);

}

