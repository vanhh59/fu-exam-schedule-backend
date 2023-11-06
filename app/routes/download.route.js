module.exports = function (app) {
    let downloadController = require('../controllers/download.controller');
    const { isAuthorized, isAuthenticated } = require('../controllers/auth.controller');

    //Hàm download file excel cho department và examiner
    app.get("/api/excel/depart-examiner/download", downloadController.getXlsx);

    //Hàm download file excel cho department và examiner
    app.get("/api/excel/exam-room/download/:id", downloadController.getExamRoomsXlsx)
}