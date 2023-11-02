var { conn, sql } = require("../../connect");
const queries = require("../sql/Queries");
const exceljs = require("exceljs");
const CronJob = require("cron").CronJob;
const nodemailer = require("nodemailer");

module.exports = class Dashboard {
  async getAllExamSchedule(result) {
    var pool = await conn;
    var sqlQuery = queries.getExamSchedule;
    return await pool.request().query(sqlQuery, function (error, data) {
      if (data.recordset && data.recordset.length > 0) {
        result(null, data.recordset);
      } else {
        result(true, null);
      }
    });
  }

  async createExamSchedule(data, result) {
    const pool = await conn;
    const sqlQuery = queries.createExamSlotAndExamBatch;
    // const sqlQuery1 = queries.isConflictDuringStartEndTime;
    // const sqlQuery2 = queries.isConflictRule15Minutes;
    // const isConflictDuringStartEndTime = await pool
    // .request()
    // .input("startTime", sql.DateTime, data.startTime)
    // .input("endTime", sql.DateTime, data.endTime)
    // .query(sqlQuery1, function (error, data) {
    //   if (error) {
    //     return result(error, null);
    //   } else {
    //     return result(null, data);
    //   }
    // });

    // const isConflictRule15Minutes = await pool
    // .request()
    // .input("startTime", sql.DateTime, data.startTime)
    // .input("endTime", sql.DateTime, data.endTime)
    // .query(sqlQuery2, function (error, data) {
    //   if (error) {
    //     return result(error, null);
    //   } else {
    //     return result(null, data);
    //   }
    // });

    // console.log(isConflictDuringStartEndTime);
    // console.log(isConflictRule15Minutes);

    const now = new Date(); // Get the current date and time
    const startTime = new Date(data.startTime); // Convert data.startTime to a Date object

    // Calculate the difference in milliseconds between now and data.startTime
    const timeDifference = startTime - now;
    const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

    if (timeDifference < sevenDaysInMilliseconds) {
      // If the time difference is less than 7 days, return a 400 response
      return result("Start time is less than 7 days from now", null);
    }

    // If the condition is not met, proceed with your database query
    return await pool
      .request()
      .input("courseID", sql.VarChar, data.courseID)
      .input("code", sql.VarChar, data.code)
      .input("startTime", sql.DateTime, data.startTime)
      .input("endTime", sql.DateTime, data.endTime)
      .query(sqlQuery, function (error, data) {
        if (error) {
          result(error, null);
        } else {
          result(null, data.recordset);
        }
      });
  }

  async register(data, result) {
    var pool = await conn;
    var sqlQuery = queries.register;
    return await pool
      .request()
      .input("examinerID", sql.VarChar, data.examinerID)
      .input("examSlotID", sql.VarChar, data.examSlotID)
      .query(sqlQuery, function (error, data) {
        if (error) {
          result(error, null);
        } else {
          result(null, data);
        }
      });
  }

  async fieldInfoExamSchedule(data, result) {
    var pool = await conn;
    var sqlQuery = queries.fieldInfoExamSchedule;
    console.log(data.examinerID);
    console.log(data.examSlotID);
    console.log(data.subjectID);
    console.log(data.examinerID);
    return await pool
      .request()
      .input("classRoomID", sql.VarChar, data.classRoomID)
      .input("examSlotID", sql.VarChar, data.examSlotID)
      .input("subjectID", sql.VarChar, data.subjectID)
      .input("examinerID", sql.VarChar, data.examinerID)
      .query(sqlQuery, function (error, data) {
        if (error) {
          result(error, null);
        } else {
          result(null, data);
        }
      });
  }

  async getListExaminerRegister(id, result) {
    var pool = await conn;
    var sqlQuery = queries.getListExaminerRegister;
    return await pool
    .request()
    .input("examSlotID", sql.VarChar, id)
    .query(sqlQuery, function (error, data) {
      if (data.recordset && data.recordset.length > 0) {
        result(null, data.recordset);
      } else {
        result(true, null);
      }
    });
  }

  async importExcelFile(data, result) {
    try {
      var pool = await conn;
      const excelFile = data.files.excelFile;

      const workbook = new exceljs.Workbook();
      await workbook.xlsx.load(excelFile.data);

      const worksheet = workbook.getWorksheet(1);

      for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber++) {
        const row = worksheet.getRow(rowNumber);
        const array = [];

        for (let i = 1; i <= 3; i++) {
          array.push(row.getCell(i).value);
        }

        console.log(array);
        var sqlQuery = queries.importExcelFile;

        const handleData = async () => {
          try {
            const studentID = array[0];
            const examRoomID = array[1];
            const request = pool.request();
            request.input("studentID", sql.VarChar, studentID);
            request.input("examRoomID", sql.VarChar, examRoomID);
            await request.query(sqlQuery);
            console.log("Inserted row:", array);
          } catch (error) {
            console.error("Error:", error);
            result(error, null);
          }
        };
        await handleData();
      }
      var sqlQuery = queries.importExcelFile;
      result(null, (data = "Data inserted successfully."));
    } catch (error) {
      console.error("Error:", error);
      result(error, null);
    }
  }

  async updateQuantityExamSlot(data, result) {
    var pool = await conn;
    var sqlQuery = queries.updateQuantityExamSlot;
    return await pool
      .request()
      .input("examRoomID", sql.VarChar, data.examRoomID)
      .input("examSlotID", sql.VarChar, data.examSlotID)
      .query(sqlQuery, function (error, data) {
        if (error) {
          result(error, null);
        } else {
          result(null, data);
        }
      });
  }

  async sendMail(id, result) {
    const students = await this.findStudentInRoom(id);
    if (students != null) {
      //Get the date before exam start
      let currentDay = new Date();
      let targetDate = new Date(students[0].startTime.getTime());
      //Check whether the targetDate is after or before currentDate.
      targetDate.setDate(students[0].startTime.getDate() - 1);
      if (currentDay > targetDate) {
        return 1;
      }
      //email message option
      const mailOption = {
        from: "baoit2002@gmail.com",
        to: "",
        subject: "Email from Node_App",
        text: `There will be an exam at ${students[0].startTime}. Please go to fu-exam-schedule for more details.`,
      };
      //email transport configuration
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "baoit2002@gmail.com",
          pass: "ztij tdmu lmup ecgl",
        },
      });
      //Schedule a date
      let job = new CronJob(
        targetDate,
        function () {
          for (let value of students) {
            mailOption.to = value.email;
            transporter.sendMail(mailOption, (error, info) => {
              if (error) {
                return 3;
              } else {
                console.log("email send: " + info.response);
              }
            });
          }
        },
        null /* This function is executed when the job stops */,
        true /* start the job right now */,
        "Asia/Ho_Chi_Minh" /* Set time zone */
      );
    } else {
      return 2;
    }
  }

  async findStudentInRoom(id) {
    let pool = await conn;
    let sqlQueryStudentInRoom = queries.getStudentInRoom;
    const result = await pool
      .request()
      .input("examSlotID", sql.VarChar, id)
      .query(sqlQueryStudentInRoom);
    if (result.recordset && result.recordset.length > 0) {
      return result;
    } else {
      return null;
    }
  }

  async addStudentIntoExamRoom(item, result) {
    var pool = await conn;
    var sqlQuery = queries.addStudentIntoExamRoom;
    return await pool
      .request()
      .input("examRoomID", sql.VarChar, item.examRoomID)
      .input("studentID", sql.VarChar, item.studentID)
      .query(sqlQuery, function (error, data) {
        if (error) {
          result(error.message, null);
        } else {
          result(null, data);
        }
      });
  }

  async checkUpdteRegisterIsLessThan3Day(item, result) {
    var pool = await conn;
    var sqlQuery = queries.checkUpdteRegisterIsLessThan3Day;
    return await pool
      .request()
      .input("examinerID", sql.VarChar, item.examinerID)
      .input("examSlotID", sql.VarChar, item.examSlotID)
      .query(sqlQuery, function (error, data) {
        if (error) {
          result(error, null);
        } else {
          result(null, data.recordset);
        }
      });
  }

  async updateRegister(item, result) {
    var pool = await conn;
    var sqlQuery = queries.updateRegister;
    return await pool
      .request()
      .input("examinerID", sql.VarChar, item.examinerID)
      .input("examSlotID", sql.VarChar, item.examSlotID)
      .query(sqlQuery, function (error, data) {
        if (error) {
          result(error, null);
        } else {
          result(null, data.recordset);
        }
      });
  }
};
