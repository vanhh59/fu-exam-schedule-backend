var { conn, sql } = require('../../connect');
const queries = require("../sql/Queries");
const exceljs = require('exceljs');

module.exports = class Dashboard {
    async getAllExamSchedule(result) {
        var pool = await conn;
        var sqlQuery = queries.getExamSchedule;
        return await pool.request()
            .query(sqlQuery, function (error, data) {
                if (data.recordset && data.recordset.length > 0) {
                    result(null, data.recordset);
                } else {
                    result(true, null);
                }
            });
    }
    // courseID, code, date,
    async createExamSchedule(data, result) {
        var pool = await conn;
        var sqlQuery = queries.createExamSlotAndExamBatch;
        return await pool.request()
            .input('courseID', sql.VarChar, data.courseID)
            .input('code', sql.VarChar, data.code)
            .input('startTime', sql.DateTime, data.startTime)
            .input('endTime', sql.DateTime, data.endTime)
            .query(sqlQuery, function (error, data) {
                if (error) {
                    result(error, null);
                } else {
                    result(null, data);
                }
            });
    }

    async register(data, result) {
        var pool = await conn;
        var sqlQuery = queries.register;
        return await pool.request()
            .input('examinerID', sql.VarChar, data.examinerID)
            .input('examSlotID', sql.VarChar, data.examSlotID)
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
        return await pool.request()
            .input('classRoomID', sql.VarChar, data.classRoomID)
            .input('examSlotID', sql.VarChar, data.examSlotID)
            .input('subjectID', sql.VarChar, data.subjectID)
            .input('examinerID', sql.VarChar, data.examinerID)
            .query(sqlQuery, function (error, data) {
                if (error) {
                    result(error, null);
                } else {
                    result(null, data);
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
            result(null, data = "Data inserted successfully.");
        } catch (error) {
            console.error("Error:", error);
            result(error, null);
        }
    }

    async updateQuantityExamSlot(data, result) {
        var pool = await conn;
        var sqlQuery = queries.updateQuantityExamSlot;
        return await pool.request()
            .input('examRoomID', sql.VarChar, data.examRoomID)
            .input('examSlotID', sql.VarChar, data.examSlotID)
            .query(sqlQuery, function (error, data) {
                if (error) {
                    result(error, null);
                } else {
                    result(null, data);
                }
        });
    }
}