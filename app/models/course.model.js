var { conn, sql } = require('../../connect');
const queries = require("../sql/Queries");

module.exports = class course {
    async getAll(result) {
        var pool = await conn;
        var sqlQuery = "SELECT * FROM Course";
        return await pool.request()
            .query(sqlQuery, function (error, data) {
                if (data.recordset && data.recordset.length > 0) {
                    result(null, data.recordset);
                } else {
                    result(error.message, null);
                }
            });
    }

    async getCourseBySubjectID(id, result) {
        var pool = await conn;
        var sqlQuery = "SELECT * FROM Course WHERE subjectID = @subjectID";
        return await pool.request()
            .input('subjectID', sql.VarChar, id)
            .query(sqlQuery, function (error, data) {
                if (data.recordset && data.recordset.length > 0) {
                    result(null, data.recordset);
                } else {
                    result(error.message, null);
                }
            });
    }

    async getCourseByID(courseId, result) {
        var pool = await conn;
        var sqlQuery = queries.getCourseByID;
        return await pool.request()
            .input('courseID', sql.VarChar, courseId)
            .query(sqlQuery, function (error, data) {
                if (data.recordset && data.recordset.length > 0) {
                    result(null, data.recordset);
                } else {
                    result(error.message, null);
                }
            });
    }

    async getByName(data, result) {
        var pool = await conn;
        var sqlQuery = "SELECT * FROM Course WHERE name = @name";
        return await pool.request()
            .input('name', sql.NVarChar, data.name)
            .query(sqlQuery, function (error, data) {
                if (data.recordset && data.recordset.length > 0) {
                    result(null, data.recordset);
                } else {
                    result(error.message, null);
                }
            });
    }

    async createCourse(course, result) {
        var pool = await conn;
        var sqlQuery = "INSERT INTO Course VALUES (@ID, @subjectID, @semesterID, \
            @name, @instructor, @status)"
        return await pool.request()
            .input('ID', sql.Char, course.ID)
            .input('subjectID', sql.Char, course.subjectID)
            .input('semesterID', sql.Char, course.semesterID)
            .input('name', sql.NVarChar, course.name)       
            .input('instructor', sql.Char, course.instructor)
            .input('status', sql.Bit, course.status)
            .query(sqlQuery, function (error, data) {
                if (error) {
                    result(true, null);
                } else {
                    result(null, data);
                }
            });
    }

    async updateCourse(id, course, result) {
        var pool = await conn;
        var sqlQuery = "UPDATE [dbo].[Course] SET subjectID = @subjectID,\
        semesterID = @semesterID, name = @name, instructor = @instructor,\
        status = @status WHERE ID = @ID";
        return await pool.request()
        .input('ID', sql.VarChar, id)
        .input('subjectID', sql.VarChar, course.subjectID)
        .input('semesterID', sql.VarChar, course.semesterID)
        .input('name', sql.NVarChar, course.name)       
        .input('instructor', sql.NVarChar, course.instructor)
        .input('status', sql.Bit, course.status)
            .query(sqlQuery, function (error, data) {
                if (error) {
                    result(error.message, null);
                } else {
                    result(null, data);
                }
            });
    }

    async deleteCourse(id, result) {
        var pool = await conn;
        var sqlQuery = "UPDATE Course SET status = @status WHERE ID = @ID";
        return await pool.request()
            .input('ID', sql.VarChar, id)
            .input('status', sql.Bit, 0)
            .query(sqlQuery, function (error, data) {
                if (error) {
                    result(true, null);
                } else {
                    result(null, data);
                }
            });
    }
}
