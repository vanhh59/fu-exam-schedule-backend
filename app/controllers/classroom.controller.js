var { conn, sql } = require('../../connect');
var classroom = require('../models/classroom.model');
var classroom = new classroom();

exports.getListAll = async function (req, res) {
    classroom.getListAll(function (err, data) {
        if(err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    });
}

exports.getListByID = async function (req, res) {
    classroom.getListByID(req.params.id, function (err, data) {
        if(err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    });
}


exports.createClassroom = async function (req, res) {
    classroom.create(req.body, function (err, data) {
        if(err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    });
}


exports.updateClassroom = async function (req, res) {
    classroom.update(req.body.id, req.body, function (err, data) {
        if(err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    });
}

exports.deleteClassroom = async function (req, res) {
    classroom.deleteClassroom(req.body.id, req.body.status, function (err, data) {
        if(err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    });
}