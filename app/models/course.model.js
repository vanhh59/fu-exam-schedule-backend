var { conn, sql } = require('../../connect');
module.exports = class course {
    async getAll(result) {
        var pool = await conn;
        var sqlQuery = "SELECT * FROM Course";
        return await pool.request()
            .query(sqlQuery, function (error, data) {
                if (data.recordset && data.recordset.length > 0) {
                    result(null, data.recordset);
                } else {
                    result(true, null);
                }
            });
    }

    async getCourseBySubjectID(id, result) {
        var pool = await conn;
        var sqlQuery = "SELECT * FROM Course WHERE subjectID = @subjectID";
        return await pool.request()
            .input('subjectID', sql.Char, id)
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
        var sqlQuery = "SELECT * FROM Course WHERE name = @name";
        return await pool.request()
            .input('name', sql.NVarChar, name)
            .query(sqlQuery, function (error, data) {
                if (data.recordset && data.recordset.length > 0) {
                    result(null, data.recordset);
                } else {
                    result(true, null);
                }
            });
    }

    async create(course, result) {
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

    async update(id, course, result) {
        var pool = await conn;
        var sqlQuery = "UPDATE  SET subjectID = @subjectID,\
        semesterID = @semesterID, name = @name, instructor = @instructor\
            status = @status WHERE ID = @ID";
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

    async deleteCourse(id, status, result) {
        var pool = await conn;
        var sqlQuery = "UPDATE Course SET status = @status WHERE ID = @ID";
        return await pool.request()
            .input('ID', sql.Char, ID)
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
