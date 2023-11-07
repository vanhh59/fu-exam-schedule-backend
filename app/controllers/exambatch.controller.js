var { conn, sql } = require('../../connect');
var  ExamBatch = require('../models/exambatch.model');
var exambatch = new ExamBatch();

exports.getListAll = async function (req, res) {
    exambatch.getAll(function (err, data) {
        if(err) {
            res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
        } else {
            res.status(200).send({ ok: true, isSuccess: true,  result: data, error: err });
        }
    });
}

exports.getListByID = async function (req, res) {
    exambatch.getListByID(req.params.id, function (err, data) {
        if(err) {
            res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
        } else {
            res.status(200).send({ ok: true, isSuccess: true,  result: data, error: err });
        }
    });
}

exports.getExambatchByCourseID = async function (req, res) {
    exambatch.getExambatchByCourseID(req.params.id, function (err, data) {
        if(err) {
            res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
        } else {
            res.status(200).send({ ok: true, isSuccess: true,  result: data, error: err });
        }
    });
}

exports.getByCode = async function (req, res) {
    exambatch.getByCode(req.params.id, function (err, data) {
        if(err) {
            res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
        } else {
            res.status(200).send({ ok: true, isSuccess: true,  result: data, error: err });
        }
    });
}

exports.createExambatch = async function (req, res) {
    exambatch.create(req.body, function (err, data) {
        if(err) {
            res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
        } else {
            res.status(200).send({ ok: true, isSuccess: true,  result: data, error: err });
        }
    });
}


exports.updateExamBatch = async function (req, res) {
    exambatch.updateExamBatch(req.params.id, req.body, function (err, data) {
        if(err) {
            res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
        } else {
            res.status(200).send({ ok: true, isSuccess: true,  result: data, error: err });
        }
    });
}

exports.deleteExambatch = async function (req, res) {
    exambatch.deleteExambatch(req.params.id, function (err, data) {
        if(err) {
            res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
        } else {
            res.status(200).send({ ok: true, isSuccess: true,  result: data, error: err });
        }
    });
}