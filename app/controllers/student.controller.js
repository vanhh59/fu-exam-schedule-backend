var { conn, sql } = require('../../connect');
exports.getListAll = async function (req, res) {
    var pool = await conn;
    var sqlQuery = "SELECT * FROM Student";
    return await pool.request()
        .query(sqlQuery, function (error, data) {
            if (data.recordset && data.recordset.length > 0) {
                res.send({
                    result: data.recordset
                });
            } else {
                res.status(404).send('Không tồn tại sinh viên nào');
            }
        });
}

exports.getListByID = async function (req, res) {
    var id = req.params.id;
    var pool = await conn;
    var sqlQuery = "SELECT * FROM Student WHERE id = @id";
    try {
        let result = await pool.request()
            .input('id', id)
            .query(sqlQuery);

        if (result.recordset && result.recordset.length > 0) {
            res.send({
                result: result.recordset[0]
            });
        } else {
            res.status(404).send('Không tìm thấy sinh viên');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi server');
    }
}

exports.create = async function (req, res) {
    var pool = await conn;
    var sqlQuery = "INSERT INTO Student (ID, name, email, dateOfBirth, major, yearOfStudy, status) VALUES (@ID, @name, @email, @dateOfBirth, @major, @yearOfStudy, @status)"
    return await pool.request()
        .input('ID', sql.VarChar, req.body.ID)
        .input('name', sql.NVarChar, req.body.name)
        .input('email', sql.NVarChar, req.body.email)
        .input('dateOfBirth', sql.Date, req.body.dateOfBirth)
        .input('major', sql.NVarChar, req.body.major)
        .input('yearOfStudy', sql.NVarChar, req.body.yearOfStudy)
        .input('status', sql.Bit, req.body.status)
        .query(sqlQuery, function (error, data) {
            res.send({ result: req.body });
        });
}

exports.update = async function (req, res) {
    var pool = await conn;
    var sqlQuery = "UPDATE Student SET name = @name, email = @email, dateOfBirth = @dateOfBirth, major = @major, yearOfStudy = @yearOfStudy, status = @status WHERE ID = @ID";
    return await pool.request()
        .input('ID', sql.VarChar, req.body.ID)
        .input('name', sql.NVarChar, req.body.name)
        .input('email', sql.NVarChar, req.body.email)
        .input('dateOfBirth', sql.Date, req.body.dateOfBirth)
        .input('major', sql.NVarChar, req.body.major)
        .input('yearOfStudy', sql.Int, req.body.yearOfStudy)
        .input('status', sql.NVarChar, req.body.status)
        .query(sqlQuery, function (error, data) {
            if (!error) {
                res.send({ result: "Update thành công" });
                console.log(data);
            } else {
                res.send({ result: "Update thất bại" });
                console.log(error);
            }
        });
}

exports.deleteByID = async function (req, res) {
    var id = req.params.id;
    var pool = await conn;
    var sqlQuery = "DELETE FROM Student WHERE ID = @ID";
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
    var sqlQuery = "DELETE FROM Student";
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
    var sqlQuery = "SELECT * FROM Student WHERE ID LIKE @keyword OR name LIKE @keyword OR email LIKE @keyword OR major LIKE @keyword OR yearOfStudy LIKE @keyword";
    return await pool.request()
        .input('keyword', sql.NVarChar, '%' + keyword + '%')
        .query(sqlQuery, function (error, data) {
            if (data.recordset && data.recordset.length > 0) {
                res.send({
                    result: data.recordset
                });
            } else {
                res.status(404).send('Không tìm thấy sinh viên');
            }
        });
}

exports.sort = async function (req, res) {
    var sort = req.params.sort;
    var pool = await conn;
    var sqlQuery = "SELECT * FROM Student ORDER BY " + sort;
    return await pool.request()
        .query(sqlQuery, function (error, data) {
            if (data.recordset && data.recordset.length > 0) {
                res.send({
                    result: data.recordset
                });
            } else {
                res.status(404).send('Không tìm thấy sinh viên');
            }
        });
}