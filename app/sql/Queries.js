const queries = {
  getExamSchedule: `SELECT
	  C.ID AS 'examSlotID',
    C.name AS 'courseName',
    C.subjectID,
    C.instructor,
    EB.ID AS 'examBatchID',
    ES.startTime,
    ES.endTime,
    R.examinerID,
    E.name AS 'examinerName',
    S.ID AS 'SemesterID',
    ER.classRoomID
    FROM
    [dbo].[Course] AS C
    INNER JOIN [dbo].[ExamBatch] AS EB ON C.ID = EB.courseID
    INNER JOIN [dbo].[ExamSlot] AS ES ON EB.ID = ES.examBatchID
    INNER JOIN [dbo].[Register] AS R ON ES.ID = R.examSlotID
    INNER JOIN [dbo].[Examiner] AS E ON R.examinerID = E.ID
    INNER JOIN [dbo].[Semester] AS S ON C.semesterID = S.ID
    INNER JOIN [dbo].[ExamRoom] AS ER ON ER.examSlotID = ES.ID
    WHERE ES.status = 1
    ORDER BY ES.startTime DESC`,
  getCourseByID: `SELECT * FROM dbo.Course WHERE ID = @courseID`,
  createExamSlotAndExamBatch: `BEGIN TRANSACTION
    INSERT INTO ExamBatch (courseID, code, date, location, status)
    VALUES (@courseID, @code, @startTime, 'FPTU', 0)
    DECLARE @examBatchID INT
    SET @examBatchID = SCOPE_IDENTITY()
    DECLARE @numericPart INT
    SELECT TOP 1 @numericPart = MAX(CAST(SUBSTRING(ID, 2, LEN(ID)) AS INT))
    FROM ExamSlot
    SET @numericPart = ISNULL(@numericPart, 0) + 1
    DECLARE @examSlotID NVARCHAR(50) = 'Q0' + CAST(@numericPart AS NVARCHAR(50));
    INSERT INTO ExamSlot (ID, examBatchID, startTime, endTime, quantity, status)
    VALUES (@examSlotID, @examBatchID, @startTime, @endTime, 1, 0);
    COMMIT`,
  register: `INSERT INTO Register(examinerID, examSlotID, status)
    VALUES (@examinerID, @examSlotID, 0)`
};

module.exports = queries;
