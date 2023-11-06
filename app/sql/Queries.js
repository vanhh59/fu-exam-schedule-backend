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
  createExamSlotAndExamBatch: `BEGIN TRANSACTION;
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
  SELECT @subjectID as subjectID, @subjectName as subjectName, @courseID1 as courseID;
  COMMIT`,
  register: `INSERT INTO Register(examinerID, examSlotID, status)
    VALUES (@examinerID, @examSlotID, 0)`,
  registerUser: `BEGIN TRANSACTION;
  DECLARE @ID VARCHAR(200)
  DECLARE @numberId INT
  SELECT TOP 1 @numberId = MAX(CAST(SUBSTRING(ID, 2, LEN(ID)) AS INT)) FROM [dbo].[Users];
  SET @numberId = ISNULL(@numberId, 0) + 1;
  SET @ID = 'U' + CAST(@numberId AS NVARCHAR(50));
  INSERT INTO [dbo].[Users] ([ID], [userName], [email], [Role], [status])
  VALUES (@ID, @userName, @email, 'Student', 1)
  COMMIT;`,
  checkEmailIsValid: `SELECT CASE WHEN EXISTS (SELECT 1 FROM dbo.Users WHERE email = @email) THEN 1 ELSE 0 END AS EmailExists`,
  authorizeUser: `UPDATE [dbo].[Users] SET [Role] = @Role WHERE ID = @ID`,
  addStudentIntoExamRoom: `INSERT INTO [dbo].[Stu_ExamRoom] (examRoomID, studentID, status)
  VALUES (@examRoomID, @studentID, 1)`,
  checkUpdteRegisterIsLessThan3Day: `
  DECLARE @Now DATETIME = GETDATE();
  SELECT CASE
      WHEN EXISTS (
          SELECT 1
          FROM [dbo].[Register] AS R
          INNER JOIN [dbo].[ExamSlot] AS ES ON R.examSlotID = ES.ID
          WHERE R.examinerID = @examinerID AND ES.ID = @examSlotID AND DATEDIFF(DAY, @Now, ES.startTime) <= 3
      ) THEN 1
      ELSE 0
  END AS Result;`,
  updateRegister: `BEGIN TRANSACTION;
  UPDATE [dbo].[Register] SET [status] = 0 WHERE [examinerID] = @examinerID AND [examSlotID] = @examSlotID
  UPDATE [dbo].[ExamRoom] SET [examinerID] = '' WHERE [examinerID] = @examinerID AND [examSlotID] = @examSlotID
  COMMIT`,
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
  income: `
    SELECT F.ID ,F.name, A.code, (SUM(DATEDIFF(MINUTE,D.startTime, D.endTime)) / 60 * 100000) as 'salary' 
      FROM Semester A 
      LEFT JOIN Course B ON A.ID = B.semesterID
      LEFT JOIN ExamBatch C ON C.courseID = B.ID
      LEFT JOIN ExamSlot D ON D.examBatchID = C.ID
      LEFT JOIN Register E ON E.examSlotID = D.ID
      LEFT JOIN Examiner F ON F.ID = E.examinerID
      WHERE E.status = 1 AND F.ID = @examinerID AND A.code = @SemesterCode
      GROUP BY F.ID ,F.name, A.code
      `,
  getAllIncome: `
      SELECT F.ID ,F.name, A.code, A.ID as 'Semester ID', (SUM(DATEDIFF(MINUTE,D.startTime, D.endTime)) / 60 * 100000) as 'salary' 
      FROM Semester A 
      LEFT JOIN Course B ON A.ID = B.semesterID
      LEFT JOIN ExamBatch C ON C.courseID = B.ID
      LEFT JOIN ExamSlot D ON D.examBatchID = C.ID
      LEFT JOIN Register E ON E.examSlotID = D.ID
      LEFT JOIN Examiner F ON F.ID = E.examinerID
      WHERE E.status = 1 AND A.code = @SemesterCode
      GROUP BY F.ID ,F.name, A.code, A.ID
      `,
  getAllIncomeV2: `
      SELECT F.ID ,F.name, A.code, A.ID as 'Semester ID', (SUM(DATEDIFF(MINUTE,D.startTime, D.endTime)) / 60 * 100000) as 'salary' 
      FROM Semester A 
      LEFT JOIN Course B ON A.ID = B.semesterID
      LEFT JOIN ExamBatch C ON C.courseID = B.ID
      LEFT JOIN ExamSlot D ON D.examBatchID = C.ID
      LEFT JOIN Register E ON E.examSlotID = D.ID
      LEFT JOIN Examiner F ON F.ID = E.examinerID
      WHERE E.status = 1 
      GROUP BY F.ID ,F.name, A.code, A.ID
      `,
  getAvailableSlots: `
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
  getAvailableSlots2: `
  SELECT E.ID, E.startTime, E.endTime, E.status, S.code
  FROM ExamSlot E
  LEFT JOIN Register R ON E.ID = R.examSlotID 
	LEFT JOIN ExamBatch EB ON EB.ID = E.examBatchID
	LEFT JOIN Course C ON C.ID = EB.courseID
	LEFT JOIN Semester S ON S.ID = C.semesterID
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
    )
	AND S.code = @SemesterCode;
  `,
  getDepartmentSalary: `
  WITH ExaminerSalaries AS (
    SELECT
        G.location AS [Department],
        F.ID AS ExaminerID,
        SUM(DATEDIFF(MINUTE, D.startTime, D.endTime)) / 60 * 100000 AS Salary
    FROM Semester A
    LEFT JOIN Course B ON A.ID = B.semesterID
    LEFT JOIN ExamBatch C ON C.courseID = B.ID
    LEFT JOIN ExamSlot D ON D.examBatchID = C.ID
    LEFT JOIN Register E ON E.examSlotID = D.ID
    LEFT JOIN Examiner F ON F.ID = E.examinerID
    LEFT JOIN [DB_EXAM].[dbo].[Department] G ON G.examinerID = F.ID
    WHERE E.status = 1
    GROUP BY G.location, F.ID
)
SELECT [Department], SUM(Salary) AS TotalSalary
FROM ExaminerSalaries
GROUP BY [Department];
`,
  getExamRoomInSemester: `
  SELECT C.ID AS 'CourseID', S.name as 'SubjectName', EB.code as 'examBatch_code',
	ES.startTime, ES.endTime, EX.name as 'ExaminerName', SE.ID as 'SemesterID',
	CR.ID as 'classRoomID'
	FROM ExamRoom E
	LEFT JOIN Examiner EX ON EX.ID = E.examinerID
	LEFT JOIN Classroom CR ON CR.ID = E.classRoomID
	LEFT JOIN Subject S ON E.subjectID = S.ID
	LEFT JOIN ExamSlot ES ON ES.ID = E.examSlotID
	LEFT JOIN Course C ON C.subjectID = S.ID
	LEFT JOIN Semester SE ON SE.ID = C.semesterID
	LEFT JOIN ExamBatch EB ON EB.courseID = C.ID
	WHERE SE.code = @SemesterCode
  `,
  checkAuthenticate: `SELECT U.Role, U.userName FROM dbo.Users AS U
  WHERE U.email = '@email'`,
  checkAuthorize: `SELECT U.Role, U.userName FROM dbo.Users AS U
  WHERE U.email = '@email' AND U.Role = '@role'`,
  getAllUsers: `SELECT U.Role, U.userName, U.email FROM dbo.Users AS U`,
  getUserByEmail: `SELECT U.Role, U.userName, U.email, U.ID FROM dbo.Users AS U WHERE U.email = @email`,
  getUserByID: `SELECT U.Role, U.userName, U.email, U.ID FROM dbo.Users AS U WHERE U.ID = @ID`,
  isConflictDuringStartEndTime: `
  DECLARE @NewStartTime DATETIME = @startTime;
  DECLARE @NewEndTime DATETIME = @endTime;
  DECLARE @IsConflict BIT; -- This variable will store the result
  IF EXISTS (
      SELECT 1
      FROM [dbo].[ExamSlot] AS ES
      WHERE (
          @NewStartTime >= ES.startTime AND @NewStartTime < ES.endTime
      )
      OR (
          @NewEndTime > ES.startTime AND @NewEndTime <= ES.endTime
      )
      OR (
          @NewStartTime <= ES.startTime AND @NewEndTime >= ES.endTime
      )
  )
  BEGIN
      SET @IsConflict = 1;
  END
  ELSE
  BEGIN
      SET @IsConflict = 0;
  END
  SELECT @IsConflict AS Result;`,
  isConflictRule15Minutes: `DECLARE @NewStartTime DATETIME = @endTime;
  DECLARE @IsConflict BIT;
  IF EXISTS (
      SELECT 1
      FROM [dbo].[ExamSlot] AS ES
      WHERE DATEDIFF(MINUTE, ES.endTime, @NewStartTime) BETWEEN 0 AND 15
  )
  BEGIN
      SET @IsConflict = 1;
  END
  ELSE
  BEGIN
      SET @IsConflict = 0;
  END
  SELECT @IsConflict AS Result;`,
  getStudentInRoom: `
  SELECT S.name, S.email, ES.startTime, ES.ID 
  FROM Student S 
  LEFT JOIN Stu_ExamRoom SE ON SE.studentID = S.ID
  LEFT JOIN ExamRoom ER ON ER.ID = SE.examRoomID
  LEFT JOIN ExamSlot ES ON ES.ID = ER.examSlotID
  WHERE ES.ID = @examSlotID
  `,
  getExamSlotByStudentID: `
  SELECT EX.name as 'Examiner name', ES.startTime, ES.endTime, SU.code, SEM.code
	FROM Student S 
	LEFT JOIN Stu_ExamRoom SE ON SE.studentID = S.ID
	LEFT JOIN ExamRoom ER ON ER.ID = SE.examRoomID
	LEFT JOIN ExamSlot ES ON ES.ID = ER.examSlotID
	LEFT JOIN Register RE ON RE.examSlotID = ES.ID
	LEFT JOIN Examiner EX ON EX.ID = RE.examinerID
	LEFT JOIN Subject SU ON SU.ID = ER.subjectID
	LEFT JOIN Course C ON C.subjectID = SU.ID
	LEFT JOIN Semester SEM ON SEM.ID = C.semesterID
	WHERE S.ID = @StudentId  AND SEM.code = @SemesterCode
  `,
  getExamRoomByExaminerID: `
    SELECT ES.ID, ES.startTime, ES.endTime, ES.quantity, ES.status
    FROM ExamSlot ES 
    LEFT JOIN Register RE ON RE.examSlotID = ES.ID
    LEFT JOIN Examiner EX ON EX.ID = RE.examinerID
    LEFT JOIN ExamBatch EB ON EB.ID = ES.examBatchID
    LEFT JOIN Course C ON C.ID = EB.courseID
    LEFT JOIN Semester SE ON SE.ID = C.semesterID
    WHERE EX.ID = @examinerID AND SE.code = @SemesterCode AND RE.status = 1
  `,
  getFinishedExamSlot: `
  SELECT ES.ID, ES.startTime, ES.endTime, ES.quantity, ES.status
    FROM ExamSlot ES 
    LEFT JOIN Register RE ON RE.examSlotID = ES.ID
    LEFT JOIN Examiner EX ON EX.ID = RE.examinerID
    LEFT JOIN ExamBatch EB ON EB.ID = ES.examBatchID
    LEFT JOIN Course C ON C.ID = EB.courseID
    LEFT JOIN Semester SE ON SE.ID = C.semesterID
    WHERE EX.ID = @examinerID 
	AND SE.code = @SemesterCode 
	AND RE.status = 1
	AND ES.endTime < CAST(GETDATE() AS DATE)
  `,
  getUnFinishedExamSlot: `
  SELECT ES.ID, ES.startTime, ES.endTime, ES.quantity, ES.status
    FROM ExamSlot ES 
    LEFT JOIN Register RE ON RE.examSlotID = ES.ID
    LEFT JOIN Examiner EX ON EX.ID = RE.examinerID
    LEFT JOIN ExamBatch EB ON EB.ID = ES.examBatchID
    LEFT JOIN Course C ON C.ID = EB.courseID
    LEFT JOIN Semester SE ON SE.ID = C.semesterID
    WHERE EX.ID = @examinerID 
	AND SE.code = @SemesterCode 
	AND RE.status = 1
	AND ES.endTime > CAST(GETDATE() AS DATE)
  `,
  getRegisteredInformation:
    `
    SELECT E.ID AS 'Examiner ID', E.name, E.email, E.experienceYears,
    E.specialization, ES.ID as 'Exam Slot ID', ES.startTime, ES.endTime,
    ES.quantity
    FROM Examiner E 
    LEFT JOIN Register R ON E.ID = R.examinerID
    LEFT JOIN ExamSlot ES ON ES.ID = R.examSlotID
    WHERE E.ID = @examinerID AND ES.ID = @examSlotID
  `,
  getCurrentDateExamSlot:
    `
  SELECT *
  FROM ExamSlot e
  WHERE e.startTime = CAST(GETDATE() AS DATE)
  `,
  getAllSalariesEachSemester:
    `
    SELECT A.code, A.ID as 'Semester ID', (SUM(DATEDIFF(MINUTE,D.startTime, D.endTime)) / 60 * 100000) as 'salary' 
      FROM Semester A 
      LEFT JOIN Course B ON A.ID = B.semesterID
      LEFT JOIN ExamBatch C ON C.courseID = B.ID
      LEFT JOIN ExamSlot D ON D.examBatchID = C.ID
      GROUP BY A.code, A.ID
  `
};

module.exports = queries;
