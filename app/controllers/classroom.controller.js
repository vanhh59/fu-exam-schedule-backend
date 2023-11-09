var { conn, sql } = require('../../connect');
var Classroom = require('../models/classroom.model');
var classroom = new Classroom();

exports.getListAll = async function (req, res) {
    classroom.getListAll(function (err, data) {
        if(err) {
            res.status(400).send({ ok: false, isSuccess: false,  result: data, error: err });
        } else {
            res.status(200).send({ ok: true, isSuccess: true,  result: data, error: err });
        }
    });
}

exports.getListByID = async function (req, res) {
    classroom.getListByID(req.params.id, function (err, data) {
        if(err) {
            res.status(400).send({ ok: false, isSuccess: false,  result: data, error: err });
        } else {
            res.status(200).send({ ok: true, isSuccess: true,  result: data, error: err });
        }
    });
}


exports.createClassroom = async function (req, res) {
    classroom.create(req.body, function (err, data) {
        if(err) {
            res.status(400).send({ ok: false, isSuccess: false,  result: data, error: err });
        } else {
            res.status(200).send({ ok: true, isSuccess: true,  result: data, error: err });
        }
    });
}


exports.updateClassroom = async function (req, res) {
    classroom.update(req.body.id, req.body, function (err, data) {
        if(err) {
            res.status(400).send({ ok: false, isSuccess: false,  result: data, error: err });
        } else {
            res.status(200).send({ ok: true, isSuccess: true,  result: data, error: err });
        }
    });
}

exports.deleteClassroom = async function (req, res) {
    classroom.deleteByUpdate(req.params.id, function (err, data) {
        if(err) {
            res.status(400).send({ ok: false, isSuccess: false,  result: data, error: err });
        } else {
            if (data[0]?.Result) {
                res.status(200).send({ ok: true, isSuccess: true, message: `Delete classroom ${req.params.id} successful`, result: data, error: err });
            } else {
                res.status(400).send({ ok: false, isSuccess: false, message: `Delete classroom ${req.params.id} fail. Classroom have been assign in ExamRoom`, result: data, error: err });
            }
        }
    });
}