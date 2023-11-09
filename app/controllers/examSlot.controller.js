const { log } = require("util");
var { conn, sql } = require("../../connect");
var Register = require("../models/register.model");
let ExamSlot = require("../models/examSlot.model");
let register = new Register();
var examSlot = new ExamSlot();

exports.getListAll = async function (req, res) {
  try {
    const examSlotData = await new Promise((resolve, reject) => {
      examSlot.getAll(function (err, data) {
        if (err) {
          console.log("ExamSlot Error");
          reject(err);
        } else {
          resolve(data);
        }
      });
    });

    const registerData = await new Promise((resolve, reject) => {
      register.getListAll(function (err, data) {
        if (err) {
          console.log("Examiner Error");
          reject(err);
        } else {
          resolve(data);
        }
      });
    });

    if (registerData.length > 0 && examSlotData.length > 0) {
      // Create a mapping of examSlotID to examSlot data
      let examSlotMap = new Map(examSlotData.map((item) => [item.examSlotID.trim(), { ...item, register: [] }]));

      // Iterate through the register data and match it with the corresponding examSlot data
      registerData.forEach((registerItem) => {
        const examSlotData = examSlotMap.get(registerItem.examSlotID.trim());
        if (examSlotData) {
          examSlotData.register.push(registerItem);
        }
      });
      
      res.status(200).send({ ok: true, isSuccess: true, result: [...examSlotMap] });
    } else {
      res.status(400).send({ ok: false, isSuccess: false });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ ok: false, isSuccess: false, error: error });
  }
};


exports.getListByID = async function (req, res) {
  examSlot.getByID(req.params.id, function (err, data) {
    if (err) {
      res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
    } else {
      res.status(200).send({ ok: true, isSuccess: true, result: data, error: err });
    }
  });
};

exports.getSubjectIDSubjectNameByExamSlotID = async function (req, res) {
  examSlot.getSubjectIDSubjectNameByExamSlotID(req.params.id, function (err, data) {
    if (err) {
      res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
    } else {
      res.status(200).send({ ok: true, isSuccess: true, result: data, error: err });
    }
  });
};

exports.createExamSlot = async function (req, res) {
  examSlot.create(req.body, function (err, data) {
    if (err) {
      res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
    } else {
      res.status(200).send({ ok: true, isSuccess: true, result: data, error: err });
    }
  });
};

exports.getExamSlotNull = async function (req, res) {
  examSlot.getExamSlotNull(function (err, data) {
    if (err) {
      res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
    } else {
      res.status(200).send({ ok: true, isSuccess: true, result: data, error: err });
    }
  });
};

exports.updateExamSlot = async function (req, res) {
  examSlot.updateExamSlot(req.params.id, req.body, function (err, data) {
    if(err) {
      res.status(400).send({ ok: false, isSuccess: false,  result: data, error: err });
    } else {
        if (data[0]?.Result) {
            res.status(200).send({ ok: true, isSuccess: true, message: `Update ExamSlot ${req.params.id} successful`, result: data, error: err });
        } else {
            res.status(400).send({ ok: false, isSuccess: false, message: `Update ExamSlot ${req.params.id} fail. Date must > 7 day from now and quantity must >= 1.`, result: data, error: err });
        }
    }
  });
};

exports.deleteExamSlot = async function (req, res) {
  examSlot.deleteExamSlot(req.params.id, function (err, data) {
    if(err) {
      res.status(400).send({ ok: false, isSuccess: false,  result: data, error: err });
    } else {
        if (data[0]?.Result) {
            res.status(200).send({ ok: true, isSuccess: true, message: `Delete ExamSlot ${req.params.id} successful`, result: data, error: err });
        } else {
            res.status(400).send({ ok: false, isSuccess: false, message: `Delete ExamSlot ${req.params.id} fail. ExamSlot have been assign in ExamRoom`, result: data, error: err });
        }
    }
  });
};
