const flash = require('express-flash');
var { conn, sql } = require('../../connect');

// Import services DAO
var Dashboard = require('../models/dashboard.model');
const queries = require('../sql/Queries');

var dashboard = new Dashboard();

exports.getExamSchedule = async function (req, res) {
    dashboard.getAllExamSchedule(function (err, data) {
        if(err) {
            res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
        } else {
            res.status(200).send({ ok: true, isSuccess: true, result: data, error: err });
        }
    });
}

exports.createExamSchedule = async function (req, res) {
    dashboard.createExamSchedule(req.body, function (err, data) {
        if(err) {
            res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
        } else {
            res.status(200).send({ ok: true, isSuccess: true, result: data[0], message: 'Create ExamSlot and ExamBatch succcessfull', error: err });
        }
    });
}

exports.register = async function (req, res) {
    dashboard.register(req.body, function (err, data) {
        if(err) {
            res.status(400).send({ ok: false, isSuccess: false, result: data, message:'Examiner is already register', error: err });
        } else {
          if(data[0]?.Result) {
            res.status(200).send({ ok: true, isSuccess: true, result: data[0]?.Result, message:'Register successfull', error: err });
          } else {
            res.status(400).send({ ok: false, isSuccess: false, result: data[0]?.Result, message:'ExaminerId is invalid', error: err });
          }
        }
    });
}

exports.fieldInfoExamSchedule = async function (req, res) {
    dashboard.fieldInfoExamSchedule(req.body, function (err, data) {
        if(err) {
            res.status(400).send({ ok: false, isSuccess: false, result: data, error: err});
        } else {
          if (!data[0]?.Result) {
            res.status(400).send({ ok: false, isSuccess: false, result: data[0]?.Result, message:'Examiner coincides with the time in ExamSlot', error: err });
          } else {
            res.status(200).send({ ok: true, isSuccess: true, result: data[0]?.Result, message:'Create ExamRoom successful', error: err });
          }
        }
    });
}

exports.getListExaminerRegister = async function (req, res) {
  dashboard.getListExaminerRegister(req.params.id, function (err, data) {
      if(err) {
          res.status(400).send({ ok: false, isSuccess: false, result: data, message:'Do not have Examiner in this Slot', error: err });
      } else {
          res.status(200).send({ ok: true, isSuccess: true, result: data, error: err });
      }
  });
}

exports.addStudentIntoExamRoom = async function (req, res) {
  dashboard.addStudentIntoExamRoom(req.body, function (err, data) {
      if(err) {
          res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
      } else {
          res.status(200).send({ ok: true, isSuccess: true, result: data, message: `Add student ID: ${req.body.studentID} into ExamRoom ID ${req.body.examRoomID} successfull`, error: err });
      }
  });
}

exports.updateRegister = async function (req, res) {
  dashboard.checkUpdteRegisterIsLessThan3Day(req.body, function (err, data) {
      if(err) {
          res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
      }
      if (data[0].Result == 0) {
        dashboard.updateRegister(req.body, function (err, data) {
          if(err) {
            res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
          } else {
            res.status(200).send({ ok: true, isSuccess: true, result: data, message: `Update successfull register` ,error: err });
          }
        })
      } else {
        res.status(400).send({ ok: false, isSuccess: false, result: data, message: 'Time to update register must be greather then 3 days', error: err });
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
          return reject(err);
        }
        resolve(data);
      });
    });

    if (importExcelResult) {
      flag = true;
      const updateQuantityResult = await new Promise((resolve, reject) => {
        dashboard.updateQuantityExamSlot(req.body, (err, data) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          console.log(data);
          resolve(data);
        });
      });

      // if (!flag) {
      //   const result = dashboard.sendMail(req.body);
      //   switch (result) {
      //     case 1:
      //       console.log("The exam start date has already passed.");
      //       break;
      //     case 2:
      //       console.log("There weren't any students in the room.");
      //       break;
      //     case 3:
      //       console.log("The email failed to send.");
      //       break;
      //     default:
      //       console.log("The email sent successfully.");
      //       break;
      //   }
      // }

      if (importExcelResult) {
        res.status(200).send({ ok: true, isSuccess: true, message:"Import excel successfully." });
      } else {
        res.status(400).send({ ok: false, isSuccess: false,  message:"Import excel fail." });
      }
    } else {
      console.log("Import failed. Update skipped.");
      res.status(400).send({ ok: false, isSuccess: false, message:"Import excel fail." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(400).send({ ok: false, isSuccess: false,  message:"Import excel fail." });
  }
};
