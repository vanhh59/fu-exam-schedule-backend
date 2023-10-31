var { conn, sql } = require('../../connect');
const queries = require('../sql/Queries');
module.exports = class Department {
    async getAll(result) {
        let pool = await conn;
        let sqlQuery = `SELECT TOP (1000) [examinerID]
        ,[name]
        ,[examinerType]
        ,[faculty]
        ,[location]
        ,[phone]
        ,[status]
        ,[departmentID]
    FROM [DB_EXAM].[dbo].[Department]`;
        return await pool.request().query(sqlQuery, function (error, data) {
            if (data.recordset && data.recordset.length > 0) {
                result(null, data.recordset);
            } else {
                result(true, null);
            }
        });
    }

    async getDepartmentByID(id, result) {
        let pool = await conn;
        let sqlQuery = "SELECT * FROM [DB_EXAM].[dbo].[Department] WHERE departmentID = @DepartmentID";
        return await pool.request()
            .input('DepartmentID', sql.Int, id)
            .query(sqlQuery, function (error, data) {
                if (data.recordset && data.recordset.length > 0) {
                    result(null, data.recordset);
                } else {
                    result(true, null);
                }
            });
    }

    async getByLocation(location, result) {
        let pool = await conn;
        let sqlQuery = "SELECT * FROM [DB_EXAM].[dbo].[Department] WHERE location = @location";
        return await pool.request()
            .input('location', sql.VarChar, location)
            .query(sqlQuery, function (error, data) {
                if (data.recordset && data.recordset.length > 0) {
                    result(null, data.recordset);
                } else {
                    result(true, null);
                }
            });
    }

    async getByPhone(phone, result) {
        var pool = await conn;
        var sqlQuery = "SELECT * FROM [DB_EXAM].[dbo].[Department] WHERE phone = @phone";
        return await pool.request()
            .input('phone', sql.VarChar, phone)
            .query(sqlQuery, function (error, data) {
                if (data.recordset && data.recordset.length > 0) {
                    result(null, data.recordset);
                } else {
                    result(true, null);
                }
            });
    }

    async getByName(name, result) {
        var pool = await conn;
        var sqlQuery = "SELECT * FROM [DB_EXAM].[dbo].[Department] WHERE name = @name";
        return await pool.request()
            .input('name', sql.VarChar, name)
            .query(sqlQuery, function (error, data) {
                if (data.recordset && data.recordset.length > 0) {
                    result(null, data.recordset);
                } else {
                    result(true, null);
                }
            });
    }

    async create(Department, result) {
        let pool = await conn;
        let sqlQuery = "INSERT INTO [DB_EXAM].[dbo].[Department] VALUES (@examinerID, @name, @examinerType, \
            @faculty, @location, @phone, @status)"
        return await pool.request()
            .input('examinerID', sql.NVarChar, Department.examinerID)
            .input('name', sql.NVarChar, Department.name)
            .input('examinerType', sql.VarChar, Department.examinerType)
            .input('faculty', sql.NVarChar, Department.faculty)
            .input('location', sql.NVarChar, Department.location)
            .input('phone', sql.NVarChar, Department.phone)
            .input('status', sql.Int, Department.status)
            .query(sqlQuery, function (error, data) {
                if (error) {
                    console.log(error);
                    result(true, null);
                } else {
                    result(null, data);
                }
            });
    }

    async update(Department, result) {
        let pool = await conn;
        let sqlQuery = `
        UPDATE [DB_EXAM].[dbo].[Department] SET name = @name, examinerType = @examinerType,
        faculty = @faculty, location = @location, phone = @phone,
            status = @status WHERE departmentID = @id
        `;
        return await pool.request()
            .input('examinerID', sql.NVarChar, Department.examinerID)
            .input('name', sql.NVarChar, Department.name)
            .input('examinerType', sql.VarChar, Department.examinerType)
            .input('faculty', sql.VarChar, Department.faculty)
            .input('location', sql.NVarChar, Department.location)
            .input('phone', sql.NVarChar, Department.phone)
            .input('status', sql.Int, Department.status)
            .input('id', sql.Int, Department.id)
            .query(sqlQuery, function (error, data) {
                if (error) {
                    console.log(error);
                    result(true, null);
                } else {
                    result(null, data);
                }
            });
    }

    async deleteDepartment(id, result) {
        let pool = await conn;
        let sqlQuery = "UPDATE [DB_EXAM].[dbo].[Department] SET status = @status WHERE departmentID = @id";
        return await pool.request()
            .input('id', sql.Int, id)
            .input('status', sql.Bit, false)
            .query(sqlQuery, function (error, data) {
                if (error) {
                    result(true, null);
                } else {
                    result(null, data);
                }
            });
    }

    async getAllAvailableSlot(result) {
        let pool = await conn;
        console.log("Im here");
        let sqlQuery = queries.getDepartmentSalary;
        return await pool.request()
            .query(sqlQuery, function (error, data) {
                if (error) {
                    console.log(error, data);
                    result(true, null);
                } else {
                    console.log(data);
                    result(null, data.recordset);
                }
            });
    }
}
