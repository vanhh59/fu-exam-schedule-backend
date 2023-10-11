var { conn, sql } = require('../../connect');
var ExamSlot = require('../models/examSlot.model');
var examSlot = new ExamSlot();

exports.getListAll = async function (req, res) {
    examSlot.getAll(function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.getListByID = async function (req, res) {
    examSlot.getByID(req.params.id, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.createExamSlot = async function (req, res) {
    examSlot.create(req.body, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.search = async function (req, res) {
    var keyword = req.params.keyword;
    var pool = await conn;
    var sqlQuery = "SELECT * FROM ExamSlot WHERE ID LIKE @keyword OR name";
    return await pool.request()
        .input('keyword', sql.NVarChar, '%' + keyword + '%')
        .query(sqlQuery, function (error, data) {
            if (data.recordset && data.recordset.length > 0) {
                res.send({
                    result: data.recordset
                });
            } else {
                res.status(404).send('Không tìm thấy!');
            }
        });
}

exports.sort = async function (req, res) {
    var sort = req.params.sort;
    var pool = await conn;
    var sqlQuery = "SELECT * FROM ExamSlot ORDER BY " + sort;
    return await pool.request()
        .query(sqlQuery, function (error, data) {
            if (data.recordset && data.recordset.length > 0) {
                res.send({
                    result: data.recordset
                });
            } else {
                res.status(404).send('Không tìm thấy!');
            }
        });

}

exports.updateExamSLot = async function (req, res) {
    student.update(req.body.ID, req.body, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.deleteByID = async function (req, res) {
    var id = req.params.id;
    var pool = await conn;
    var sqlQuery = "UPDATE ExamSlot SET status = 0 WHERE ID = @ID";
    return await pool.request()
        .input('ID', sql.VarChar, id)
        .query(sqlQuery)
        .then(function (data) {
            res.send({ result: "Xóa thành công" });
            console.log(data);
        })
        .catch(function (error) {
            res.send({ result: "Xóa thất bại" });
            console.log(error);
        });
}
exports.deleteAll = async function (req, res) {
    var id = req.params.id;
    var pool = await conn;
    var sqlQuery = "UPDATE ExamSlot SET status = 0";
    return await pool.request()
        .input('ID', sql.VarChar, id)
        .query(sqlQuery)
        .then(function (data) {
            res.send({ result: "Xóa thành công" });
            console.log(data);
        })
        .catch(function (error) {
            res.send({ result: "Xóa thất bại" });
            console.log(error);
        });
}