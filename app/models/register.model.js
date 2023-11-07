var { conn, sql } = require('../../connect');
const queries = require("../sql/Queries");

module.exports = class Register {
    async getListAll(result) {
        var pool = await conn;
        var sqlQuery = queries.getRegisterWithExaminerInfo;
        return await pool.request()
            .query(sqlQuery, function (error, data) {
                if (data.recordset && data.recordset.length > 0) {
                    result(null, data.recordset);
                } else {
                    result(true, null);
                }
            });
    }
}
