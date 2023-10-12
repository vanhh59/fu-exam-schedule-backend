// CREATE TABLE Subject
// (
//     ID char(20) PRIMARY KEY,
//     code nvarchar(50),
//     name nvarchar(100),
//     credit int,
//     status bit
// );
var { conn, sql } = require('../../connect');
module.exports = class Subject {
    async getAll(result) {
        var pool = await conn;
        var sqlQuery = "SELECT * FROM Subject";
        return await pool.request()
            .query(sqlQuery, function (error, data) {
                if (data.recordset && data.recordset.length > 0) {
                    result(null, data.recordset);
                } else {
                    result(true, null);
                }
            });
    }

    async getByID(id, result) {
        var pool = await conn;
        var sqlQuery = "SELECT * FROM Subject WHERE ID = @ID";
        return await pool.request()
            .input('ID', sql.VarChar, id)
            .query(sqlQuery, function (error, data) {
                if (data.recordset && data.recordset.length > 0) {
                    result(null, data.recordset);
                } else {
                    result(true, null);
                }
            });
    }

    async create(subject, result) {
        var pool = await conn;
        var sqlQuery = "INSERT INTO Subject VALUES (@ID, @code, @name, @credit, @status)"
        return await pool.request()
            .input('ID', sql.VarChar, subject.ID)
            .input('code', sql.NVarChar, subject.code)
            .input('name', sql.NVarChar, subject.name)
            .input('credit', sql.Int, subject.credit)
            .input('status', sql.Int, subject.status)
            .query(sqlQuery, function (error, data) {
                if (error) {
                    result(true, null);
                } else {
                    result(null, data);
                }
            });
    }

    async update(subject, result) {
        var pool = await conn;
        var sqlQuery = "UPDATE Subject SET code = @code, name = @name, credit = @credit, status = @status WHERE ID = @ID";
        return await pool.request()
            .input('ID', sql.VarChar, subject.ID)
            .input('code', sql.NVarChar, subject.code)
            .input('name', sql.NVarChar, subject.name)
            .input('credit', sql.Int, subject.credit)
            .input('status', sql.Int, subject.status)
            .query(sqlQuery, function (error, data) {
                if (error) {
                    result(true, null);
                } else {
                    result(null, data);
                }
            });
    }

    async deleteByUpdate(id, result) {
        var pool = await conn;
        var sqlQuery = "UPDATE Subject SET status = 0 WHERE ID = @ID";
        return await pool.request()
            .input('ID', sql.VarChar, id)
            .query(sqlQuery, function (error, data) {
                if (error) {
                    result(true, null);
                } else {
                    result(null, data);
                }
            });
    }

}