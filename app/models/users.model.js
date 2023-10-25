var { conn, sql } = require("../../connect");
const queries = require("../sql/Queries");

module.exports = class Users {
  async getAllUsers() {
    return new Promise(async (resolve, reject) => {
      try {
        const pool = await conn;
        const sqlQuery = queries.getAllUsers;
        const result = await pool.request().query(sqlQuery);
        if (result.recordset && result.recordset.length > 0) {
          resolve(result.recordset);
        } else {
          reject(new Error("No user data found."));
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  async getUsersByEmail(email, result) {
    var pool = await conn;
    var sqlQuery = queries.getUserByEmail;
    return await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query(sqlQuery, function (error, data) {
        if (data.recordset && data.recordset.length > 0) {
          result(null, data.recordset);
        } else {
          result(true, null);
        }
      });
  }

  async getUserByID(ID, result) {
    var pool = await conn;
    var sqlQuery = queries.getUserByID;
    return await pool
      .request()
      .input("ID", sql.NVarChar, ID)
      .query(sqlQuery, function (error, data) {
        if (data.recordset && data.recordset.length > 0) {
          result(null, data.recordset);
        } else {
          result(true, null);
        }
      });
  }
};
