var { conn, sql } = require('../../connect');
const queries = require('../sql/Queries');
module.exports = class Examiner {
    async getAll(result) {
        var pool = await conn;
        var sqlQuery = "SELECT * FROM Examiner";
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
        var sqlQuery = "SELECT * FROM Examiner WHERE ID = @ID";
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
        var sqlQuery = "SELECT * FROM Examiner WHERE email = @email";
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

    async create(Examiner, result) {
        var pool = await conn;
        var sqlQuery = "INSERT INTO Examiner VALUES (@ID, @name, @email, \
            @experienceYears, @specialization, @status)"
        return await pool.request()
            .input('ID', sql.VarChar, Examiner.ID)
            .input('name', sql.NVarChar, Examiner.name)
            .input('email', sql.VarChar, Examiner.email)
            .input('experienceYears', sql.Int, Examiner.experienceYears)
            .input('specialization', sql.NVarChar, Examiner.specialization)
            .input('status', sql.Int, Examiner.status)
            .query(sqlQuery, function (error, data) {
                if (error) {
                    result(true, null);
                } else {
                    result(null, data);
                }
            });
    }

    async update(id, Examiner, result) {
        var pool = await conn;
        var sqlQuery = "UPDATE Examier SET name = @name, email = @email,\
        experienceYears = @experienceYears, specialization = @specialization,\
            status = @status WHERE ID = @ID";
        return await pool.request()
            .input('ID', sql.VarChar, Examiner.ID)
            .input('name', sql.NVarChar, Examiner.name)
            .input('email', sql.VarChar, Examiner.email)
            .input('experienceYears', sql.Int, Examiner.experienceYears)
            .input('specialization', sql.NVarChar, Examiner.specialization)
            .input('status', sql.Int, Examiner.status)
            .query(sqlQuery, function (error, data) {
                if (error) {
                    result(true, null);
                } else {
                    result(null, data);
                }
            });
    }

    async deleteExaminer(id, status, result) {
        var pool = await conn;
        var sqlQuery = "UPDATE Examiner SET status = @status WHERE ID = @ID";
        return await pool.request()
            .input('ID', sql.VarChar, id)
            .input('status', sql.Bit, false)
            .query(sqlQuery, function (error, data) {
                if (error) {
                    result(true, null);
                } else {
                    result(null, data);
                }
            });
    }

    async getExaminerSalary(id, result) {
        let pool = await conn;
        let sqlQuery = queries.income;
        return await pool.request()
            .input('examinerID', sql.Char, id)
            .query(sqlQuery, function (error, data) {
                if (error) {
                    result(true, null);
                } else {
                    result(null, data.recordset);
                }
            });

    }

    async getAllExaminerSalary(result) {
        let pool = await conn;
        let sqlQuery = queries.getAllIncome;
        return await pool.request()
            .query(sqlQuery, function (error, data) {
                if (error) {
                    result(true, null);
                } else {
                    result(null, data.recordset);
                }
            });

    }

    async getAllAvailableSlot(id, result) {
        let pool = await conn;
        let sqlQuery = queries.getAvailableSlots;
        return await pool.request()
            .input('examinerID', sql.Char, id)
            .query(sqlQuery, function (error, data) {
                if (error) {
                    result(true, null);
                } else {
                    result(null, data.recordset);
                }
            });

    }

}
