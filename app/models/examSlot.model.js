var { conn, sql } = require('../../connect');
module.exports = class ExamSlot {
    async getAll(result) {
        var pool = await conn;
        var sqlQuery = "SELECT * FROM ExamSlot";
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
        var sqlQuery = "SELECT * FROM ExamSlot WHERE ID = @ID";
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
                    result(true, null);
                } else {
                    result(null, data);
                }
            });
    }

    async update(id, examSlot, result) {
        var pool = await conn;
        var sqlQuery = "UPDATE ExamSlot SET startTime = @startTime, endTime = @endTime,\
            quantity = @quantity, status = @status WHERE ID = @ID";
        return await pool.request()
            .input('ID', sql.Char, examSlot.ID)
            .input('examBatchID', sql.Char, examSlot.examBatchID)
            .input('startTime', sql.DateTime, examSlot.startTime)
            .input('endTime', sql.DateTime, examSlot.endTime)
            .input('quantity', sql.Int, examSlot.quantity)
            .input('status', sql.Int, examSlot.status)
            .query(sqlQuery, function (error, data) {
                if (error) {
                    result(true, null);
                } else {
                    result(null, data);
                }
            });
    }
}
