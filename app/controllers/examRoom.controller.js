var { conn, sql } = require('../../connect');
var ExamRoom = require('../models/examRoom.model');
var examRoom = new ExamRoom();

exports.getListAll = async function (req, res) {
    examRoom.getListAll(function (err, data) {
        if(err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    });
}

exports.getListByID = async function (req, res) {
    examRoom.getListByID(req.params.id, function (err, data) {
        if(err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    });
}