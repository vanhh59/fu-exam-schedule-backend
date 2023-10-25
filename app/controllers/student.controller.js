var { conn, sql } = require('../../connect');
var Student = require('../models/student.model');
var student = new Student();

exports.getListAll = async function (req, res) {
    student.getAll(function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.getListByID = async function (req, res) {
    student.getByID(req.params.id, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.getStudentByEmail = async function (req, res) {
    student.getByEmail(req.params.email, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.createStudent = async function (req, res) {
    student.create(req.body, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.updateStudent = async function (req, res) {
    student.update(req.body.ID, req.body, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.deleteStudent = async function (req, res) {
    student.deleteByUpdate(req.body.ID, req.body.status, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.getExamSlotByStudentId = async function (req, res) {
    student.getExamSlotByStudentId(req.body, function (err, data) {
        res.send({ result: data, error: err });
    });
}







