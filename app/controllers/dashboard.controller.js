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

exports.fieldInfoExamSchedule = async function (req, res) {
    dashboard.fieldInfoExamSchedule(req.body, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.importExcelFile = async function (req, res) {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }
    dashboard.importExcelFile(req, function (err, data) {
      res.send({ result: data, error: err });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred while processing the file.");
  }
};
