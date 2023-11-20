var { conn, sql } = require("../../connect");
const queries = require("../sql/Queries");
module.exports = class Examiner {
  async getAll(result) {
    var pool = await conn;
    var sqlQuery = "SELECT * FROM Examiner";
    return await pool.request().query(sqlQuery, function (error, data) {
      if (data.recordset && data.recordset.length > 0) {
        result(null, data.recordset);
      } else {
        result(true, null);
      }
    });
  }

  async getCurrentDateExamSlot(result) {
    let pool = await conn;
    let sqlQuery = queries.getCurrentDateExamSlot;
    return await pool.request().query(sqlQuery, function (error, data) {
      if (data.recordset && data.recordset.length > 0) {
        result(null, data.recordset);
      } else {
        result({ message: "Không có slot thi trong ngày hôm nay" }, null);
      }
    });
  }
  
  async getInfoSalaryAndExaminerAndExamSlotAndExamRoom(examinerID, result) {
    var pool = await conn;
    var sqlQuery = queries.getInfoSalaryAndExaminerAndExamSlotAndExamRoom;
    return await pool
      .request()
      .input("examinerID", sql.VarChar, examinerID)
      .query(sqlQuery, function (error, data) {
        if (data?.recordsets && data.recordsets.length > 0) {
          result(null, data.recordsets);
        } else {
          result(true, null);
        }
      });
  }

  async getRegistered(result) {
    let pool = await conn;
    let sqlQuery = queries.getRegisteredInformation;
    return await pool
      .request()
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
    var sqlQuery = "SELECT * FROM Examiner WHERE ID = @ID";
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
    var sqlQuery = "SELECT * FROM Examiner WHERE email = @email";
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

  async create(Examiner, result) {
    let pool = await conn;
    console.log(Examiner.name);
    let sqlQuery =
      ` INSERT INTO [Examiner] VALUES (@ID, @name, @email, 
        @experienceYears, @specialization, @status)`;
    return await pool
      .request()
      .input("ID", sql.VarChar, Examiner.ID)
      .input("name", sql.NVarChar, Examiner.name)
      .input("email", sql.VarChar, Examiner.email)
      .input("experienceYears", sql.Int, Examiner.experienceYears)
      .input("specialization", sql.NVarChar, Examiner.specialization)
      .input("status", sql.Int, Examiner.status)
      .query(sqlQuery, function (error, data) {
        if (error) {
          result(true, null);
        } else {
          result(null, data);
        }
      });
  }

  async update(id, Examiner, result) {
    var pool = await conn;
    console.log(Examiner);
    var sqlQuery =
      "UPDATE [Examiner] SET name = @name, email = @email,\
        experienceYears = @experienceYears, specialization = @specialization,\
            status = @status WHERE ID = @ID";
    return await pool
      .request()
      .input("ID", sql.VarChar, Examiner.ID)
      .input("name", sql.NVarChar, Examiner.name)
      .input("email", sql.VarChar, Examiner.email)
      .input("experienceYears", sql.Int, Examiner.experienceYears)
      .input("specialization", sql.NVarChar, Examiner.specialization)
      .input("status", sql.Int, Examiner.status)
      .query(sqlQuery, function (error, data) {
        if (error) {
          result(true, null);
        } else {
          result(null, data);
        }
      });
  }

  async deleteExaminer(id, status, result) {
    var pool = await conn;
    var sqlQuery = "UPDATE Examiner SET status = @status WHERE ID = @ID";
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

  async getExaminerSalary(examinerID, SemesterCode, result) {
    let pool = await conn;
    let sqlQuery = queries.income;
    return await pool
      .request()
      .input("examinerID", sql.VarChar, examinerID)
      .input("SemesterCode", sql.VarChar, SemesterCode)
      .query(sqlQuery, function (error, data) {
        if (error) {
          result(true, null);
        } else {
          result(null, data.recordset);
        }
      });
  }

  async getAllExaminerSalary(data, result) {
    let pool = await conn;
    let sqlQuery = queries.getAllIncome;
    return await pool.request()
      .input('SemesterCode', sql.VarChar, data)
      .query(sqlQuery, function (error, data) {
        if (error) {
          result(true, null);
        } else {
          result(null, data.recordset);
        }
      });

  }

  async getAllAvailableSlot(examinerID, result) {
    let pool = await conn;
    let sqlQuery = queries.getAvailableSlots;
    return await pool.request()
      .input('examinerID', sql.VarChar, examinerID)
      .query(sqlQuery, function (error, data) {
        if (error) {
          result(true, null);
        } else {
          result(null, data.recordset);
        }
      });
  }

  async getExaminerExamRooms(examinerID, result) {
    let pool = await conn;
    let sqlQuery = queries.getExamRoomByExaminerID;
    return await pool
      .request()
      .input("examinerID", sql.VarChar, examinerID)
      .query(sqlQuery, function (error, data) {
        if (error) {
          result(error, null);
        } else {
          result(null, data.recordset);
        }
      });
  }

  async getAllFinishedSlot(examinerID, result) {
    let pool = await conn;
    let sqlQuery = queries.getFinishedExamSlot;
    return await pool.request()
      .input('examinerID', sql.VarChar, examinerID)
      .query(sqlQuery, function (error, data) {
        if (error) {
          result(error?.message, null);
        } else {
          result(null, data?.recordsets[0]);
        }
      });
  }

  async getAllUnFinishedSlot(examinerID, result) {
    let pool = await conn;
    let sqlQuery = queries.getUnFinishedExamSlot;
    return await pool.request()
      .input('examinerID', sql.VarChar, examinerID)
      .query(sqlQuery, function (error, data) {
        if (error) {
          result(error?.message, null);
        } else {
          result(null, data?.recordsets[0]);
        }
      });
  }

  async getCurrentDateExamSlot(result) {
    let pool = await conn;
    let sqlQuery = queries.getCurrentDateExamSlot;
    return await pool.request().query(sqlQuery, function (error, data) {
      if (data.recordset && data.recordset.length > 0) {
        result(null, data.recordset);
      } else {
        result(true, null);
      }
    });
  }

  async getRegistered(Examslot, examinerID, name, result) {
    let pool = await conn;
    let sqlQuery = queries.getRegisteredInformation;
    return await pool
      .request()
      .input("examinerID", sql.VarChar, examinerID)
      .input("examSlotID", sql.VarChar, Examslot)
      .query(sqlQuery, function (error, data) {
        if (data) {
          result(null, data);
        } else {
          result(true, null);
        }
      });
  }

  async filterExamSlot(examinerID, semesterID, month, week, result) {
    let pool = await conn;
    let sqlQuery = queries.filterExamSlotAll;
    if (semesterID != null && semesterID != undefined && semesterID != '""') {
      sqlQuery = queries.filterExamSlotSemester;
      if (month != null && month != undefined && month != '""') {
        sqlQuery = queries.filterExamSlotMonth;
        if (week != null && week != undefined && week != '""') {
          sqlQuery = queries.filterExamSlotWeek;
        }
      }
    }
    if (semesterID == null || semesterID == '""') {
      semesterID = ''
    }

    if (month == null || month == '""') {
      month = 0
    }

    if (week == null || week == '""') {
      week = 0
    }
    return await pool
      .request()
      .input("examinerID", sql.VarChar, examinerID)
      .input("semesterID", sql.VarChar, semesterID)
      .input("month", sql.Int, month)
      .input("week", sql.Int, week)
      .query(sqlQuery, function (error, data) {
        if (data?.recordset && data?.recordset.length > 0) {
          result(null, data?.recordset);
        } else {
          result(error, null);
        }
      });
  }
};