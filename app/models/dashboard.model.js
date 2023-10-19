var { conn, sql } = require('../../connect');
const queries = require("../sql/Queries");

module.exports = class Dashboard {
    async getAllExamSchedule(result) {
        var pool = await conn;
        var sqlQuery = queries.getExamSchedule;
        return await pool.request()
            .query(sqlQuery, function (error, data) {
                if (data.recordset && data.recordset.length > 0) {
                    result(null, data.recordset);
                } else {
                    result(true, null);
                }
            });
    }

    async createExamSchedule(data, result) {
        var pool = await conn;
        var sqlQuery = queries.createExamSlotAndExamBatch;
        return await pool.request()
            .input('courseID', sql.Int, data.courseID)
            .input('code', sql.NVarChar, data.code)
            .input('startTime', sql.Date, data.startTime)
            .input('endTime', sql.Date, data.endTime)
            .query(sqlQuery, function (error, data) {
                if (error) {
                    result(error, null);
                } else {
                    result(null, data);
                }
            });
    }

    async register(data, result) {
        var pool = await conn;
        var sqlQuery = queries.register;
        return await pool.request()
            .input('examinerID', sql.Char, data.examinerID)
            .input('examSlotID', sql.Char, data.examSlotID)
            .query(sqlQuery, function (error, data) {
                if (error) {
                    result(error, null);
                } else {
                    result(null, data);
                }
            });
    }
}