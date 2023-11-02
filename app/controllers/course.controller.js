var { conn, sql } = require('../../connect');
var Course = require('../models/course.model');
var course = new Course();

exports.getListAll = async function (req, res) {
    course.getAll(function (err, data) {
        if (err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    });
}

exports.getListByID = async function (req, res) {
    course.getCourseByID(req.params.id, function (err, data) {
        if (err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    });
}

exports.getCourseBySubjectID = async function (req, res) {
    course.getCourseBySubjectID(req.params.id, function (err, data) {
        if (err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    });
}
exports.getByName = async function (req, res) {
    course.getByName(req.body, function (err, data) {
        if (err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    });
}

exports.createCourse = async function (req, res) {
    course.createCourse(req.body, function (err, data) {
        if (err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    });
}

exports.updateCourse = async function (req, res) {
    course.updateCourse(req.body.ID, req.body, function (err, data) {
        if (err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    });
}

exports.deleteCourseByID = async function (req, res) {
    course.deleteCourse(req.params.id, function (err, data) {
        if (err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    });
}