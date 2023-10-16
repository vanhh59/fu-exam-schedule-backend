var { conn, sql } = require('../../connect');
module.exports = class Login {
    async getRole(email, result) {
        var pool = await conn;
        var sqlQuery = "SELECT Role FROM Users WHERE Email = @email";
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
}