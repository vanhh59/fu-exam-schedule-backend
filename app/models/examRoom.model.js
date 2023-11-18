var { conn, sql } = require('../../connect');
const excel = require("exceljs");
const queries = require("../sql/Queries");

module.exports = class examRoom {
  async getListAll(result) {
    var pool = await conn;
    var sqlQuery = queries.getInfoExamRoom;
    return await pool.request().query(sqlQuery, function (error, data) {
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

  async updateExamRoomAddExaminer(examRoom, result) {
    var pool = await conn;
    var sqlQuery = queries.updateExamRoomAddExaminer;
    return await pool
      .request()
      .input("examSlotID", sql.VarChar, examRoom.examSlotID)
      .input("examinerID", sql.VarChar, examRoom.examinerID)
      .input("examRoomID", sql.VarChar, examRoom.examRoomID)
      .query(sqlQuery, function (error, data) {
        if (data?.recordset) {
          result(null, data.recordset);
        } else {
          result(error.message, null);
        }
      });
  }
  
  async updateAttendanceStatus(id, examRoom, result) {
    var pool = await conn;
    var sqlQuery = queries.updateAttendanceStatus;
    return await pool
      .request()
      .input("examRoomID", sql.VarChar, id)
      .input("attendanceStatus", sql.VarChar, examRoom.attendanceStatus)
      .query(sqlQuery, function (error, data) {
        if (data?.recordset) {
          result(null, data.recordset);
        } else {
          result(error.message, null);
        }
      });
  }

  async getExamRoomFullInfo(id) {
    let pool = await conn;
    let sqlQuery = queries.getExamRoomFullInfo;
    const result = await pool
      .request()
      .input("examRoomID", sql.VarChar, id)
      .query(sqlQuery);
    if (result.recordset && result.recordset.length > 0) {
      return result;
    } else {
      return null;
    }
  }

  async getExamRoomInfoAndStudent(id, result) {
    let pool = await conn;
    let sqlQuery = queries.getExamRoomFullInfo;
    return await pool
      .request()
      .input("examRoomID", sql.VarChar, id)
      .query(sqlQuery, function (error, data) {
        if (data?.recordset && data.recordsets.length > 0) {
          result(null, data.recordsets);
        } else {
          result(true, null);
        }
      });
  }

  async exportExcelExamRoomFullInfo(id) {
    let ExamRoomInfo = await this.getExamRoomFullInfo(id);

    if (ExamRoomInfo != null) {
      const workbook = new excel.Workbook();

      // Worksheet for ExamRoomInfo.recordset
      const worksheet1 = workbook.addWorksheet("Exam Room Info");
      const examRoomInfoColumns = [
        { key: "examRoomID", header: "Exam Room" },
        { key: "classRoomCode", header: "Class Room" },
        { key: "subjectName", header: "Subject Name" },
        { key: "code", header: "Code" },
        { key: "examinerName", header: "Examiner Name" },
        { key: "totalStudent", header: "Total Student" },
        { key: "startTime", header: "Start Time" },
        { key: "endTime", header: "End Time" },
      ];

      // Add data from ExamRoomInfo.recordset to worksheet1
      worksheet1.columns = [...examRoomInfoColumns];
      ExamRoomInfo.recordset.forEach((examRoomInfo) => {
        const row = {};
        examRoomInfoColumns.forEach((column) => {
          row[column.key] = examRoomInfo[column.key];
        });
        worksheet1.addRow(row);
      });

      // Worksheet for ExamRoomInfo.recordsets[1]
      const worksheet2 = workbook.addWorksheet("Additional Info");
      const additionalInfoColumns = [
        { key: "examRoomID", header: "Exam Room" },
        { key: "studentID", header: "Student ID" },
        { key: "studentName", header: "Student Name" },
        { key: "email", header: "Email" },
        { key: "dateOfBirth", header: "Date of Birth" },
        { key: "major", header: "Major" },
        { key: "yearOfStudy", header: "Year of Study" },
        { key: "status", header: "Status" },
      ];

      // Add data from ExamRoomInfo.recordsets[1] to worksheet2
      worksheet2.columns = [...additionalInfoColumns];
      ExamRoomInfo.recordsets[1].forEach((additionalInfo) => {
        const row = {};
        additionalInfoColumns.forEach((column) => {
          row[column.key] = additionalInfo[column.key];
        });
        worksheet2.addRow(row);
      });

      // Style columns for worksheet1
      worksheet1.columns.forEach((sheetColumn) => {
        sheetColumn.font = {
          size: 12,
        };
        sheetColumn.width = 20;
      });

      worksheet1.getRow(1).font = {
        bold: true,
        size: 13,
      };

      // Style columns for worksheet2
      worksheet2.columns.forEach((sheetColumn) => {
        sheetColumn.font = {
          size: 12,
        };
        sheetColumn.width = 20;
      });

      worksheet2.getRow(1).font = {
        bold: true,
        size: 13,
      };

      return workbook;
    } else {
      return null;
    }
  }
};
