var { conn, sql } = require('../../connect');
module.exports = class ExamBatch {
    async getAll(result) {
        var pool = await conn;
        var sqlQuery = "SELECT * FROM ExamBatch";
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
        var pool = await conn;
        var sqlQuery = "SELECT * FROM ExamBatch WHERE courseID = @courseID";
        return await pool.request()
            .input('courseID', sql.VarChar, id)
            .query(sqlQuery, function (error, data) {
                if (data.recordset && data.recordset.length > 0) {
                    result(null, data.recordset);
                } else {
                    result(error.message, null);
                }
            });
    }
    
    async getListByID(id, result) {
        var pool = await conn;
        var sqlQuery = "SELECT * FROM ExamBatch WHERE ID = @ID";
        return await pool.request()
            .input('ID', sql.Int, id)
            .query(sqlQuery, function (error, data) {
                if (data.recordset && data.recordset.length > 0) {
                    result(null, data.recordset);
                } else {
                    result(error.message, null);
                }
            });
    }

    async getByCode(id, result) {
        var pool = await conn;
        var sqlQuery = "SELECT * FROM ExamBatch WHERE code = @code";
        return await pool.request()
            .input('code', sql.VarChar, id)
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
        var sqlQuery = "UPDATE ExamBatch SET courseID = @courseID, \
        code = @code, date = @date, location = @location, \
            status = @status WHERE ID = @ID";
        return await pool.request()
        .input('ID', sql.Int, id)
        .input('courseID', sql.VarChar, exambatch.courseID)
        .input('code', sql.VarChar, exambatch.code)
        .input('date', sql.DateTime, exambatch.date)
        .input('location', sql.NVarChar, exambatch.location)
        .input('status', sql.Bit, exambatch.status)
            .query(sqlQuery, function (error, data) {
                if (error) {
                    result(error.message, null);
                } else {
                    result(null, data);
                }
            });
    }

    async deleteExambatch(id, result) {
        var pool = await conn;
        var sqlQuery = "UPDATE ExamBatch SET status = @status WHERE ID = @ID";
        return await pool.request()
            .input('ID', sql.Int, id)
            .input('status', sql.Bit, 0)
            .query(sqlQuery, function (error, data) {
                if (error) {
                    result(error.message, null);
                } else {
                    result(null, data);
                }
            });
    }
}
