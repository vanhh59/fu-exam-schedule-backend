const { conn, sql } = require('../../connect');
module.exports = class ExamBatch {
    async getAll(result) {
        let pool = await conn;
        let sqlQuery = "SELECT * FROM ExamBatch";
        return await pool.request()
            .query(sqlQuery, function (error, data) {
                if (data.recordset && data.recordset.length > 0) {
                    result(null, data.recordset);
                } else {
                    result(true, null);
                }
            });
    }
    async getExambatchByCourseID(id, result) {
        let pool = await conn;
        let sqlQuery = "SELECT * FROM ExamBactch WHERE CourseID = @CourseID";
        return await pool.request()
            .input('examinerID', sql.Char, id)
            .query(sqlQuery, function (error, data) {
                if (data.recordset && data.recordset.length > 0) {
                    result(null, data.recordset);
                } else {
                    result(true, null);
                }
            });
    }

    async getByCode(phone, result) {
        var pool = await conn;
        var sqlQuery = "SELECT * FROM ExamBatch WHERE code = @code";
        return await pool.request()
            .input('code', sql.NVarChar, code)
            .query(sqlQuery, function (error, data) {
                if (data.recordset && data.recordset.length > 0) {
                    result(null, data.recordset);
                } else {
                    result(true, null);
                }
            });
    }


    async createExambatch(exambatch, result) {
        var pool = await conn;
        var sqlQuery = "INSERT INTO ExamBatch VALUES (@ID, @CourseID, @code, \
            @date, @location, @status)"
        return await pool.request()
            .input('ID', sql.Char, exambatch.id)
            .input('CourseID', sql.Char, exambatch.CourseID)
            .input('code', sql.NVarChar, exambatch.code)
            .input('date', sql.DateTime, exambatch.date)
            .input('location', sql.NVarChar, exambatch.location)
            .input('status', sql.Int, exambatch.status)
            .query(sqlQuery, function (error, data) {
                if (error) {
                    result(true, null);
                } else {
                    result(null, data);
                }
            });
    }

    async updateExamBatch(id, exambatch, result) {
        var pool = await conn;
        var sqlQuery = "UPDATE ExamBatch SET ID = @ID, CourseID = @CourseID,\
        code = @code, date = @date, location = @location\
            status = @status WHERE ID = @ID";
        return await pool.request()
            .input('ID', sql.Char, exambatch.id)
            .input('CourseID', sql.Char, exambatch.CourseID)
            .input('code', sql.NVarChar, exambatch.code)
            .input('date', sql.DateTime, exambatch.date)
            .input('location', sql.NVarChar, exambatch.location)
            .input('status', sql.Int, exambatch.status)
            .query(sqlQuery, function (error, data) {
                if (error) {
                    result(true, null);
                } else {
                    result(null, data);
                }
            });
    }

    async deleteExambatch(id, status, result) {
        var pool = await conn;
        var sqlQuery = "UPDATE ExamBatch SET status = @status WHERE ID = @ID";
        return await pool.request()
            .input('ID', sql.Char, id)
            .input('status', sql.Bit, false)
            .query(sqlQuery, function (error, data) {
                if (error) {
                    result(true, null);
                } else {
                    result(null, data);
                }
            });
    }
}
