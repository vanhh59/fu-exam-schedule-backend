var { conn, sql } = require('../../connect');
var Department = require('../models/department.model');
var department = new Department();

exports.getListAll = async function (req, res) {
    department.getAll(function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.getDepartmentByExaminerID = async function (req, res) {
    department.getDepartmentByExaminerID(req.params.examinerID, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.getByLocation = async function (req, res) {
    department.getByLocation(req.params.location, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.getByPhone = async function (req, res) {
    department.getByPhone(req.params.phone, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.getByName = async function (req, res) {
    department.getByName(req.params.name, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.createDepartment = async function (req, res) {
    department.create(req.body, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.search = async function (req, res) {
    var keyword = req.params.keyword;
    var pool = await conn;
    var sqlQuery = "SELECT * FROM Department WHERE name LIKE @keyword OR examinerType LIKE @keyword OR faculty LIKE @keyword OR location LIKE @keyword OR phone LIKE @keyword";
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

exports.updateDepartment = async function (req, res) {
    department.update(req.body.ID, req.body, function (err, data) {
        res.send({ result: data, error: err });
    });
}

exports.deleteDepartment = async function (req, res) {
    var name = req.params.name;
    var pool = await conn;
    var sqlQuery = "UPDATE Department SET status = 0 WHERE name = @name";
    return await pool.request()
        .input('name', sql.VarChar, name)
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
    var name = req.params.name;
    var pool = await conn;
    var sqlQuery = "UPDATE Department SET status = 0";
    return await pool.request()
        .input('name', sql.VarChar, name)
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