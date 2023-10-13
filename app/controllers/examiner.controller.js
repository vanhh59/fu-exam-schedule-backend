var { conn, sql } = require('../../connect');
var Examiner = require('../models/examiner.model');
var examiner = new Examiner();

exports.getListAll = async function (req, res) {
    examiner.getAll(function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.getListByID = async function (req, res) {
    examiner.getByID(req.params.id, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.getExaminerByEmail = async function (req, res) {
    examiner.getByEmail(req.params.email, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.createNewExaminer = async function (req, res) {
    examiner.create(req.body, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.updateExaminer = async function (req, res) {
    examiner.update(req.body.ID, req.body, function (err, data) {
        res.send({ result: data, error: err });
    });
}
exports.deleteExaminer = async function (req, res) {
    student.deleteExaminer(req.body.ID, req.body.status, function (err, data) {
        res.send({ result: data, error: err });
    });
}
