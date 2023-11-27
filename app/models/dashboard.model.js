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
          result(error.message, null);
        } else {
          result(null, data?.recordset);
        }
      });
  }

  async fieldInfoExamSchedule(data, result) {
    var pool = await conn;
    var sqlQuery = queries.fieldInfoExamSchedule;
    return await pool
      .request()
      .input("classRoomID", sql.VarChar, data.classRoomID)
      .input("examSlotID", sql.VarChar, data.dataExamSlotID)
      .input("subjectID", sql.VarChar, data.subjectID)
      .query(sqlQuery, function (error, data) {
        if (error) {
          result(error?.message, null);
        } else {
          result(null, data?.recordsets[0]);
        }
      });
  }

  async createMultipleExamRoom(dataArray, result) {
    try {
      var pool = await conn;
      const roomCreate = [];
      for (let i = 0; i < dataArray.length; i++) {
        console.log(dataArray[i]);
        var sqlQuery = queries.fieldInfoExamSchedule;

        try {
          const request = pool.request();
          request.input("classRoomID", sql.VarChar, dataArray[i].classRoomID)
          request.input("examSlotID", sql.VarChar, dataArray[i].dataExamSlotID)
          request.input("subjectID", sql.VarChar, dataArray[i].subjectID)
          const data = await request.query(sqlQuery);

          if (!data?.recordsets[0][0].Result) {
            result({
              message: `Error during process create new room`,
              roomCreate: roomCreate
            }, null);
            return;
          }
          roomCreate.push({
            classRoomID: dataArray[i].classRoomID,
            examSlotID: dataArray[i].dataExamSlotID,
            subjectID: dataArray[i].subjectID
          })
        } catch (error) {
          console.error("Error:", error);
          result(error, null);
          return;
        }
      }
      result(null, roomCreate);
    } catch (error) {
      console.error("Error:", error);
      result(error, null);
    }
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
      const examRoomID = data.body.examRoomID;
      const workbook = new exceljs.Workbook();
      await workbook.xlsx.load(excelFile.data);

      const worksheet = workbook.getWorksheet(1);

      // Check if the number of student is more than 25 then return;
      if (worksheet.rowCount > 26) {
        console.log("Import excel file fail: Too many student (more than 25). Returning false.");
        result(true, (data = "Too many student (more than 25)"));
        return;
      }

      for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber++) {
        const row = worksheet.getRow(rowNumber);
        const array = [];

        for (let i = 1; i <= 1; i++) {
          array.push(row.getCell(i).value);
        }

        var sqlQuery = queries.importExcelFile;

        const handleData = async () => {
          try {
            const studentID = array[0];
            const request = pool.request();
            request.input("studentID", sql.VarChar, studentID);
            request.input("examRoomID", sql.VarChar, examRoomID);
            await request.query(sqlQuery);
            console.log("Inserted row:", array);
          } catch (error) {
            result(error?.message, null);
          }
        };
        await handleData();
      }
      var sqlQuery = queries.importExcelFile;
      result(null, (data = "Data inserted successfully."));
    } catch (error) {
      result(error?.message, null);
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
          console.log(`Update quantity in ExamSlot ${data.examRoomID} fail`)
          result(error, null);
        } else {
          console.log(`Update quantity in ExamSlot ${data.examRoomID} successfully`)
          result(null, data);
        }
      });
  }

  async sendMail(data, result) {
    const students = await this.findStudentInRoom(data?.examSlotID);
    if (students != null) {
      //Get the date before exam start
      let currentDay = new Date();
      let targetDate = new Date(students.recordset[0].startTime.getTime());
      //Check whether the targetDate is after or before currentDate.
      targetDate.setDate(students.recordset[0].startTime.getDate() - 1);
      if (currentDay > targetDate) {
        return 1;
      }

      // Chuyển đổi type DateTime thành kiểu Wed, 13/12/2023 at 00:30:00 
      const inputDateString = students.recordset[0].startTime;

      // Parse the input date string
      const inputDate = new Date(inputDateString);

      // Format the date as required
      const dayOfWeek = inputDate.toLocaleDateString('en-US', { weekday: 'short' });
      const day = inputDate.getDate();
      const month = inputDate.toLocaleDateString('en-US', { month: 'short' });
      const year = inputDate.getFullYear();
      const time = inputDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      // Create the desired output string
      const outputString = `${dayOfWeek}, ${day}/${month}/${year} at ${time}`;

      //email message option
      const mailOption = {
        //from: "nguyenhuykhaipch94@gmail.com",
        from: "vietanhcode@gmail.com",
        to: "",
        subject: "[REMIND] EMAIL FROM FU_EXAM_SCHEDULE APPLICATION",
        text: `There will be an exam at ${outputString}. Please go to fu-exam-schedule for more details.`,
      };
      //email transport configuration
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          //user: "nguyenhuykhaipch94@gmail.com",
          user: "vietanhcode@gmail.com",
          pass: "zyzj ntuj ilws fwri",
          //pass: "deao tttb zdia nfev",
        },
      });
      //Schedule a date
      let job = new CronJob(
        // '*/5 * * * *', // Gửi 5 phút 1 lần
        // '* * * * *', // Gửi mỗi phút 1 lần
        targetDate, // Gửi trước ngày thi 1 ngày
        function () {
          for (let value of students.recordset) {
            mailOption.to = value.email;
            transporter.sendMail(mailOption, (error, info) => {
              if (error) {
                return 3;
              } else {
                console.log("SEND MAIL: " + info.response);
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
      console.log(result);
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
