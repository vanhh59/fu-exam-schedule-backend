var { conn, sql } = require('../../connect');
var course = require('../models/course.model');
var course = new course();

exports.getListAll = async function (req, res) {
    course.getAll(function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.getListByID = async function (req, res) {
    course.getByID(req.params.id, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.getCourseBySubjectID = async function (req, res) {
    course.getCourseBySubjectID(req.params.subjectID, function (err, data) {
        res.send({ result: data, error: err });
    });
}
exports.getByName = async function (req, res) {
    course.getByName(req.params.name, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.createCourse = async function (req, res) {
    createCourse.createCourse(req.body, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.updateCourse = async function (req, res) {
    course.updateCourse(req.body.ID, req.body, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.deleteCourseByID = async function (req, res) {
    course.deleteCourse(req.body.ID, req.body.status, function (err, data) {
        res.send({ result: data, error: err });
    });
}