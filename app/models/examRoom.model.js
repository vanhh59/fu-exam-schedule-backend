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
}
