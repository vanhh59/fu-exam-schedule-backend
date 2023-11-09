var { conn, sql } = require('../../connect');
const queries = require('../sql/Queries');

module.exports = class classroom {
    async getListAll(result) {
        var pool = await conn;
        var sqlQuery = "SELECT * FROM Classroom";
        return await pool.request()
            .query(sqlQuery, function (error, data) {
                if (data.recordset && data.recordset.length > 0) {
                    result(null, data.recordset);
                } else {
                    result(true, null);
                }
            });
    }

    async getListByID(id, result) {
        var pool = await conn;
        var sqlQuery = "SELECT * FROM Classroom WHERE ID = @ID";
        return await pool.request()
            .input('ID', sql.VarChar, id)
            .query(sqlQuery, function (error, data) {
                if (data.recordset && data.recordset.length > 0) {
                    result(null, data.recordset);
                } else {
                    result(true, null);
                }
            });
    }

    async getByCode(code, result) {
        var pool = await conn;
        var sqlQuery = "SELECT * FROM Classroom WHERE code = @code";
        return await pool.request()
            .input('code', sql.NVarChar, code)
            .query(sqlQuery, function (error, data) {
                if (data.recordset && data.recordset.length > 0) {
                    result(null, data.recordset);
                } else {
                    result(true, null);
                }
            });
    }

    async create(classroom, result) {
        var pool = await conn;
        var sqlQuery = `BEGIN TRANSACTION;
        DECLARE @numericPart INT;
        DECLARE @classRoomID NVARCHAR(50);
        SELECT TOP 1 @numericPart = MAX(CAST(SUBSTRING(ID, 2, LEN(ID)) AS INT)) FROM Classroom;
        SET @numericPart = ISNULL(@numericPart, 0) + 1;
        SET @classRoomID = 'P' + CAST(@numericPart AS NVARCHAR(50));
        INSERT INTO Classroom VALUES (@classRoomID, @classRoomID, @building, @floor, @type ,@capacity, 1)
        COMMIT;`
        return await pool.request()
            .input('building', sql.VarChar, classroom.building)
            .input('floor', sql.Int, classroom.floor)
            .input('type', sql.NVarChar, classroom.type)
            .input('capacity', sql.Int, classroom.capacity)
            .query(sqlQuery, function (error, data) {
                if (error) {
                    result(error.message, null);
                } else {
                    result(null, data);
                }
            });
    }

    async update(id, classroom, result) {
        var pool = await conn;
        var sqlQuery = "UPDATE Classroom SET code = @code, building = @building,\
            floor = @floor, type = @type, capacity = @capacity,\
            status = @status WHERE ID = @ID";
        return await pool.request()
        .input('ID', sql.Char, classroom.ID)
        .input('code', sql.NVarChar, classroom.code)
        .input('building', sql.VarChar, classroom.building)
        .input('floor', sql.Int, classroom.floor)
        .input('type', sql.NVarChar, classroom.type)
        .input('capacity', sql.Int, classroom.capacity)
        .input('status', sql.Bit, classroom.status)
            .query(sqlQuery, function (error, data) {
                if (error) {
                    result(error.message, null);
                } else {
                    result(null, data);
                }
            });
    }

    async deleteByUpdate(id, result) {
        var pool = await conn;
        var sqlQuery = queries.deleteClassRoom;
        return await pool.request()
            .input('ID', sql.VarChar, id)
            .query(sqlQuery, function (error, data) {
                if (data.recordset && data.recordset.length > 0) {
                    result(null, data.recordset);
                } else {
                    result(error.message, null);
                }
            });
    }

}
