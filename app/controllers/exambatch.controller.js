let { conn, sql } = require('../../connect');
let exambatch = require('../models/exambatch.model');
let exambatch = new ExamBatch();

exports.getListAll = async function (req, res) {
    exambatch.getAll(function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.getExambatchByCourseID = async function (req, res) {
    department.getExambatchByCourseID(req.params.courseID, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.getByCode = async function (req, res) {
    department.getByCode(req.params.code, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.createExambatch = async function (req, res) {
    exambatch.create(req.body, function (err, data) {
        res.send({ result: data, error: err });
    });
}


exports.updateExambatch = async function (req, res) {
    exambatch.update(req.body.id, req.body, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.deleteExambatch = async function (req, res) {
    exambatch.deleteExambatch(req.body.id, req.body.status, function (err, data) {
        res.send({ result: data, error: err });
    });
}