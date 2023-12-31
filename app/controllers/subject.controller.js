var { conn, sql } = require('../../connect');
var Subject = require('../models/department.model');
var subject = new Subject();

exports.getAll = async function (req, res) {
    subject.getAll(function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.getByID = async function (req, res) {
    subject.getByID(req.params.id, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.create = async function (req, res) {
    subject.create(req.body, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.update = async function (req, res) {
    subject.update(req.body, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.deleteByUpdate = async function (req, res) {
    subject.deleteByUpdate(req.params.id, function (err, data) {
        res.send({ result: data, error: err });
    });
}