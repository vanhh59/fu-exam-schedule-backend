module.exports = function (app) {
    var semesterController = require('../controllers/semester.controller');

    //route get all
    app.get('/semester', semesterController.getListAll);

    //route get by id
    app.get('/semester/:id', semesterController.getListByID);

    //route create new semester
    app.post('/semester', semesterController.createNew);

    //route update semester
    app.put('/semester/:id', semesterController.update);

    //route delete by id
    app.put('/semester/:id', semesterController.deleteByID);

}