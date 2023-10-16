module.exports = function (app) {
    var subjectController = require('../controllers/subject.controller');

    //route get all
    app.get('/subject', subjectController.getAll);

    //route get by id
    app.get('/subject/:id', subjectController.getByID);

    //route create new subject
    app.post('/subject', subjectController.create);

    //route update subject
    app.put('/subject', subjectController.update);

    //route delete by id
    app.delete('/subject/:id', subjectController.deleteByUpdate);
}


