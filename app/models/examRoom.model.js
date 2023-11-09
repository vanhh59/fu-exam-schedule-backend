var { conn, sql } = require('../../connect');
const queries = require("../sql/Queries");

module.exports = class examRoom {
    async getListAll(result) {
        var pool = await conn;
        var sqlQuery = queries.getInfoExamRoom;
        return await pool.request()
            .query(sqlQuery, function (error, data) {
                if (data.recordset && data.recordset.length > 0) {
                    result(null, data.recordset);
                } else {
                    result(true, null);
                }
            });
    }

    async getListByID(id, result) {
        var pool = await conn;
        var sqlQuery = queries.getInfoExamRoomById;
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
    
    async updateExamRoomAddExaminer(examRoom, result) {
        var pool = await conn;
        var sqlQuery = queries.updateExamRoomAddExaminer;
        return await pool.request()
            .input('examSlotID', sql.VarChar, examRoom.examSlotID)
            .input('examinerID', sql.VarChar, examRoom.examinerID)
            .input('examRoomID', sql.VarChar, examRoom.examRoomID)
            .query(sqlQuery, function (error, data) {
                if (data?.recordset) {
                    result(null, data.recordset);
                } else {
                    result(error.message, null);
                }
            });
    }

}
