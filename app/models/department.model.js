var { conn, sql } = require('../../connect');
module.exports = class Department {
    async getAll(result) {
        var pool = await conn;
        var sqlQuery = "SELECT * FROM Department";
        return await pool.request()
            .query(sqlQuery, function (error, data) {
                if (data.recordset && data.recordset.length > 0) {
                    result(null, data.recordset);
                } else {
                    result(true, null);
                }
            });
    }

    async getDepartmentByExaminerID(id, result) {
        var pool = await conn;
        var sqlQuery = "SELECT * FROM Department WHERE examinerID = @examinerID";
        return await pool.request()
            .input('examinerID', sql.VarChar, id)
            .query(sqlQuery, function (error, data) {
                if (data.recordset && data.recordset.length > 0) {
                    result(null, data.recordset);
                } else {
                    result(true, null);
                }
            });
    }

    async getByLocation(location, result) {
        var pool = await conn;
        var sqlQuery = "SELECT * FROM Department WHERE location = @location";
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
        var sqlQuery = "SELECT * FROM Department WHERE phone = @phone";
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
        var sqlQuery = "SELECT * FROM Department WHERE name = @name";
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
        var pool = await conn;
        var sqlQuery = "INSERT INTO Department VALUES (@examinerID, @name, @examinerType, \
            @faculty, @location, @phone, @status)"
        return await pool.request()
            .input('examinerID', sql.Char, Department.examinerID)
            .input('name', sql.NVarChar, Department.name)
            .input('examinerType', sql.VarChar, Department.examinerType)
            .input('faculty', sql.Int, Department.faculty)
            .input('location', sql.NVarChar, Department.location)
            .input('phone', sql.NVarChar, Department.phone)
            .input('status', sql.Int, Department.status)
            .query(sqlQuery, function (error, data) {
                if (error) {
                    result(true, null);
                } else {
                    result(null, data);
                }
            });
    }

    async update(id, Department, result) {
        var pool = await conn;
        var sqlQuery = "UPDATE Department SET name = @name, examinerType = @examinerType,\
        faculty = @faculty, location = @location, phone = @phone\
            status = @status WHERE name = @name";
        return await pool.request()
            .input('examinerID', sql.Char, Department.examinerID)
            .input('name', sql.NVarChar, Department.name)
            .input('examinerType', sql.VarChar, Department.examinerType)
            .input('faculty', sql.Int, Department.faculty)
            .input('location', sql.NVarChar, Department.location)
            .input('phone', sql.NVarChar, Department.phone)
            .input('status', sql.Int, Examiner.status)
            .query(sqlQuery, function (error, data) {
                if (error) {
                    result(true, null);
                } else {
                    result(null, data);
                }
            });
    }

    async deleteDepartment(name, status, result) {
        var pool = await conn;
        var sqlQuery = "UPDATE Department SET status = @status WHERE name = @name";
        return await pool.request()
            .input('name', sql.VarChar, name)
            .input('status', sql.Bit, false)
            .query(sqlQuery, function (error, data) {
                if (error) {
                    result(true, null);
                } else {
                    result(null, data);
                }
            });
    }
}

