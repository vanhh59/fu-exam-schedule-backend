var { conn, sql } = require("../../connect");
const queries = require("../sql/Queries");

module.exports = class Student {
  async getAll(result) {
    var pool = await conn;
    var sqlQuery = "SELECT * FROM Student";
    return await pool.request().query(sqlQuery, function (error, data) {
      if (data.recordset && data.recordset.length > 0) {
        result(null, data.recordset);
      } else {
        result(true, null);
      }
    });
  }

  async getExamSlotByStudentId(stuID, SemesterCode, result) {
    console.log(stuID);
    console.log(SemesterCode);
    let pool = await conn;
    let sqlQuery = queries.getExamSlotByStudentID;
    return await pool
      .request()
      .input("StudentId", sql.VarChar, stuID)
      .input("SemesterCode", sql.VarChar, SemesterCode)
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
    var sqlQuery = "SELECT * FROM Student WHERE ID = @ID";
    return await pool
      .request()
      .input("ID", sql.VarChar, id)
      .query(sqlQuery, function (error, data) {
        if (data.recordset && data.recordset.length > 0) {
          result(null, data.recordset);
        } else {
          result(true, null);
        }
      });
  }

  async getByEmail(email, result) {
    var pool = await conn;
    var sqlQuery = "SELECT * FROM Student WHERE email = @email";
    return await pool
      .request()
      .input("email", sql.VarChar, email)
      .query(sqlQuery, function (error, data) {
        if (data.recordset && data.recordset.length > 0) {
          result(null, data.recordset);
        } else {
          result(true, null);
        }
      });
  }

  async create(student, result) {
    var pool = await conn;
    var sqlQuery =
      "INSERT INTO Student VALUES (@ID, @name, @email, \
            @dateOfBirth, @major, @yearOfStudy, @status)";
    return await pool
      .request()
      .input("ID", sql.VarChar, student.ID)
      .input("name", sql.NVarChar, student.name)
      .input("email", sql.VarChar, student.email)
      .input("dateOfBirth", sql.Date, student.dateOfBirth)
      .input("major", sql.NVarChar, student.major)
      .input("yearOfStudy", sql.Int, student.yearOfStudy)
      .input("status", sql.Int, student.status)
      .query(sqlQuery, function (error, data) {
        if (error) {
          result(true, null);
        } else {
          result(null, data);
        }
      });
  }

  async update(id, student, result) {
    let pool = await conn;
    let sqlQuery = "UPDATE Student SET";

    // Check and construct the SQL query and parameters based on the provided student data
    if (student.name !== null && student.name !== undefined) {
      sqlQuery += ` name = '${student.name}',`;
    }
    if (student.email !== null && student.email !== undefined) {
      sqlQuery += ` email = '${student.email}',`;
    }
    if (student.dateOfBirth !== null && student.dateOfBirth !== undefined) {
      sqlQuery += ` dateOfBirth = '${student.dateOfBirth}',`;
    }
    if (student.major !== null && student.major !== undefined) {
      sqlQuery += ` major = '${student.major}',`;
    }
    if (student.yearOfStudy !== null && student.yearOfStudy !== undefined) {
      sqlQuery += ` yearOfStudy = '${student.yearOfStudy}',`;
    }

    // Remove the trailing comma and add the WHERE condition
    sqlQuery = sqlQuery.slice(0, -1) + " WHERE ID = @ID";
    console.log("sql Query value ", sqlQuery);
    return await pool
      .request()
      .input("ID", sql.VarChar, id)
      .query(sqlQuery, function (error, data) {
        if (error) {
          result(true, null);
        } else {
          result(null, data);
        }
      });
  }

  async deleteByUpdate(id, status, result) {
    let pool = await conn;
    let sqlQuery = "UPDATE Student SET status = @status WHERE ID = @ID";
    return await pool
      .request()
      .input("ID", sql.VarChar, id)
      .input("status", sql.Bit, false)
      .query(sqlQuery, function (error, data) {
        if (error) {
          result(true, null);
        } else {
          result(null, data);
        }
      });
  }
};
