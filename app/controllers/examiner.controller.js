var { conn, sql } = require('../../connect');
var Examiner = require('../models/examiner.model');
var examiner = new Examiner();

exports.getListAll = async function (req, res) {
    examiner.getAll(function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.getListByID = async function (req, res) {
    examiner.getByID(req.params.id, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.getExaminerByEmail = async function (req, res) {
    examiner.getByEmail(req.params.email, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.createNewExaminer = async function (req, res) {
    examiner.create(req.body, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.updateExaminer = async function (req, res) {
    examiner.update(req.body.ID, req.body, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.deleteByID = async function (req, res) {
    var id = req.params.id;
    var pool = await conn;
    var sqlQuery = "UPDATE FROM Examiner SET status = 0 WHERE ID = @ID";
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
    var pool = await conn;
    var sqlQuery = "UPDATE FROM Examiner SET status = 0";
    return await pool.request()
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

exports.search = async function (req, res) {
    var keyword = req.params.keyword;
    var pool = await conn;
    var sqlQuery = "SELECT * FROM Examiner WHERE ID LIKE @keyword OR name LIKE @keyword OR email LIKE @keyword OR experienceYears LIKE @keyword OR specialization LIKE @keyword";
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
    var sqlQuery = "SELECT * FROM Examiner ORDER BY " + sort;
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