var { conn, sql } = require('../../connect');

// Import services DAO
var Dashboard = require('../models/dashboard.model');
const queries = require('../sql/Queries')

var dashboard = new Dashboard();

exports.getExamSchedule = async function (req, res) {
    dashboard.getAllExamSchedule(function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.createExamSchedule = async function (req, res) {
    dashboard.createExamSchedule(req.body, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.register = async function (req, res) {
    dashboard.register(req.body, function (err, data) {
        res.send({ result: data, error: err });
    });
}