var { conn, sql } = require('../../connect');
var Department = require('../models/department.model');
var department = new Department();

exports.getListAll = async function (req, res) {
    department.getAll(function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.getDepartmentByExaminerID = async function (req, res) {
    department.getDepartmentByExaminerID(req.params.examinerID, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.getByLocation = async function (req, res) {
    department.getByLocation(req.params.location, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.getByPhone = async function (req, res) {
    department.getByPhone(req.params.phone, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.getByName = async function (req, res) {
    department.getByName(req.params.name, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.createDepartment = async function (req, res) {
    department.create(req.body, function (err, data) {
        res.send({ result: data, error: err });
    });
}


exports.updateDepartment = async function (req, res) {
    department.update(req.body.ID, req.body, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.deleteDepartment = async function (req, res) {
    department.deleteDepartment(req.body.name, req.body.status, function (err, data) {
        res.send({ result: data, error: err });
    });
}
