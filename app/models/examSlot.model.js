var { conn, sql } = require('../../connect');
const queries = require('../sql/Queries');
module.exports = class ExamSlot {
    async getAll(result) {
        var pool = await conn;
        var sqlQuery = queries.getExamSlotInfo
        return await pool.request()
            .query(sqlQuery, function (error, data) {
                if (data.recordset && data.recordset.length > 0) {
                    result(null, data.recordset);
                } else {
                    result(error, null);
                }
            });
    }

    async getExamSlotFullInfo(result) {
        var pool = await conn;
        var sqlQuery = queries.getExamSlotFullInfo
        return await pool.request()
            .query(sqlQuery, function (error, data) {
                if (data.recordset && data.recordset.length > 0) {
                    result(null, data);
                } else {
                    result(error, null);
                }
            });
    }

    async getByID(id, result) {
        var pool = await conn;
        var sqlQuery = queries.getExamSlotInfoById
        return await pool.request()
            .input('ID', sql.VarChar, id)
            .query(sqlQuery, function (error, data) {
                if (data.recordset && data.recordset.length > 0) {
                    result(null, data.recordset);
                } else {
                    result(error, null);
                }
        });
    }
    
    async getSubjectIDSubjectNameByExamSlotID(id, result) {
        var pool = await conn;
        var sqlQuery = queries.getSubjectIDSubjectNameByExamSlotID;
        return await pool.request()
            .input('examSlotID', sql.VarChar, id)
            .query(sqlQuery, function (error, data) {
                if (data.recordset && data.recordset.length > 0) {
                    result(null, data.recordset);
                } else {
                    result(error, null);
                }
        });
    }

    async getExamSlotNull(result) {
        var pool = await conn;
        var sqlQuery = queries.getExamSlotNull;
        return await pool.request()
            .query(sqlQuery, function (error, data) {
                if (data.recordset && data.recordset.length > 0) {
                    result(null, data.recordset);
                } else {
                    result(error, null);
                }
            });
    }

    async create(examSlot, result) {
        var pool = await conn;
        var sqlQuery = "INSERT INTO ExamSlot VALUES (@ID, @examBatchID, @startTime, \
            @endTime, @quantity, @status)"
        return await pool.request()
            .input('ID', sql.Char, examSlot.ID)
            .input('examBatchID', sql.Char, examSlot.examBatchID)
            .input('startTime', sql.DateTime, examSlot.startTime)
            .input('endTime', sql.DateTime, examSlot.endTime)
            .input('quantity', sql.Int, examSlot.quantity)
            .input('status', sql.Int, examSlot.status)
            .query(sqlQuery, function (error, data) {
                if (error) {
                    result(error, null);
                } else {
                    result(null, data);
                }
            });
    }

    async updateExamSlot(id, examSlot, result) {
        var pool = await conn;
        var sqlQuery = queries.updateExamSlot;
        return await pool.request()
            .input('ID', sql.VarChar, id)
            .input('startTime', sql.DateTime, examSlot.startTime)
            .input('endTime', sql.DateTime, examSlot.endTime)
            .input('quantity', sql.Int, examSlot.quantity)
            .query(sqlQuery, function (error, data) {
                if (data?.recordset) {
                    result(null, data.recordset);
                } else {
                    result(error.message, null);
                }
            });
    }

    async deleteExamSlot(id, result) {
        var pool = await conn;
        var sqlQuery = queries.deleteExamSlot;
        return await pool.request()
            .input('ID', sql.VarChar, id)
            .query(sqlQuery, function (error, data) {
                if (data.recordset && data.recordset.length > 0) {
                    result(null, data.recordset);
                } else {
                    result(error.message, null);
                }
            });
    }
}
