var { conn, sql } = require('../../connect');
var ExamSlot = require('../models/examSlot.model');
var examSlot = new ExamSlot();

exports.getListAll = async function (req, res) {
    examSlot.getAll(function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.getListByID = async function (req, res) {
    examSlot.getByID(req.params.id, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.createExamSlot = async function (req, res) {
    examSlot.create(req.body, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.updateExamSlot = async function (req, res) {
    student.updateExamSLot(req.body.ID, req.body, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.deleteExamSlot = async function (req, res) {
    student.deleteExamSlot(req.body.ID, req.body.status, function (err, data) {
        res.send({ result: data, error: err });
    });
}
