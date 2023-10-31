let { conn, sql } = require('../../connect');
let Examiner = require('../models/examiner.model');
let examiner = new Examiner();

exports.getListAll = async function (req, res) {
    examiner.getAll(function (err, data) {
        if (err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    });
}

exports.getListByID = async function (req, res) {
    examiner.getByID(req.params.id, function (err, data) {
        if (err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    });
}

exports.getExaminerByEmail = async function (req, res) {
    examiner.getByEmail(req.params.email, function (err, data) {
        if (err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    });
}

exports.createNewExaminer = async function (req, res) {
    examiner.create(req.body, function (err, data) {
        if (err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    });
}

exports.updateExaminer = async function (req, res) {
    examiner.update(req.body.ID, req.body, function (err, data) {
        if (err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    });
}

exports.getExamRoomByExaminerID = async function (req, res) {

    examiner.getExaminerExamRooms(req.query.examinerID, req.query.SemesterCode, function (err, data) {
        if (err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }

    });
}

exports.deleteExaminer = async function (req, res) {
    examiner.deleteExaminer(req.body.ID, req.body.status, function (err, data) {
        if (err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    });
}

exports.getIncome = async function (req, res) {
    examiner.getExaminerSalary(req.query.examinerID, req.query.SemesterCode, function (err, data) {
        if (err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    });
}

exports.getAllIncome = async function (req, res) {
    examiner.getAllExaminerSalary(req.query.SemesterCode, function (err, data) {
        if (err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }

    });
}

exports.getIncome = async function (req, res) {
    examiner.getExaminerSalary(req.query.examinerID, req.query.SemesterCode, function (err, data) {
        if (err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    });
}

exports.getAllAvailableSlot = async function (req, res) {
    examiner.getAllAvailableSlot(req.query.examinerID, req.query.SemesterCode, function (err, data) {
        if (err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    })
}

exports.getAllFinishedSlot = async function (req, res) {
    examiner.getAllFinishedSlot(req.query.examinerID, req.query.SemesterCode, function (err, data) {
        if (err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    })
}

exports.getAllUnFinishedSlot = async function (req, res) {
    examiner.getAllUnFinishedSlot(req.query.examinerID, req.query.SemesterCode, function (err, data) {
        if (err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    })
}