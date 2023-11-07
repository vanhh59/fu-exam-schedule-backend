let { conn, sql } = require("../../connect");
let Student = require("../models/student.model");
let student = new Student();

exports.getListAll = async function (req, res) {
  student.getAll(function (err, data) {
    if (err) {
      res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
    } else {
      res.status(200).send({ ok: true, isSuccess: true, result: data, error: err });
    }
  });
};

exports.getListByID = async function (req, res) {
  student.getByID(req.params.id, function (err, data) {
    if (err) {
      res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
    } else {
      res.status(200).send({ ok: true, isSuccess: true, result: data, error: err });
    }
  });
};

exports.getStudentByEmail = async function (req, res) {
  student.getByEmail(req.params.email, function (err, data) {
    if (err) {
      res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
    } else {
      res.status(200).send({ ok: true, isSuccess: true, result: data, error: err });
    }
  });
};

exports.createStudent = async function (req, res) {
  student.create(req.body, function (err, data) {
    if (err) {
      res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
    } else {
      res.status(200).send({ ok: true, isSuccess: true, result: data, error: err });
    }
  });
};

exports.updateStudent = async function (req, res) {
  student.update(req.body.ID, req.body, function (err, data) {
    if (err) {
      res.status(400).send({ ok: false, isSuccess: false, result: data, error: "Failed to update a user" });
    } else {
      res.status(200).send({ ok: true, isSuccess: true, result: "Student updated successfully", error: err });
    }
  });
}

exports.deleteStudent = async function (req, res) {
  student.deleteByUpdate(req.params.id, function (err, data) {
    if (err) {
      res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
    } else {
      res.status(200).send({ ok: true, isSuccess: true, result: data, error: err });
    }
  });
};

exports.getExamSlotByStudentId = async function (req, res) {
  student.getExamSlotByStudentId(req.query.StudentId, req.query.SemesterCode, function (err, data) {
    if (err) {
      res.status(400).send({ ok: false, isSuccess: false, result: data, error: "Not found any exam slot" });
    } else {
      res.status(200).send({ ok: true, isSuccess: true, result: data, error: err });
    }
  });
}