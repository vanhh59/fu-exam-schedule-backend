var { conn, sql } = require('../../connect');
var ExamRoom = require('../models/examRoom.model');
var examRoom = new ExamRoom();

exports.getListAll = async function (req, res) {
    examRoom.getListAll(function (err, data) {
        if(err) {
            res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
        } else {
            res.status(200).send({ ok: true, isSuccess: true, result: data, error: err });
        }
    });
}

exports.getListByID = async function (req, res) {
    examRoom.getListByID(req.params.id, function (err, data) {
        if(err) {
            res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
        } else {
            res.status(200).send({ ok: true, isSuccess: true, result: data, error: err });
        }
    });
}

exports.updateExamRoomAddExaminer = async function (req, res) {
    examRoom.updateExamRoomAddExaminer(req.body, function (err, data) {
      if(err) {
        res.status(400).send({ ok: false, isSuccess: false,  result: data, error: err });
      } else {
          if (data[0]?.Result) {
              res.status(200).send({ ok: true, isSuccess: true, message: `Update ExamRoom ${req.body.examRoomID} successful. Examiner ${req.body.examRoomID} have assign in this Room`, result: data, error: err });
          } else {
              res.status(400).send({ ok: false, isSuccess: false, message: `Update ExamRoom ${req.body.examRoomID} fail. Examiner have been assign in another Room`, result: data, error: err });
          }
      }
    });
  };