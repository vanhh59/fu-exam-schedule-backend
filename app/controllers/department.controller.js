let { conn, sql } = require('../../connect');
let Department = require('../models/department.model');
let department = new Department();

exports.getListAll = async function (req, res) {
    department.getAll(function (err, data) {
        if (err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    });
}

exports.getDepartmentByID = async function (req, res) {
    department.getDepartmentByID(req.params.id, function (err, data) {
        if (err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    });
}

exports.getByLocation = async function (req, res) {
    department.getByLocation(req.params.location, function (err, data) {
        if (err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    });
}

exports.getByPhone = async function (req, res) {
    department.getByPhone(req.params.phone, function (err, data) {
        if (err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    });
}

exports.getByName = async function (req, res) {
    department.getByName(req.params.name, function (err, data) {
        if (err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    });
}

exports.createDepartment = async function (req, res) {
    department.create(req.body, function (err, data) {
        if (err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    });
}


exports.updateDepartment = async function (req, res) {
    department.update(req.body, function (err, data) {
        if (err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    });
}

exports.deleteDepartment = async function (req, res) {
    department.deleteDepartment(req.body.id, function (err, data) {
        if (err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    });
}

exports.getAllDepartmentSalary = async function (req, res) {
    department.getAllAvailableSlot(function (err, data) {
        if (err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    });
};
