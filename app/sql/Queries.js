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
  createExamSlotAndExamBatch:`BEGIN TRY
  BEGIN TRANSACTION;
  INSERT INTO ExamBatch (courseID, code, date, location, status) VALUES (@courseID, @code, @startTime, 'FPTU', 1);
  DECLARE @examBatchID INT;
  DECLARE @numericPart INT;
  DECLARE @examSlotID NVARCHAR(50);
  SET @examBatchID = SCOPE_IDENTITY();
  SELECT TOP 1 @numericPart = MAX(CAST(SUBSTRING(ID, 2, LEN(ID)) AS INT)) FROM ExamSlot;
  SET @numericPart = ISNULL(@numericPart, 0) + 1;
  SET @examSlotID = 'Q0' + CAST(@numericPart AS NVARCHAR(50));
  INSERT INTO ExamSlot (ID, examBatchID, startTime, endTime, quantity, status)
  VALUES (@examSlotID, @examBatchID, @startTime, @endTime, 0, 0);
  DECLARE @subjectID NVARCHAR(50);
  DECLARE @subjectName NVARCHAR(50);
  DECLARE @courseID1 VARCHAR(50);
  SELECT @subjectID = S.ID, @subjectName = S.name, @courseID1 = C.ID
  FROM dbo.Subject AS S
  INNER JOIN dbo.Course AS C ON S.ID = C.subjectID
  WHERE C.ID = @courseID;
  INSERT INTO Subject_Slot (examSlotID, subjectID, status)
  VALUES (@examSlotID, @subjectID, 1);
  COMMIT;
  SELECT @subjectID as subjectID, @subjectName as subjectName, @courseID1 as courseID;
  END TRY
  BEGIN CATCH
    IF @@TRANCOUNT > 0
        ROLLBACK;
  END CATCH;`,
  register: `INSERT INTO Register(examinerID, examSlotID, status)
    VALUES (@examinerID, @examSlotID, 0)`,
  fieldInfoExamSchedule: `BEGIN TRANSACTION;
  DECLARE @numericPart INT
  SELECT TOP 1 @numericPart = MAX(CAST(SUBSTRING(ER.ID, 2, LEN(ER.ID)) AS INT))
  FROM ExamRoom AS ER
  SET @numericPart = ISNULL(@numericPart, 0) + 1
  DECLARE @examRoomID NVARCHAR(50) = 'R0' + CAST(@numericPart AS NVARCHAR(50))
  INSERT INTO ExamRoom(ID, classRoomID, examSlotID, subjectID, examinerID)
  VALUES (@examRoomID, @classRoomID, @examSlotID, @subjectID, @examinerID)
  DECLARE @quantity INT
  DECLARE @capacity INT
  DECLARE @totalStudent INT
  SELECT @capacity = CR.capacity FROM ExamRoom as ER
  INNER JOIN Classroom as CR ON ER.classRoomID = CR.ID
  WHERE ER.ID = @examRoomID
  SELECT @totalStudent = COUNT(SE.studentID) FROM Stu_ExamRoom as SE
  WHERE SE.examRoomID = @examRoomID
  SET @quantity = (@totalStudent / @capacity) + 5
  SELECT @quantity as quantity, @capacity as capacity, @totalStudent as total
  UPDATE [dbo].[ExamSlot] SET [status] = 1, [quantity] = @quantity WHERE ID = @examRoomID
  COMMIT`,
  importExcelFile: `INSERT INTO Stu_ExamRoom (studentID, examRoomID, status) VALUES (@studentID, @examRoomID, 1)`,
  updateQuantityExamSlot: `BEGIN TRANSACTION;
    DECLARE @quantity INT
    DECLARE @capacity INT
    DECLARE @totalStudent INT
    SELECT @capacity = CR.capacity FROM ExamRoom as ER
    INNER JOIN Classroom as CR ON ER.classRoomID = CR.ID
    WHERE ER.ID = @examRoomID
    SELECT @totalStudent = COUNT(SE.studentID) FROM Stu_ExamRoom as SE
    WHERE SE.examRoomID = @examRoomID
    SET @quantity = (@totalStudent / @capacity) + 5
    SELECT @quantity as quantity, @capacity as capacity, @totalStudent as total
    UPDATE [dbo].[ExamSlot] SET [status] = 1, [quantity] = @quantity WHERE ID = @examSlotID
    COMMIT`,
    income:
    `SELECT F.ID ,F.name, A.code, (SUM(DATEDIFF(MINUTE,D.startTime, D.endTime)) / 60 * 100000) as 'salary' 
    FROM Semester A 
    LEFT JOIN Course B ON A.ID = B.semesterID
    LEFT JOIN ExamBatch C ON C.courseID = B.ID
    LEFT JOIN ExamSlot D ON D.examBatchID = C.ID
    LEFT JOIN Register E ON E.examSlotID = D.ID
    LEFT JOIN Examiner F ON F.ID = E.examinerID
    WHERE E.status = 1 AND F.ID = @examinerID
    GROUP BY F.ID ,F.name, A.code`,
  getAllIncome:
    `SELECT F.ID ,F.name, A.code, (SUM(DATEDIFF(MINUTE,D.startTime, D.endTime)) / 60 * 100000) as 'salary' 
  FROM Semester A 
  LEFT JOIN Course B ON A.ID = B.semesterID
  LEFT JOIN ExamBatch C ON C.courseID = B.ID
  LEFT JOIN ExamSlot D ON D.examBatchID = C.ID
  LEFT JOIN Register E ON E.examSlotID = D.ID
  LEFT JOIN Examiner F ON F.ID = E.examinerID
  WHERE E.status = 1
  GROUP BY F.ID ,F.name, A.code`,
  getAvailableSlots:
    `
    SELECT E.ID, E.startTime, E.endTime, E.status
    FROM ExamSlot E
    LEFT JOIN Register R ON E.ID = R.examSlotID 
    WHERE E.status = 1 
    AND E.quantity > (
    SELECT COUNT(R2.examSlotID)
    FROM Register R2
    WHERE R2.examSlotID = E.ID AND R2.status = 1
    )
    AND E.ID NOT IN(
    SELECT examSlotID
    FROM Register
    WHERE examinerID = @examinerID AND status = 1
    );
  `,
    getDepartmentSalary:`
    BEGIN TRANSACTION;
    WITH ExaminerSalaries AS (
      SELECT
          G.location AS Department,
          F.ID AS ExaminerID,
          SUM(DATEDIFF(MINUTE, D.startTime, D.endTime)) / 60 * 100000 AS Salary
      FROM Semester A
      LEFT JOIN Course B ON A.ID = B.semesterID
      LEFT JOIN ExamBatch C ON C.courseID = B.ID
      LEFT JOIN ExamSlot D ON D.examBatchID = C.ID
      LEFT JOIN Register E ON E.examSlotID = D.ID
      LEFT JOIN Examiner F ON F.ID = E.examinerID
      LEFT JOIN Department G ON G.examinerID = F.ID
      WHERE E.status = 1
      GROUP BY G.location, F.ID)
    SELECT Department, SUM(Salary) AS TotalSalary
    FROM ExaminerSalaries
    GROUP BY Department;
    COMMIT`
};

module.exports = queries;
