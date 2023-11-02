const { log } = require("util");
var { conn, sql } = require("../../connect");
var ExamSlot = require("../models/examSlot.model");
var examSlot = new ExamSlot();

exports.getListAll = async function (req, res) {
  examSlot.getAll(function (err, data) {
    if (err) {
      res.status(400).send({ result: data, error: err });
    } else {
      res.status(200).send({ result: data, error: err });
    }
  });
};

exports.getListByID = async function (req, res) {
  examSlot.getByID(req.params.id, function (err, data) {
    if (err) {
      res.status(400).send({ result: data, error: err });
    } else {
      res.status(200).send({ result: data, error: err });
    }
  });
};

exports.createExamSlot = async function (req, res) {
  examSlot.create(req.body, function (err, data) {
    if (err) {
      res.status(400).send({ result: data, error: err });
    } else {
      res.status(200).send({ result: data, error: err });
    }
  });
};

exports.getExamSlotNull = async function (req, res) {
  examSlot.getExamSlotNull(function (err, data) {
    if (err) {
      res.status(400).send({ result: data, error: err });
    } else {
      res.status(200).send({ result: data, error: err });
    }
  });
};

exports.updateExamSlot = async function (req, res) {
  examSlot.updateExamSlot(req.params.id, req.body, function (err, data) {
    if (err) {
      res.status(400).send({ result: data, error: err });
    } else {
      res.status(200).send({ result: data, error: err });
    }
  });
};

exports.deleteExamSlot = async function (req, res) {
  examSlot.deleteExamSlot(req.params.id, function (err, data) {
    if (err) {
      res.status(400).send({ result: data, error: err });
    } else {
      res.status(200).send({ result: data, error: err });
    }
  });
};
