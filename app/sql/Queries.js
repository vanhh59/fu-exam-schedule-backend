const queries = {
  getExamSchedule: `SELECT
	  ES.ID AS 'examSlotID',
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
  getExamSlotInfo: `SELECT ES.ID AS examSlotID, ES.examBatchID, ES.startTime, ES.endTime, EB.code AS examBatchCode, ES.quantity, EB.location, ES.status, C.name FROM ExamSlot AS ES
  INNER JOIN ExamBatch AS EB ON ES.examBatchID = EB.ID
  INNER JOIN Course AS C ON EB.courseID = C.ID`,
  getExamSlotInfoById: `SELECT ES.ID AS examSlotID, ES.examBatchID, ES.startTime, ES.endTime, EB.code AS examBatchCode, ES.quantity, EB.location, ES.status, C.name FROM ExamSlot AS ES
  INNER JOIN ExamBatch AS EB ON ES.examBatchID = EB.ID
  INNER JOIN Course AS C ON EB.courseID = C.ID WHERE ES.ID = @ID`,
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
  VALUES (@examSlotID, @examBatchID, @startTime, @endTime, 5, 1);
  DECLARE @subjectID NVARCHAR(50);
  DECLARE @subjectName NVARCHAR(50);
  DECLARE @courseID1 VARCHAR(50);
  SELECT @subjectID = S.ID, @subjectName = S.name, @courseID1 = C.ID
  FROM dbo.Subject AS S
  INNER JOIN dbo.Course AS C ON S.ID = C.subjectID
  WHERE C.ID = @courseID;
  INSERT INTO Subject_Slot (examSlotID, subjectID, status)
  VALUES (@examSlotID, @subjectID, 1);
  SELECT @subjectID as subjectID, @subjectName as subjectName, @courseID1 as courseID, @examSlotID as examSlotID;
  COMMIT`,
  getSubjectIDSubjectNameByExamSlotID: `SELECT S.name as subjectName, S.ID as subjectID, ES.ID as examSlotID FROM ExamSlot AS ES
  INNER JOIN ExamBatch AS EB ON ES.examBatchID = EB.ID
  INNER JOIN Course AS C ON EB.courseID = C.ID
  INNER JOIN Subject AS S ON C.subjectID = S.ID
  WHERE ES.ID = @examSlotID`,
  register: `BEGIN TRANSACTION;
  DECLARE @ID VARCHAR(10);
  DECLARE @userID VARCHAR(10);
  DECLARE @email NVARCHAR(50);
  DECLARE @Role VARCHAR(100);
  SELECT @email = U.email, @userID = U.ID, @Role = U.Role
  FROM [dbo].[Users] AS U
  WHERE U.ID = @examinerID;
  SELECT @ID = E.ID
  FROM [dbo].[Examiner] AS E
  WHERE E.email = @email;
  IF @ID IS NULL
  BEGIN
    SELECT CAST(0 AS BIT) AS Result;
  END
  ELSE
  BEGIN
    INSERT INTO Register(examinerID, examSlotID, status) VALUES (@ID, @examSlotID, 1)
    SELECT CAST(1 AS BIT) AS Result, @email AS email, @ID AS examinerID, @userID AS userID, @Role AS Role;
  END;
  COMMIT;`,
  registerUser: `BEGIN TRANSACTION;
  DECLARE @ID VARCHAR(200)
  DECLARE @numberId INT
  SELECT TOP 1 @numberId = MAX(CAST(SUBSTRING(ID, 2, LEN(ID)) AS INT)) FROM [dbo].[Users];
  SET @numberId = ISNULL(@numberId, 0) + 1;
  SET @ID = 'U' + CAST(@numberId AS NVARCHAR(50));
  INSERT INTO [dbo].[Users] ([ID], [userName], [email], [Role], [status])
  VALUES (@ID, @userName, @email, 'Student', 1)
  COMMIT;`,
  getListExaminerRegister: `SELECT R.examinerID, R.examSlotID, R.status FROM [dbo].[Register] AS R WHERE R.examSlotID = @examSlotID AND R.status=1`,
  checkEmailIsValid: `SELECT CASE WHEN EXISTS (SELECT 1 FROM dbo.Users WHERE email = @email) THEN 1 ELSE 0 END AS EmailExists`,
  authorizeUser: `UPDATE [dbo].[Users] SET [Role] = @Role WHERE ID = @ID`,
  authorizeUserLecturer: `BEGIN TRANSACTION;
  UPDATE [dbo].[Users] SET [Role] = @Role WHERE ID = @ID;
  DECLARE @LastID INT;
  SELECT TOP 1 @LastID = CAST(SUBSTRING(ID, 3, LEN(ID)) AS INT)
  FROM Examiner
  WHERE ID LIKE 'EX%'
  ORDER BY ID DESC;
  IF @LastID IS NOT NULL
  BEGIN
    SET @LastID = @LastID + 1;
  END
  ELSE
  BEGIN
    SET @LastID = 1;
  END
  DECLARE @NewID NVARCHAR(10);
  DECLARE @name NVARCHAR(200);
  DECLARE @email NVARCHAR(200);
  SELECT @name = U.userName, @email = U.email FROM [dbo].[Users] AS U WHERE U.ID = @ID;
  SET @NewID = 'EX' + CAST(@LastID AS NVARCHAR(10));
  INSERT INTO [dbo].[Examiner] VALUES (@NewID, @name, @email, 0, 'No information yet', 1);
  SELECT @name, @email, @NewID AS examinerID
  COMMIT;`,
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
  DECLARE @ExamRoomExists BIT;
  SELECT @ExamRoomExists = CASE
      -- Check trường hợp đã tồn tại ExamRoom rồi thì return 0 (false) ngược lại thì return 1 (true)
      WHEN EXISTS (SELECT 1 FROM dbo.ExamRoom AS ER WHERE ER.classRoomID = @classRoomID AND ER.examSlotID = @examSlotID) THEN 1
      ELSE 0
  END;
  IF @ExamRoomExists = 1
  BEGIN
      SELECT CAST(0 AS BIT) AS Result;
  END
  ELSE
  BEGIN
    -- Tạo new record trong table ExamRoom (phòng thi)
    DECLARE @numericPart INT
    SELECT TOP 1 @numericPart = MAX(CAST(SUBSTRING(ER.ID, 2, LEN(ER.ID)) AS INT)) FROM ExamRoom AS ER
    SET @numericPart = ISNULL(@numericPart, 0) + 1
    DECLARE @examRoomID NVARCHAR(50) = 'R' + CAST(@numericPart AS NVARCHAR(50))
    INSERT INTO ExamRoom(ID, classRoomID, examSlotID, subjectID, examinerID)
    VALUES (@examRoomID, @classRoomID, @examSlotID, @subjectID, '')
    --------------------------------------
	DECLARE @quantity INT
    DECLARE @capacity INT
    DECLARE @totalStudent INT
	  -- Tính tổng số giám thị cần có của một ExamSlot (ca thi)
    SELECT @capacity = CR.capacity FROM ExamRoom as ER
    INNER JOIN Classroom as CR ON ER.classRoomID = CR.ID WHERE ER.ID = @examRoomID
    SELECT @totalStudent = COUNT(SE.studentID) FROM Stu_ExamRoom as SE
    WHERE SE.examRoomID = @examRoomID
    SET @quantity = (@totalStudent / @capacity) + 5
    UPDATE [dbo].[ExamSlot] SET [status] = 1, [quantity] = @quantity WHERE ID = @examRoomID
    SELECT CAST(1 AS BIT) AS Result;
  END;
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
  SELECT EM.ID ,EM.name, S.code, (SUM(DATEDIFF(MINUTE,ES.startTime, ES.endTime)) / 60 * 100000) as 'salary' 
  FROM Semester S
  INNER JOIN Course C ON S.ID = C.semesterID
  INNER JOIN ExamBatch E ON E.courseID = C.ID
  INNER JOIN ExamSlot ES ON ES.examBatchID = E.ID
  INNER JOIN Register R ON R.examSlotID = ES.ID
  INNER JOIN Examiner EM ON EM.ID = R.examinerID
  WHERE E.status = 1 AND EM.ID = @examinerID AND S.code = @semesterCode
  GROUP BY EM.ID ,EM.name, S.code
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
  getExamSlotNull: `SELECT ES.ID, ES.examBatchID, ES.startTime, ES.endTime, ES.quantity, ES.status FROM ExamSlot AS ES WHERE ES.quantity = 0 ORDER BY ES.ID DESC`,
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
    LEFT JOIN [Department] G ON G.examinerID = F.ID
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
  getAllUsers: ` SELECT U.ID, U.Role, U.userName, U.email, u.status FROM dbo.Users AS U`,
  getUserByEmail: `BEGIN TRANSACTION;
  DECLARE @examinerID VARCHAR(50);
  DECLARE @emailexaminer NVARCHAR(200);
  DECLARE @Role NVARCHAR(50);
  DECLARE @userName NVARCHAR(200);
  DECLARE @ID VARCHAR(50);
  SELECT @emailexaminer = U.email, @Role = U.Role, @ID = U.ID, @userName = U.userName
  FROM dbo.Users AS U WHERE U.email = @email;
  SELECT @examinerID = E.ID FROM Examiner AS E WHERE E.email = @emailexaminer;
  SELECT @examinerID AS examinerID, @emailexaminer AS email, @Role AS Role, @userName AS userName, @ID AS ID
  COMMIT;`,
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
  getExamRoomByExaminerID: `SELECT ES.ID AS examSlotID, ER.classRoomID AS classRoomCode, ER.ID AS examRoomID, S.name AS subjectName, ES.quantity AS totalExaminerInSlot, ES.status, ES.startTime, ES.endTime
  FROM ExamSlot ES 
  LEFT JOIN Register RE ON RE.examSlotID = ES.ID
  LEFT JOIN Examiner EX ON EX.ID = RE.examinerID
  LEFT JOIN ExamBatch EB ON EB.ID = ES.examBatchID
  LEFT JOIN Course C ON C.ID = EB.courseID
  LEFT JOIN Semester SE ON SE.ID = C.semesterID
  LEFT JOIN ExamRoom ER ON ER.examSlotID = ES.ID
  LEFT JOIN Subject S ON ER.subjectID = S.ID
  WHERE EX.ID = @examinerID AND RE.status = 1`,
  getFinishedExamSlot: `
  BEGIN TRANSACTION;
	  DECLARE @ExamRoomExists BIT;
	  SELECT @ExamRoomExists = CASE
		  WHEN EXISTS (SELECT 1 FROM dbo.ExamRoom AS ER WHERE ER.examinerID = @examinerID) THEN 1
		  ELSE 0
	  END;
	  IF @ExamRoomExists = 0
	  BEGIN
		  SELECT CAST(0 AS BIT) AS Result;
	  END
	  ELSE
	  BEGIN
		SELECT ES.ID AS examSlotID, ER.classRoomID AS classRoomCode, ER.ID AS examRoomID, S.name AS subjectName, ES.quantity AS totalExaminerInSlot, ES.status, ES.startTime, ES.endTime
		FROM ExamSlot ES 
		LEFT JOIN Register RE ON RE.examSlotID = ES.ID
		LEFT JOIN Examiner EX ON EX.ID = RE.examinerID
		LEFT JOIN ExamBatch EB ON EB.ID = ES.examBatchID
		LEFT JOIN Course C ON C.ID = EB.courseID
		LEFT JOIN Semester SE ON SE.ID = C.semesterID
		LEFT JOIN ExamRoom ER ON ER.examSlotID = ES.ID
		LEFT JOIN Subject S ON ER.subjectID = S.ID
		WHERE EX.ID = @examinerID
		AND RE.status = 1
		AND ES.endTime < CAST(GETDATE() AS DATE)
		SELECT CAST(1 AS BIT) AS Result;
	  END;
    COMMIT
  `,
  getUnFinishedExamSlot: `
  BEGIN TRANSACTION;
	  DECLARE @ExamRoomExists BIT;
	  SELECT @ExamRoomExists = CASE
		  WHEN EXISTS (SELECT 1 FROM dbo.ExamRoom AS ER WHERE ER.examinerID = @examinerID) THEN 1
		  ELSE 0
	  END;
	  IF @ExamRoomExists = 0
	  BEGIN
		  SELECT CAST(0 AS BIT) AS Result;
	  END
	  ELSE
	  BEGIN
		SELECT ES.ID AS examSlotID, ER.classRoomID AS classRoomCode, ER.ID AS examRoomID, S.name AS subjectName, ES.quantity AS totalExaminerInSlot, ES.status, ES.startTime, ES.endTime
		FROM ExamSlot ES 
		LEFT JOIN Register RE ON RE.examSlotID = ES.ID
		LEFT JOIN Examiner EX ON EX.ID = RE.examinerID
		LEFT JOIN ExamBatch EB ON EB.ID = ES.examBatchID
		LEFT JOIN Course C ON C.ID = EB.courseID
		LEFT JOIN Semester SE ON SE.ID = C.semesterID
		LEFT JOIN ExamRoom ER ON ER.examSlotID = ES.ID
		LEFT JOIN Subject S ON ER.subjectID = S.ID
		WHERE EX.ID = @examinerID
		AND RE.status = 1
		AND ES.endTime > CAST(GETDATE() AS DATE)
		SELECT CAST(1 AS BIT) AS Result;
	  END;
    COMMIT
  `,
  getRegisteredInformation: `
    SELECT E.ID AS 'Examiner ID', E.name, E.email, E.experienceYears,
    E.specialization, ES.ID as 'Exam Slot ID', ES.startTime, ES.endTime,
    ES.quantity
    FROM Examiner E 
    LEFT JOIN Register R ON E.ID = R.examinerID
    LEFT JOIN ExamSlot ES ON ES.ID = R.examSlotID
    WHERE E.ID = @examinerID AND ES.ID = @examSlotID
  `,
  getCurrentDateExamSlot: `
  SELECT *
  FROM ExamSlot e
  WHERE e.startTime = CAST(GETDATE() AS DATE)
  `,
  getAllSalariesEachSemester: `
    SELECT A.code, A.ID as 'Semester ID', (SUM(DATEDIFF(MINUTE,D.startTime, D.endTime)) / 60 * 100000) as 'salary' 
      FROM Semester A 
      LEFT JOIN Course B ON A.ID = B.semesterID
      LEFT JOIN ExamBatch C ON C.courseID = B.ID
      LEFT JOIN ExamSlot D ON D.examBatchID = C.ID
      GROUP BY A.code, A.ID
  `,
  getInfoExamRoom: `SELECT ER.ID AS examRoomID, ER.subjectID, S.name as subjectName, ER.examinerID, E.name AS examinerName, ER.examSlotID, CR.code AS classRoomCode, CR.building FROM dbo.ExamRoom AS ER
  INNER JOIN dbo.Subject AS S ON ER.subjectID = S.ID
  INNER JOIN dbo.Examiner AS E ON ER.examinerID = E.ID
  INNER JOIN dbo.Classroom AS CR ON ER.classRoomID = CR.ID`,
  getInfoExamRoomById: `SELECT ER.ID AS examRoomID, ER.subjectID, S.name as subjectName, ER.examinerID, E.name AS examinerName, ER.examSlotID, CR.code AS classRoomCode, CR.building FROM dbo.ExamRoom AS ER
  INNER JOIN dbo.Subject AS S ON ER.subjectID = S.ID
  INNER JOIN dbo.Examiner AS E ON ER.examinerID = E.ID
  INNER JOIN dbo.Classroom AS CR ON ER.classRoomID = CR.ID
  WHERE ER.ID = @ID`,
  getRegisterWithExaminerInfo: `SELECT R.examSlotID, R.examinerID, E.name, R.status FROM Register AS R
  INNER JOIN Examiner AS E ON R.examinerID = E.ID`,
  getInfoSalaryAndExaminerAndExamSlotAndExamRoom: `BEGIN TRANSACTION;
	SELECT E.ID, E.email, E.name, E.experienceYears, E.specialization, E.status FROM Examiner AS E WHERE ID = @examinerID
	SELECT EM.ID AS examinerID,EM.name AS examinerName,
	S.code AS semesterCode, C.name AS courseName,
	C.subjectID, ES.startTime, ES.endTime,
	ES.ID AS examSlot, ER.ID AS examRoom,
	ER.classRoomID AS classRoomCode, (SUM(DATEDIFF(MINUTE,ES.startTime, ES.endTime)) / 60 * 100000) as 'salary' 
    FROM Semester S
    INNER JOIN Course C ON S.ID = C.semesterID
    INNER JOIN ExamBatch E ON E.courseID = C.ID
    INNER JOIN ExamSlot ES ON ES.examBatchID = E.ID
    INNER JOIN Register R ON R.examSlotID = ES.ID
    INNER JOIN Examiner EM ON EM.ID = R.examinerID
	INNER JOIN ExamRoom ER ON ER.examSlotID = ES.ID
    WHERE E.status = 1 AND EM.ID = @examinerID AND ES.endTime < CAST(GETDATE() AS DATE)
    GROUP BY EM.ID ,EM.name, S.code, C.name, C.subjectID, ES.startTime, ES.endTime, ES.ID, ER.ID, ER.classRoomID
	COMMIT;`,
  deleteClassRoom: `BEGIN TRANSACTION;
  DECLARE @ClassRoomExists BIT;
  SELECT @ClassRoomExists = CASE
        WHEN EXISTS (SELECT TOP 1 1
  FROM dbo.ExamRoom AS ER
  INNER JOIN ExamSlot ES ON ER.examSlotID = ES.ID
  WHERE ER.classRoomID = @ID AND ES.startTime > CAST(GETDATE() AS DATE) ORDER BY ES.startTime DESC
  ) THEN 1
        ELSE 0
    END;
    IF @ClassRoomExists = 1
    BEGIN
        SELECT CAST(0 AS BIT) AS Result;
    END
    ELSE
    BEGIN
      UPDATE [dbo].[Classroom] SET status = 0 WHERE ID = @ID
      SELECT CAST(1 AS BIT) AS Result;
    END;
    COMMIT`,
  deleteExamSlot: `BEGIN TRANSACTION;
  DECLARE @ExamSlotExists BIT;
  SELECT @ExamSlotExists = CASE
      WHEN EXISTS (SELECT TOP 1 *
  FROM dbo.ExamRoom AS ER
  INNER JOIN ExamSlot ES ON ER.examSlotID = ES.ID
  WHERE ER.examSlotID = @ID AND ES.startTime > CAST(GETDATE() AS DATE) ORDER BY ES.startTime DESC
  ) THEN 1
        ELSE 0
    END;
    IF @ExamSlotExists = 1
    BEGIN
        SELECT CAST(0 AS BIT) AS Result;
    END
    ELSE
    BEGIN
  UPDATE ExamSlot SET status = 0 WHERE ID = @ID
      SELECT CAST(1 AS BIT) AS Result;
    END;
    COMMIT`,
  updateExamSlot: `BEGIN TRANSACTION;
  DECLARE @MinValidDate DATETIME
  SET @MinValidDate = DATEADD(DAY, 7, GETDATE())
  
  IF @startTime >= @MinValidDate AND @endTime >= @MinValidDate AND @quantity >= 1
  BEGIN
      UPDATE ExamSlot
      SET startTime = @startTime,
          endTime = @endTime,
          quantity = @quantity
      WHERE ID = @ID;
    SELECT CAST(1 AS BIT) AS Result;
  END
  ELSE
  BEGIN
      SELECT CAST(0 AS BIT) AS Result;
  END
  COMMIT;`,
  updateExamRoomAddExaminer: `BEGIN TRANSACTION;
  DECLARE @ExaminerExists BIT;
  SELECT @ExaminerExists = CASE
    WHEN EXISTS (SELECT 1 FROM dbo.ExamRoom AS ER
    INNER JOIN ExamSlot ES ON ER.examSlotID = ES.ID
    WHERE ER.examinerID = @examinerID AND ES.ID = @examSlotID) THEN 1
    ELSE 0
  END;
  IF @ExaminerExists = 1
  BEGIN
    SELECT CAST(0 AS BIT) AS Result;
  END
  ELSE
  BEGIN
  UPDATE ExamRoom SET examinerID = @examinerID WHERE ID = @examRoomID
  SELECT CAST(1 AS BIT) AS Result;
  END;
  COMMIT`,
  getExamSlotFullInfo: `SELECT ES.ID AS examSlotID, EB.code, ES.startTime, ES.endTime, '' + CAST(ES.quantity AS NVARCHAR(10)) + '' AS quantity,
  (
      SELECT ER.ID AS examRoomID, ER.classRoomID AS classRoomCode,
      ER.subjectID, S.name AS subjectName, EM.ID, EM.name,
      (
          SELECT R.examinerID, EM2.name AS examinerName FROM Register AS R
          INNER JOIN Examiner AS EM2 ON R.examinerID = EM2.ID
          WHERE ES.ID = R.examSlotID
          FOR JSON PATH
      ) AS ExaminerRegisterList,
      (
          SELECT DISTINCT EM2.ID AS examinerID, EM2.name AS examinerName FROM Register AS R
          INNER JOIN Examiner AS EM2 ON R.examinerID = EM2.ID
          WHERE ES.ID <> R.examSlotID
          FOR JSON PATH
      ) AS ExaminerBackupList
      FROM ExamRoom AS ER
      LEFT JOIN Examiner AS EM ON EM.ID = ER.examinerID
      LEFT JOIN Subject AS S ON ER.subjectID = S.ID
      WHERE ER.examSlotID = ES.ID
      FOR JSON PATH
  ) AS ExamRoomList
  FROM dbo.ExamSlot AS ES
  LEFT JOIN ExamBatch AS EB ON ES.examBatchID = EB.ID
  FOR JSON PATH;
  `,
  getExamSlotFullInfoByID: `SELECT ES.ID AS examSlotID, EB.code, ES.startTime, ES.endTime, '' + CAST(ES.quantity AS NVARCHAR(10)) + '' AS quantity,
  (
      SELECT ER.ID AS examRoomID, ER.classRoomID AS classRoomCode,
      ER.subjectID, S.name AS subjectName, EM.ID, EM.name,
      (
          SELECT R.examinerID, EM2.name AS examinerName FROM Register AS R
          INNER JOIN Examiner AS EM2 ON R.examinerID = EM2.ID
          WHERE ES.ID = R.examSlotID
          FOR JSON PATH
      ) AS ExaminerRegisterList,
      (
          SELECT DISTINCT EM2.ID AS examinerID, EM2.name AS examinerName FROM Register AS R
          INNER JOIN Examiner AS EM2 ON R.examinerID = EM2.ID
          WHERE ES.ID <> R.examSlotID
          FOR JSON PATH
      ) AS ExaminerBackupList
      FROM ExamRoom AS ER
      LEFT JOIN Examiner AS EM ON EM.ID = ER.examinerID
      LEFT JOIN Subject AS S ON ER.subjectID = S.ID
      WHERE ER.examSlotID = ES.ID
      FOR JSON PATH
  ) AS ExamRoomList
  FROM dbo.ExamSlot AS ES
  LEFT JOIN ExamBatch AS EB ON ES.examBatchID = EB.ID
  WHERE ES.ID = @examSlotID
  FOR JSON PATH;`,
  getExamRoomFullInfo: `BEGIN TRANSACTION;
  --Lấy thông tin ExamRoom
  SELECT 
      ER.ID AS examRoomID, 
      ER.classRoomID AS classRoomCode, 
      S.name AS subjectName, 
      EB.code, 
      EM.name AS examinerName,
    COUNT(Stu.studentID) AS totalStudent,
      ES.startTime, 
      ES.endTime
  FROM ExamRoom AS ER
  INNER JOIN ExamSlot AS ES ON ER.examSlotID = ES.ID
  INNER JOIN Subject AS S ON ER.subjectID = S.ID
  INNER JOIN ExamBatch AS EB ON ES.examBatchID = EB.ID
  LEFT JOIN Examiner AS EM ON ER.examinerID = EM.ID
  LEFT JOIN (
      SELECT * FROM Stu_ExamRoom WHERE examRoomID = @examRoomID
  ) AS Stu ON Stu.examRoomID = ER.ID
  WHERE ER.ID = @examRoomID
  GROUP BY ER.ID, ER.classRoomID, S.name, EB.code, EM.name, ES.startTime, ES.endTime;
  
  SELECT SE.examRoomID, SE.studentID, S.name as studentName, S.email, S.dateOfBirth, S.major, S.yearOfStudy, S.status FROM Stu_ExamRoom AS SE
  INNER JOIN Student AS S ON SE.studentID = S.ID
  WHERE SE.examRoomID = @examRoomID
  COMMIT;`
};

module.exports = queries;
