let { conn, sql } = require("../../connect");
let Semester = require("../models/semester.model");
let semester = new Semester();

exports.getListAll = async function (req, res) {
  semester.getAll(function (err, data) {
    if (err) {
      res.status(400).send({ result: data, error: err });
    } else {
      res.status(200).send({ result: data, error: err });
    }
  });
};

exports.getListByID = async function (req, res) {
  semester.getByID(req.params.id, function (err, data) {
    if (err) {
      res.status(400).send({ result: data, error: err });
    } else {
      res.status(200).send({ result: data, error: err });
    }
  });
};

exports.createNew = async function (req, res) {
  semester.create(req.body, function (err, data) {
    if (err) {
      res.status(400).send({ result: data, error: err });
    } else {
      res.status(200).send({ result: data, error: err });
    }
  });
};

exports.update = async function (req, res) {
  semester.update(req.params.id, req.body, function (err, data) {
    if (err) {
      res.status(400).send({ result: data, error: err });
    } else {
      res.status(200).send({ result: data, error: err });
    }
  });
};

exports.deleteByID = async function (req, res) {
  semester.deleteByUpdate(req.params.id, function (err, data) {
    if (err) {
      res.status(400).send({ result: data, error: err });
    } else {
      res.status(200).send({ result: data, error: err });
    }
  });
};

exports.getAllSalariesEachSemester = async function (req, res) {
  semester.getAllSalariesEachSemester(function (err, data) {
    if (err) {
      res.status(400).send({ result: data, error: err });
    } else {
      res.status(200).send({ result: data, error: err });
    }
  })
}