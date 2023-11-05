var { conn, sql } = require('../../connect');
const queries = require("../sql/Queries");

// CREATE TABLE Semester
// (
//     ID char(20) PRIMARY KEY,
//     code nvarchar(50),
//     name nvarchar(100),
//     year int,
//     startDate datetime,
//     endDate datetime,
//     status bit
// );

module.exports = class Semester {
    async getAll(result) {
        let pool = await conn;
        let sqlQuery = "SELECT * FROM Semester";
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
        var sqlQuery = "SELECT * FROM Semester WHERE ID = @ID";
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

    async create(newSemester, result) {
        let pool = await conn;
        let sqlQuery = "INSERT INTO Semester (ID, code, name, year, startDate, endDate, status) VALUES (@ID, @code, @name, @year, @startDate, @endDate, @status)";
        return await pool.request()
            .input('ID', sql.VarChar, newSemester.ID)
            .input('code', sql.NVarChar, newSemester.code)
            .input('name', sql.NVarChar, newSemester.name)
            .input('year', sql.Int, newSemester.year)
            .input('startDate', sql.DateTime, newSemester.startDate)
            .input('endDate', sql.DateTime, newSemester.endDate)
            .input('status', sql.Bit, newSemester.status)
            .query(sqlQuery, function (error, data) {
                if (error) {
                    result(true, null);
                } else {
                    result(null, data);
                }
            });
    }

    async update(id, semester, result) {
        let pool = await conn;
        let sqlQuery = "UPDATE Semester SET code = @code, name = @name, year = @year, startDate = @startDate, endDate = @endDate, status = @status WHERE ID = @ID";
        return await pool.request()
            .input('ID', sql.VarChar, id)
            .input('code', sql.NVarChar, semester.code)
            .input('name', sql.NVarChar, semester.name)
            .input('year', sql.Int, semester.year)
            .input('startDate', sql.DateTime, semester.startDate)
            .input('endDate', sql.DateTime, semester.endDate)
            .input('status', sql.Bit, semester.status)
            .query(sqlQuery, function (error, data) {
                if (error) {
                    result(true, null);
                } else {
                    result(null, data);
                }
            });
    }

    async deleteByUpdate(id, result) {
        let pool = await conn;
        let sqlQuery = "UPDATE Semester SET status = 0 WHERE ID = @ID";
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

    async getAllSalariesEachSemester(result) {
        let pool = await conn;
        let sqlQuery = queries.getAllSalariesEachSemester;
        return await pool.request().query(sqlQuery, function (error, data) {
            if (data.recordset && data.recordset.length > 0) {
                result(null, data.recordset);
            } else {
                result(true, null);
            }
        });
    }
}

