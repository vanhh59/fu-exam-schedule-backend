var { conn, sql } = require('../../connect');
module.exports = class Student {
    async getAll(result) {
        var pool = await conn;
        var sqlQuery = "SELECT * FROM Student";
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
        var sqlQuery = "SELECT * FROM Student WHERE ID = @ID";
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

    async getByEmail(email, result) {
        var pool = await conn;
        var sqlQuery = "SELECT * FROM Student WHERE email = @email";
        return await pool.request()
            .input('email', sql.VarChar, email)
            .query(sqlQuery, function (error, data) {
                if (data.recordset && data.recordset.length > 0) {
                    result(null, data.recordset);
                } else {
                    result(true, null);
                }
            });
    }

    async create(student, result) {
        var pool = await conn;
        var sqlQuery = "INSERT INTO Student VALUES (@ID, @name, @email, \
            @dateOfBirth, @major, @yearOfStudy, @status)"
        return await pool.request()
            .input('ID', sql.VarChar, student.ID)
            .input('name', sql.NVarChar, student.name)
            .input('email', sql.VarChar, student.email)
            .input('dateOfBirth', sql.Date, student.dateOfBirth)
            .input('major', sql.NVarChar, student.major)
            .input('yearOfStudy', sql.Int, student.yearOfStudy)
            .input('status', sql.Int, student.status)
            .query(sqlQuery, function (error, data) {
                if (error) {
                    result(true, null);
                } else {
                    result(null, data);
                }
            });
    }

    async update(id, student, result) {
        var pool = await conn;
        var sqlQuery = "UPDATE Student SET name = @name, email = @email,\
            dateOfBirth = @dateOfBirth, major = @major, yearOfStudy = @yearOfStudy,\
            status = @status WHERE ID = @ID";
        return await pool.request()
            .input('ID', sql.VarChar, id)
            .input('name', sql.NVarChar, student.name)
            .input('email', sql.VarChar, student.email)
            .input('dateOfBirth', sql.Date, student.dateOfBirth)
            .input('major', sql.NVarChar, student.major)
            .input('yearOfStudy', sql.Int, student.yearOfStudy)
            .input('status', sql.Int, student.status)
            .query(sqlQuery, function (error, data) {
                if (error) {
                    result(true, null);
                } else {
                    result(null, data);
                }
            });
    }



}