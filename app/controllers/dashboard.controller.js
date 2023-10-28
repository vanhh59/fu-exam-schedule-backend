var { conn, sql } = require('../../connect');

// Import services DAO
var Dashboard = require('../models/dashboard.model');
const queries = require('../sql/Queries');

var dashboard = new Dashboard();

exports.getExamSchedule = async function (req, res) {
    dashboard.getAllExamSchedule(function (err, data) {
        if(err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    });
}

exports.createExamSchedule = async function (req, res) {
    dashboard.createExamSchedule(req.body, function (err, data) {
        if(err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    });
}

exports.register = async function (req, res) {
    dashboard.register(req.body, function (err, data) {
        if(err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    });
}

exports.fieldInfoExamSchedule = async function (req, res) {
    dashboard.fieldInfoExamSchedule(req.body, function (err, data) {
        if(err) {
            res.status(400).send({ result: data, error: err });
        } else {
            res.status(200).send({ result: data, error: err });
        }
    });
}

exports.importExcelFile = async function (req, res) {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }
    let flag = false;
    const importExcelResult = await new Promise((resolve, reject) => {
      dashboard.importExcelFile(req, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });

    if (importExcelResult) {
      flag = true;
      const updateQuantityResult = await new Promise((resolve, reject) => {
        dashboard.updateQuantityExamSlot(req.body, (err, data) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(data);
            resolve(data);
          }
        });
      });
      
      if (flag) {
        const result = dashboard.sendMail(req.body);
        switch (result) {
          case 1:
            console.log("The exam start date have already bypass.");
            break;
          case 2:
            console.log("There weren't any students in room.");
            break;
          case 3:
            console.log("The email failed to send.");
            break;

          default:
            console.log("The email sent successfully.");
            break;
        }
      }

      res.send({
        importExcelResult,
        updateQuantityResult,
      });
    } else {
      res.status(400).send("Import failed. Update skipped.");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred while processing the file.");
  }
};