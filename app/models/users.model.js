var { conn, sql } = require("../../connect");
const queries = require("../sql/Queries");

module.exports = class Users {
  async getAllUsers(result) {
    const pool = await conn;
    const sqlQuery = queries.getAllUsers;
    return await pool
      .request()
      .query(sqlQuery, function (error, data) {
        if (data.recordset && data.recordset.length > 0) {
          result(null, data.recordset);
        } else {
          result(error, null);
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
          result(error, null);
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

  async checkEmailIsValid(email, result) {
    var pool = await conn;
    var sqlQuery = queries.checkEmailIsValid;
    return await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query(sqlQuery, function (error, data) {
        if (data.recordset && data.recordset.length > 0) {
          result(null, data.recordset);
        } else {
          result(error, null);
        }
      });
  }

  async registerUser(item, result) {
    var pool = await conn;
    var sqlQuery = queries.registerUser;
    return await pool
      .request()
      .input("email", sql.NVarChar, item.email)
      .input("userName", sql.NVarChar, item.userName)
      .query(sqlQuery, function (error, data) {
        if (data) {
          result(null, data);
        } else {
          result(error, null);
        }
      });
  }

  async authorizeUser(item, result) {
    var pool = await conn;
    let sqlQuery = queries.authorizeUser;
    if (item.Role == "Lecturer") {
      sqlQuery = queries.authorizeUserLecturer;
    } 
    return await pool.request()
    .input('ID', sql.VarChar, item.ID)
    .input('Role', sql.VarChar, item.Role)
        .query(sqlQuery, function (error, data) {
            if (error) {
                result(error.message, null);
            } else {
                result(null, data);
            }
        });
  }
};
