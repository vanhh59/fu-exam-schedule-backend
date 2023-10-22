const { conn, sql } = require('../../connect');
const excel = require("exceljs");
const queries = require('../sql/Queries');
module.exports = class Download {
    async downloadXlsx() {
        let ExaminersSalary = this.findExaminersSalary();
        let DepartmentsSalary = this.findDepartmentsSalary();
        if (ExaminersSalary != null && DepartmentsSalary != null) {
            const workbook = new excel.Workbook();
            //Tạo ra excel worksheet
            const worksheetExaminer = workbook.addWorksheet('Examiner List');
            const worksheetDepartment = workbook.addWorksheet('Department List');
            //Thêm các header cho 2 worksheet
            worksheetExaminer.columns = [
                { key: 'ID', header: 'Id' },
                { key: 'name', header: 'name' },
                { key: 'code', header: 'code' },
                { key: 'salary', header: 'Salary per semester' },
            ];
            worksheetDepartment.columns = [
                { key: 'Department', header: 'Department' },
                { key: 'TotalSalary', header: 'TotalSalary' },
            ];
            ExaminersSalary.forEach((examiner) => {
                worksheetExaminer.addRow(examiner);
            });
            DepartmentsSalary.forEach((department) => {
                worksheetDepartment.addRow(department);
            });
            //Css cho Worksheet Examiner
            worksheetExaminer.columns.forEach((sheetColumn) => {
                sheetColumn.font = {
                    size: 12,
                };
                sheetColumn.width = 30;
            });

            worksheetExaminer.getRow(1).font = {
                bold: true,
                size: 13,
            };
            //Css cho Worksheet Department
            worksheetDepartment.columns.forEach((sheetColumn) => {
                sheetColumn.font = {
                    size: 12,
                };
                sheetColumn.width = 30;
            });
            worksheetDepartment.getRow(1).font = {
                bold: true,
                size: 13,
            };
            return workbook;
        } else {
            return null;
        }

    }

    async downloadExamRoomXlsx(id) {
        let ExamRooms = this.findExaminersSalary(id);
        if (ExamRooms != null) {
            const workbook = new excel.Workbook();
            //Tạo ra excel worksheet
            const worksheetExamRoom = workbook.addWorksheet('Exam Rooms List');
            worksheetExamRoom.columns = [
                { key: 'CourseID', header: 'Id' },
                { key: 'SubjectName', header: 'Name' },
                { key: 'examBatch_code', header: 'Code' },
                { key: 'startTime', header: 'Start time' },
                { key: 'endTime', header: 'End time' },
                { key: 'ExaminerName', header: 'Examiner name' },
                { key: 'SemesterID', header: 'Semester ID' },
                { key: 'classRoomID', header: 'Class Room ID' }
            ];

            worksheetExamRoom.columns.forEach((sheetColumn) => {
                sheetColumn.font = {
                    size: 12,
                };
                sheetColumn.width = 30;
            });

            worksheetExamRoom.getRow(1).font = {
                bold: true,
                size: 13,
            };
            return workbook;
        } else {
            return null;
        }
    }

    async findExaminersSalary() {
        let pool = await conn;
        let sqlQueryExaminersSalary = queries.getAllIncome;
        const result = await pool.request().query(sqlQueryExaminersSalary);
        if (result.recordset && result.recordset.length > 0) {
            return result;
        } else {
            return null;
        }

    }

    async findDepartmentsSalary() {
        let pool = await conn;
        let sqlQueryDepartmentsSalary = queries.getDepartmentSalary;
        const result = await pool.request().query(sqlQueryDepartmentsSalary);
        if (result.recordset && result.recordset.length > 0) {
            return result;
        } else {
            return null;
        }

    }

    async findExamRoomsSalary(id) {
        let pool = await conn;
        let sqlQueryExamRooms = queries.getExamRoomInSemester;
        const result = await pool.request().input('SemesterCode', sql.VarChar, id).query(sqlQueryExamRooms);
        if (result.recordset && result.recordset.length > 0) {
            return result;
        } else {
            return null;
        }

    }
}