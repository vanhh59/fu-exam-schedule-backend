let { conn, sql } = require('../../connect');
let Examiner = require('../models/examiner.model');
let examiner = new Examiner();

exports.getListAll = async function (req, res) {
    examiner.getAll(function (err, data) {
        if (err) {
            res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
        } else {
            res.status(200).send({ ok: true, isSuccess: true, result: data, error: err });
        }
    });
}

exports.getListByID = async function (req, res) {
    examiner.getByID(req.params.id, function (err, data) {
        if (err) {
            res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
        } else {
            res.status(200).send({ ok: true, isSuccess: true, result: data, error: err });
        }
    });
}

exports.getInfoSalaryAndExaminerAndExamSlotAndExamRoom = async function (req, res) {
    examiner.getInfoSalaryAndExaminerAndExamSlotAndExamRoom(req.params.id, function (err, data) {
        if (err) {
            res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
        } else {
            if (data[0][0]?.ID) {
                res.status(200).send({ ok: true, isSuccess: true, result: data, error: err });
            } else {
                res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
            }
        }
    });
}

exports.getExaminerByEmail = async function (req, res) {
    examiner.getByEmail(req.params.email, function (err, data) {
        if (err) {
            res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
        } else {
            res.status(200).send({ ok: true, isSuccess: true, result: data, error: err });
        }
    });
}

exports.createNewExaminer = async function (req, res) {
    examiner.create(req.body, function (err, data) {
        if (err) {
            res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
        } else {
            res.status(200).send({ ok: true, isSuccess: true, result: data, error: err });
        }
    });
}

exports.updateExaminer = async function (req, res) {
    examiner.update(req.body.ID, req.body, function (err, data) {
        if (err) {
            res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
        } else {
            res.status(200).send({ ok: true, isSuccess: true, result: data, error: err });
        }
    });
}

exports.getExamRoomByExaminerID = async function (req, res) {
    examiner.getExaminerExamRooms(req.query.examinerID, function (err, data) {
        if (err) {
            res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
        } else {
            if (data[0]?.examSlotID) {
                res.status(200).send({ ok: true, isSuccess: true, result: data, error: err });
            } else {
                res.status(400).send({ ok: false, isSuccess: false, message:`Examiner ${req.query.examinerID} not been assigned in Exam room`, result: data, error: err });
            }
        }

    });
}

exports.deleteExaminer = async function (req, res) {
    examiner.deleteExaminer(req.body.ID, req.body.status, function (err, data) {
        if (err) {
            res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
        } else {
            res.status(200).send({ ok: true, isSuccess: true, result: data, error: err });
        }
    });
}

exports.getIncome = async function (req, res) {
    examiner.getExaminerSalary(req.query.examinerID, req.query.semesterCode, function (err, data) {
        if (err) {
            res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
        } else {
            res.status(200).send({ ok: true, isSuccess: true, result: data, error: err });
        }
    });
}

exports.getAllIncome = async function (req, res) {
    examiner.getAllExaminerSalary(req.query.semesterCode, function (err, data) {
        if (err) {
            res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
        } else {
            res.status(200).send({ ok: true, isSuccess: true, result: data, error: err });
        }

    });
}

exports.getAllAvailableSlot = async function (req, res) {
    examiner.getAllAvailableSlot(req.query.examinerID, req.query.semesterCode, function (err, data) {
        if (err) {
            res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
        } else {
            res.status(200).send({ ok: true, isSuccess: true, result: data, error: err });
        }
    })
}

exports.getAllFinishedSlot = async function (req, res) {
    examiner.getAllFinishedSlot(req.query.examinerID, function (err, data) {
        if (err) {
            res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
        } else {
            if (!data[0]?.examSlotID) {
                res.status(400).send({ ok: false, isSuccess: false, result: data[0]?.Result, message:'Examiner has not been assigned in Exam room', error: err });
            } else {
                res.status(200).send({ ok: true, isSuccess: true, result: data, error: err });
            }
        }
    })
}

exports.getAllUnFinishedSlot = async function (req, res) {
    examiner.getAllUnFinishedSlot(req.query.examinerID, function (err, data) {
        if (err) {
            res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
        } else {
            if (!data[0]?.examSlotID) {
                res.status(400).send({ ok: false, isSuccess: false, result: data[0]?.Result, message:'Examiner has not been assigned in Exam room', error: err });
            } else {
                res.status(200).send({ ok: true, isSuccess: true, result: data, error: err });
            }
        }
    })
}

exports.getRegistered = async function (req, res) {
    examiner.getRegistered(function (err, data) {
        if (err) {
            res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
        } else {
            res.status(200).send({ ok: true, isSuccess: true, result: data, error: err });
        }
    })
}

exports.getCurrentDateExamSlot = async function (req, res) {
    examiner.getCurrentDateExamSlot(function (err, data) {
        if (err) {
            res.status(400).send({ ok: false, isSuccess: false, result: data, error: err });
        } else {
            res.status(200).send({ ok: true, isSuccess: true, result: data, error: err });
        }
    })
}