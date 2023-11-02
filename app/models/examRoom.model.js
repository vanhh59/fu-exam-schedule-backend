var { conn, sql } = require('../../connect');

module.exports = class examRoom {
    async getListAll(result) {
        var pool = await conn;
        var sqlQuery = "SELECT * FROM [dbo].[ExamRoom]";
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
        var sqlQuery = "SELECT * FROM [dbo].[ExamRoom] WHERE ID = @ID";
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
