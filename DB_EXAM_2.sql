USE [master]
GO
/****** Object:  Database [DB_EXAM_2]    Script Date: 11/9/2023 3:05:44 PM ******/
CREATE DATABASE [DB_EXAM_2]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'DB_EXAM_2', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\DB_EXAM_2.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'DB_EXAM_2_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\DB_EXAM_2_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [DB_EXAM_2] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [DB_EXAM_2].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [DB_EXAM_2] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [DB_EXAM_2] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [DB_EXAM_2] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [DB_EXAM_2] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [DB_EXAM_2] SET ARITHABORT OFF 
GO
ALTER DATABASE [DB_EXAM_2] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [DB_EXAM_2] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [DB_EXAM_2] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [DB_EXAM_2] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [DB_EXAM_2] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [DB_EXAM_2] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [DB_EXAM_2] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [DB_EXAM_2] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [DB_EXAM_2] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [DB_EXAM_2] SET  ENABLE_BROKER 
GO
ALTER DATABASE [DB_EXAM_2] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [DB_EXAM_2] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [DB_EXAM_2] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [DB_EXAM_2] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [DB_EXAM_2] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [DB_EXAM_2] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [DB_EXAM_2] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [DB_EXAM_2] SET RECOVERY FULL 
GO
ALTER DATABASE [DB_EXAM_2] SET  MULTI_USER 
GO
ALTER DATABASE [DB_EXAM_2] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [DB_EXAM_2] SET DB_CHAINING OFF 
GO
ALTER DATABASE [DB_EXAM_2] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [DB_EXAM_2] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [DB_EXAM_2] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [DB_EXAM_2] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'DB_EXAM_2', N'ON'
GO
ALTER DATABASE [DB_EXAM_2] SET QUERY_STORE = ON
GO
ALTER DATABASE [DB_EXAM_2] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [DB_EXAM_2]
GO
/****** Object:  Table [dbo].[Classroom]    Script Date: 11/9/2023 3:05:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Classroom](
	[ID] [char](20) NOT NULL,
	[code] [nvarchar](50) NULL,
	[building] [nvarchar](100) NULL,
	[floor] [int] NULL,
	[type] [nvarchar](50) NULL,
	[capacity] [int] NULL,
	[status] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Course]    Script Date: 11/9/2023 3:05:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Course](
	[ID] [char](20) NOT NULL,
	[subjectID] [char](20) NULL,
	[semesterID] [char](20) NULL,
	[name] [nvarchar](100) NULL,
	[instructor] [char](20) NULL,
	[status] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Department]    Script Date: 11/9/2023 3:05:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Department](
	[examinerID] [char](20) NULL,
	[name] [nvarchar](20) NULL,
	[examinerType] [char](20) NULL,
	[faculty] [nvarchar](50) NULL,
	[location] [nvarchar](100) NULL,
	[phone] [char](15) NULL,
	[status] [bit] NULL,
	[departmentID] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_Department] PRIMARY KEY CLUSTERED 
(
	[departmentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ExamBatch]    Script Date: 11/9/2023 3:05:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ExamBatch](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[courseID] [char](20) NULL,
	[code] [nvarchar](50) NULL,
	[date] [datetime] NULL,
	[location] [nvarchar](100) NULL,
	[status] [bit] NULL,
 CONSTRAINT [PK__ExamBatc__3214EC27C001677D] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Examiner]    Script Date: 11/9/2023 3:05:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Examiner](
	[ID] [char](20) NOT NULL,
	[name] [nvarchar](50) NULL,
	[email] [varchar](50) NULL,
	[experienceYears] [int] NULL,
	[specialization] [nvarchar](100) NULL,
	[status] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Examiner_In_Semeter]    Script Date: 11/9/2023 3:05:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Examiner_In_Semeter](
	[ID] [char](20) NOT NULL,
	[examinerID] [char](20) NULL,
	[semeterID] [char](20) NULL,
	[totalSlot] [int] NULL,
	[minSot] [int] NULL,
	[maxSlot] [int] NULL,
	[status] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ExamRoom]    Script Date: 11/9/2023 3:05:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ExamRoom](
	[ID] [char](20) NOT NULL,
	[classRoomID] [char](20) NULL,
	[examSlotID] [char](20) NULL,
	[subjectID] [char](20) NULL,
	[examinerID] [char](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ExamSlot]    Script Date: 11/9/2023 3:05:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ExamSlot](
	[ID] [char](20) NOT NULL,
	[examBatchID] [int] NULL,
	[startTime] [datetime] NULL,
	[endTime] [datetime] NULL,
	[quantity] [int] NULL,
	[status] [bit] NULL,
 CONSTRAINT [PK__ExamSlot__3214EC27822D2CC1] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Register]    Script Date: 11/9/2023 3:05:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Register](
	[examinerID] [char](20) NOT NULL,
	[examSlotID] [char](20) NOT NULL,
	[status] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[examinerID] ASC,
	[examSlotID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Semester]    Script Date: 11/9/2023 3:05:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Semester](
	[ID] [char](20) NOT NULL,
	[code] [nvarchar](50) NULL,
	[name] [nvarchar](100) NULL,
	[year] [int] NULL,
	[startDate] [datetime] NULL,
	[endDate] [datetime] NULL,
	[status] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Stu_ExamRoom]    Script Date: 11/9/2023 3:05:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Stu_ExamRoom](
	[studentID] [char](20) NOT NULL,
	[examRoomID] [char](20) NOT NULL,
	[status] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[studentID] ASC,
	[examRoomID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Student]    Script Date: 11/9/2023 3:05:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Student](
	[ID] [char](20) NOT NULL,
	[name] [nvarchar](50) NULL,
	[email] [varchar](50) NULL,
	[dateOfBirth] [date] NULL,
	[major] [nvarchar](50) NULL,
	[yearOfStudy] [nvarchar](50) NULL,
	[status] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Student_In_Course]    Script Date: 11/9/2023 3:05:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Student_In_Course](
	[studentID] [char](20) NOT NULL,
	[courseID] [char](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[courseID] ASC,
	[studentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Subject]    Script Date: 11/9/2023 3:05:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Subject](
	[ID] [char](20) NOT NULL,
	[code] [nvarchar](50) NULL,
	[name] [nvarchar](100) NULL,
	[credit] [int] NULL,
	[status] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Subject_Slot]    Script Date: 11/9/2023 3:05:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Subject_Slot](
	[subjectID] [char](20) NOT NULL,
	[examSlotID] [char](20) NOT NULL,
	[status] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[subjectID] ASC,
	[examSlotID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 11/9/2023 3:05:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[ID] [char](30) NOT NULL,
	[userName] [nvarchar](50) NULL,
	[email] [char](40) NULL,
	[Role] [char](30) NULL,
	[status] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[Classroom] ([ID], [code], [building], [floor], [type], [capacity], [status]) VALUES (N'P001                ', N'P001', N'FPTU', 0, N'Classroom', 25, 0)
INSERT [dbo].[Classroom] ([ID], [code], [building], [floor], [type], [capacity], [status]) VALUES (N'P004                ', N'P004', N'FPTU', 1, N'Classroom', 30, 0)
INSERT [dbo].[Classroom] ([ID], [code], [building], [floor], [type], [capacity], [status]) VALUES (N'P006                ', N'P006', N'FPTU', 0, N'Classroom', 25, 0)
INSERT [dbo].[Classroom] ([ID], [code], [building], [floor], [type], [capacity], [status]) VALUES (N'P007                ', N'P007', N'FPTU', 0, N'Classroom', 25, 1)
INSERT [dbo].[Classroom] ([ID], [code], [building], [floor], [type], [capacity], [status]) VALUES (N'P010                ', N'P010', N'FPTU', 0, N'Classroom', 25, 1)
INSERT [dbo].[Classroom] ([ID], [code], [building], [floor], [type], [capacity], [status]) VALUES (N'P011                ', N'P011', N'FPTU', 0, N'Classroom', 25, 1)
INSERT [dbo].[Classroom] ([ID], [code], [building], [floor], [type], [capacity], [status]) VALUES (N'P012                ', N'P012', N'FPTU', 0, N'Classroom', 25, 1)
INSERT [dbo].[Classroom] ([ID], [code], [building], [floor], [type], [capacity], [status]) VALUES (N'P014                ', N'P014', N'FPTU', 0, N'ClassRoom', 25, 1)
INSERT [dbo].[Classroom] ([ID], [code], [building], [floor], [type], [capacity], [status]) VALUES (N'P015                ', N'P015', N'FPTU', 0, N'ClassRoom', 25, 1)
INSERT [dbo].[Classroom] ([ID], [code], [building], [floor], [type], [capacity], [status]) VALUES (N'P016                ', N'P016', N'FPTU', 0, N'ClassRoom', 25, 1)
INSERT [dbo].[Classroom] ([ID], [code], [building], [floor], [type], [capacity], [status]) VALUES (N'P018                ', N'P017', N'FPTU', 1, N'Classroom', 30, 1)
INSERT [dbo].[Classroom] ([ID], [code], [building], [floor], [type], [capacity], [status]) VALUES (N'P019                ', N'P019', N'FPTU', 1, N'Classroom', 30, 1)
GO
INSERT [dbo].[Course] ([ID], [subjectID], [semesterID], [name], [instructor], [status]) VALUES (N'1                   ', N'CSI104              ', N'SU25                ', N'Khoa 1', N'T?ng Quang Hi?u     ', 1)
INSERT [dbo].[Course] ([ID], [subjectID], [semesterID], [name], [instructor], [status]) VALUES (N'C001                ', N'ACC101              ', N'FA23                ', N'Principle Accounting - FA23 - SAP1701', N'Chautn              ', 1)
INSERT [dbo].[Course] ([ID], [subjectID], [semesterID], [name], [instructor], [status]) VALUES (N'C002                ', N'ENM301              ', N'SU25                ', N'Business English', N'V? Th? Thùy D??ng   ', 1)
INSERT [dbo].[Course] ([ID], [subjectID], [semesterID], [name], [instructor], [status]) VALUES (N'C004                ', N'ECO201              ', N'SU25                ', N'International Economics', N'Tr?n Ng?c Châu      ', 1)
INSERT [dbo].[Course] ([ID], [subjectID], [semesterID], [name], [instructor], [status]) VALUES (N'C005                ', N'LAB211              ', N'SU25                ', N'OOP with Java Lab', N'Thân Th? Ng?c Vân   ', 1)
INSERT [dbo].[Course] ([ID], [subjectID], [semesterID], [name], [instructor], [status]) VALUES (N'C006                ', N'LAB211              ', N'SU25                ', N'OOP with Java Lab', N'Thân Van S?         ', 1)
INSERT [dbo].[Course] ([ID], [subjectID], [semesterID], [name], [instructor], [status]) VALUES (N'C007                ', N'PRJ301              ', N'SU25                ', N'Java Web application development', N'T?ng Quang Hi?u     ', 1)
INSERT [dbo].[Course] ([ID], [subjectID], [semesterID], [name], [instructor], [status]) VALUES (N'C009                ', N'MAS291              ', N'SU25                ', N'Probability & statistics', N'Nguy?n Th? Hoàng    ', 1)
INSERT [dbo].[Course] ([ID], [subjectID], [semesterID], [name], [instructor], [status]) VALUES (N'C010                ', N'SWT301              ', N'SU25                ', N'Software Testing', N'Nguy?n Th? Hoàng    ', 1)
INSERT [dbo].[Course] ([ID], [subjectID], [semesterID], [name], [instructor], [status]) VALUES (N'C011                ', N'SWP391              ', N'SU25                ', N'Sofware developement project', N'Lâm H?u Khánh Ph??ng', 1)
INSERT [dbo].[Course] ([ID], [subjectID], [semesterID], [name], [instructor], [status]) VALUES (N'C013                ', N'IOT102              ', N'SU25                ', N'Internet of Things', N'T?ng Quang Hi?u     ', 0)
INSERT [dbo].[Course] ([ID], [subjectID], [semesterID], [name], [instructor], [status]) VALUES (N'C014                ', N'SWP391              ', N'SU25                ', N'Sofware developement project', N'T?ng Quang Hi?u     ', 1)
GO
SET IDENTITY_INSERT [dbo].[Department] ON 

INSERT [dbo].[Department] ([examinerID], [name], [examinerType], [faculty], [location], [phone], [status], [departmentID]) VALUES (N'E001                ', N'Ðào Nguyễn Huy Nhân', N'Lecture             ', N'Information Technology', N'P701, FPTU Campus', N'0983427546     ', 1, 1)
INSERT [dbo].[Department] ([examinerID], [name], [examinerType], [faculty], [location], [phone], [status], [departmentID]) VALUES (N'EX123               ', N'Trần Công Đời', N'Lecture             ', N'Information Technology', N'P701 FPTU Campus', N'0123456        ', 1, 2)
INSERT [dbo].[Department] ([examinerID], [name], [examinerType], [faculty], [location], [phone], [status], [departmentID]) VALUES (N'EX124               ', N'Đỗ Tấn Nhàn', N'Lecture             ', N'Information Technology', N'P702, FPTU Campus', N'098342444546   ', 1, 3)
INSERT [dbo].[Department] ([examinerID], [name], [examinerType], [faculty], [location], [phone], [status], [departmentID]) VALUES (N'EX392               ', N'Trần Ngọc Châu', N'Lecture             ', N'Information Technology', N'P703, FPTU Campus', N'0983667546     ', 1, 4)
INSERT [dbo].[Department] ([examinerID], [name], [examinerType], [faculty], [location], [phone], [status], [departmentID]) VALUES (N'EX412               ', N'Tang Quang Hiếu', N'Lecture             ', N'Information Technology', N'P704, FPTU Campus', N'0333427546     ', 1, 5)
INSERT [dbo].[Department] ([examinerID], [name], [examinerType], [faculty], [location], [phone], [status], [departmentID]) VALUES (N'EX165               ', N'Lâm Hữu Khánh Phương', N'Lecture             ', N'Information Technology', N'P601, FPTU Campus', N'0223427546     ', 1, 6)
INSERT [dbo].[Department] ([examinerID], [name], [examinerType], [faculty], [location], [phone], [status], [departmentID]) VALUES (N'EX454               ', N'Thân Thị Ngọc Vân', N'Lecture             ', N'Information Technology', N'P501, FPTU Campus', N'0985527546     ', 1, 7)
INSERT [dbo].[Department] ([examinerID], [name], [examinerType], [faculty], [location], [phone], [status], [departmentID]) VALUES (N'EX752               ', N'Vũ Thị Thùy Dương', N'Lecture             ', N'Information Technology', N'P401, FPTU Campus', N'0988827546     ', 1, 8)
INSERT [dbo].[Department] ([examinerID], [name], [examinerType], [faculty], [location], [phone], [status], [departmentID]) VALUES (N'EX752               ', N'Vũ Thị Thùy Dương', N'Lecture             ', N'Information Technology', N'P401, FPTU Campus', N'0988827546     ', 1, 9)
INSERT [dbo].[Department] ([examinerID], [name], [examinerType], [faculty], [location], [phone], [status], [departmentID]) VALUES (N'EX489               ', N'Thân Văn Sử', N'Lecture             ', N'Information Technology', N'P301, FPTU Campus', N'0983427599     ', 1, 10)
INSERT [dbo].[Department] ([examinerID], [name], [examinerType], [faculty], [location], [phone], [status], [departmentID]) VALUES (N'EX248               ', N'Nguyễn Thế Hoàng', N'Lecture             ', N'Information Technology', N'P201, FPTU Campus', N'0983427546     ', 1, 11)
INSERT [dbo].[Department] ([examinerID], [name], [examinerType], [faculty], [location], [phone], [status], [departmentID]) VALUES (N'EX125               ', N'Nguyễn Minh Sang', N'Lecture             ', N'Information Technology', N'P202, FPTU Campus', N'0989927546     ', 1, 12)
INSERT [dbo].[Department] ([examinerID], [name], [examinerType], [faculty], [location], [phone], [status], [departmentID]) VALUES (N'EX126               ', N'Hồ Hoàn Kiếm', N'Lecture             ', N'Information Tecnology', N'P234 FPTU Campus', N'01245678       ', 1, 13)
INSERT [dbo].[Department] ([examinerID], [name], [examinerType], [faculty], [location], [phone], [status], [departmentID]) VALUES (N'EX181               ', N'Lê Nguyễn Bảo Ngọc', N'Lecture             ', N'Information Technology', N'P762, FPTU Campus', N'0326548580     ', 0, 18)
SET IDENTITY_INSERT [dbo].[Department] OFF
GO
SET IDENTITY_INSERT [dbo].[ExamBatch] ON 

INSERT [dbo].[ExamBatch] ([ID], [courseID], [code], [date], [location], [status]) VALUES (1, N'C002                ', N'JS1701', CAST(N'1900-01-01T00:00:00.000' AS DateTime), N'FPTU', 0)
INSERT [dbo].[ExamBatch] ([ID], [courseID], [code], [date], [location], [status]) VALUES (2, N'C002                ', N'JS1702', CAST(N'1900-01-01T00:00:00.000' AS DateTime), N'FPTU', 1)
INSERT [dbo].[ExamBatch] ([ID], [courseID], [code], [date], [location], [status]) VALUES (3, N'C002                ', N'JS1703', CAST(N'1900-01-01T00:00:00.000' AS DateTime), N'FPTU', 1)
INSERT [dbo].[ExamBatch] ([ID], [courseID], [code], [date], [location], [status]) VALUES (4, N'C004                ', N'JS1704', CAST(N'1900-01-01T00:00:00.000' AS DateTime), N'FPTU', 1)
INSERT [dbo].[ExamBatch] ([ID], [courseID], [code], [date], [location], [status]) VALUES (5, N'C005                ', N'JS1705', CAST(N'1900-01-01T00:00:00.000' AS DateTime), N'FPTU', 1)
INSERT [dbo].[ExamBatch] ([ID], [courseID], [code], [date], [location], [status]) VALUES (6, N'C006                ', N'JS1706', CAST(N'1900-01-01T00:00:00.000' AS DateTime), N'FPTU', 1)
INSERT [dbo].[ExamBatch] ([ID], [courseID], [code], [date], [location], [status]) VALUES (7, N'C007                ', N'JS1707', CAST(N'1900-01-01T00:00:00.000' AS DateTime), N'FPTU', 1)
INSERT [dbo].[ExamBatch] ([ID], [courseID], [code], [date], [location], [status]) VALUES (8, N'C009                ', N'JS1708', CAST(N'1900-01-01T00:00:00.000' AS DateTime), N'FPTU', 1)
INSERT [dbo].[ExamBatch] ([ID], [courseID], [code], [date], [location], [status]) VALUES (9, N'C009                ', N'JS1709', CAST(N'1900-01-01T00:00:00.000' AS DateTime), N'FPTU', 1)
INSERT [dbo].[ExamBatch] ([ID], [courseID], [code], [date], [location], [status]) VALUES (10, N'C010                ', N'JS1710', CAST(N'1900-01-01T00:00:00.000' AS DateTime), N'FPTU', 1)
INSERT [dbo].[ExamBatch] ([ID], [courseID], [code], [date], [location], [status]) VALUES (11, N'C013                ', N'JS1770', CAST(N'2023-12-25T07:30:00.000' AS DateTime), N'FPTU', 1)
INSERT [dbo].[ExamBatch] ([ID], [courseID], [code], [date], [location], [status]) VALUES (12, N'C010                ', N'JS1770', CAST(N'2023-12-25T07:30:00.000' AS DateTime), N'FPTU', 1)
INSERT [dbo].[ExamBatch] ([ID], [courseID], [code], [date], [location], [status]) VALUES (13, N'C011                ', N'2023-12-26T07:30:00.000Z', CAST(N'2023-12-26T07:30:00.000' AS DateTime), N'FPTU', 1)
INSERT [dbo].[ExamBatch] ([ID], [courseID], [code], [date], [location], [status]) VALUES (14, N'C001                ', N'JS1764', CAST(N'2023-11-21T09:00:00.000' AS DateTime), N'FPTU', 1)
INSERT [dbo].[ExamBatch] ([ID], [courseID], [code], [date], [location], [status]) VALUES (15, N'C010                ', N'JS1769', CAST(N'2023-12-25T07:30:00.000' AS DateTime), N'FPTU', 1)
INSERT [dbo].[ExamBatch] ([ID], [courseID], [code], [date], [location], [status]) VALUES (16, N'C004                ', N'JS1111', CAST(N'2023-11-30T07:00:00.000' AS DateTime), N'FPTU', 1)
INSERT [dbo].[ExamBatch] ([ID], [courseID], [code], [date], [location], [status]) VALUES (17, N'C004                ', N'JS1111', CAST(N'2023-11-30T07:00:00.000' AS DateTime), N'FPTU', 1)
INSERT [dbo].[ExamBatch] ([ID], [courseID], [code], [date], [location], [status]) VALUES (18, N'C004                ', N'JS1112', CAST(N'2023-11-30T07:00:00.000' AS DateTime), N'FPTU', 1)
INSERT [dbo].[ExamBatch] ([ID], [courseID], [code], [date], [location], [status]) VALUES (19, N'C007                ', N'JS1113', CAST(N'2023-11-28T06:46:00.000' AS DateTime), N'FPTU', 1)
INSERT [dbo].[ExamBatch] ([ID], [courseID], [code], [date], [location], [status]) VALUES (20, N'C006                ', N'JS1114', CAST(N'2023-11-11T06:49:00.000' AS DateTime), N'FPTU', 1)
INSERT [dbo].[ExamBatch] ([ID], [courseID], [code], [date], [location], [status]) VALUES (21, N'C009                ', N'JS1115', CAST(N'2023-11-22T05:50:00.000' AS DateTime), N'FPTU', 1)
INSERT [dbo].[ExamBatch] ([ID], [courseID], [code], [date], [location], [status]) VALUES (22, N'C005                ', N'JS1115', CAST(N'2023-11-27T05:53:00.000' AS DateTime), N'FPTU', 1)
INSERT [dbo].[ExamBatch] ([ID], [courseID], [code], [date], [location], [status]) VALUES (23, NULL, NULL, NULL, N'FPTU', 1)
INSERT [dbo].[ExamBatch] ([ID], [courseID], [code], [date], [location], [status]) VALUES (24, N'C013                ', N'JS1120', CAST(N'2023-11-14T07:56:00.000' AS DateTime), N'FPTU', 1)
INSERT [dbo].[ExamBatch] ([ID], [courseID], [code], [date], [location], [status]) VALUES (25, N'C006                ', N'JS1122', CAST(N'2023-11-30T05:54:00.000' AS DateTime), N'FPTU', 1)
INSERT [dbo].[ExamBatch] ([ID], [courseID], [code], [date], [location], [status]) VALUES (26, N'C009                ', N'JS11176', CAST(N'2023-11-28T08:51:00.000' AS DateTime), N'FPTU', 1)
INSERT [dbo].[ExamBatch] ([ID], [courseID], [code], [date], [location], [status]) VALUES (27, N'C013                ', N'JS1130', CAST(N'2023-11-25T09:31:00.000' AS DateTime), N'FPTU', 1)
INSERT [dbo].[ExamBatch] ([ID], [courseID], [code], [date], [location], [status]) VALUES (28, N'C001                ', N'JS1795', CAST(N'2023-11-20T03:18:00.000' AS DateTime), N'FPTU', 1)
INSERT [dbo].[ExamBatch] ([ID], [courseID], [code], [date], [location], [status]) VALUES (29, N'C005                ', N'Testcase1', CAST(N'2023-11-21T20:16:00.000' AS DateTime), N'FPTU', 1)
INSERT [dbo].[ExamBatch] ([ID], [courseID], [code], [date], [location], [status]) VALUES (30, N'C014                ', N'NguyenHuyKhai', CAST(N'2023-11-30T05:20:00.000' AS DateTime), N'FPTU', 1)
INSERT [dbo].[ExamBatch] ([ID], [courseID], [code], [date], [location], [status]) VALUES (31, N'C001                ', N'Testcase2222', CAST(N'2023-11-30T07:41:00.000' AS DateTime), N'FPTU', 1)
SET IDENTITY_INSERT [dbo].[ExamBatch] OFF
GO
INSERT [dbo].[Examiner] ([ID], [name], [email], [experienceYears], [specialization], [status]) VALUES (N'E001                ', N'Ðào Nguyễn Huy Nhân', N'nhandnhse171010@fpt.edu.vn', 3, N'Infomation Technology', 1)
INSERT [dbo].[Examiner] ([ID], [name], [email], [experienceYears], [specialization], [status]) VALUES (N'EX123               ', N'Trần Công Đời', N'Doictex123@fe.edu.vn', 7, N'Infomation Technology', 1)
INSERT [dbo].[Examiner] ([ID], [name], [email], [experienceYears], [specialization], [status]) VALUES (N'EX124               ', N'Đỗ Tấn Nhàn', N'Nhandtex124@fe.edu.vn', 10, N'Infomation Technology', 1)
INSERT [dbo].[Examiner] ([ID], [name], [email], [experienceYears], [specialization], [status]) VALUES (N'EX125               ', N'Nguyễn Minh Sang', N'Sangntex125@fe.edu.vn', 9, N'Infomation Technology', 1)
INSERT [dbo].[Examiner] ([ID], [name], [email], [experienceYears], [specialization], [status]) VALUES (N'EX126               ', N'Hồ Hoàn Kiếm', N'Kiemhhex126@fe.edu.vn', 7, N'Infomation Technology', 1)
INSERT [dbo].[Examiner] ([ID], [name], [email], [experienceYears], [specialization], [status]) VALUES (N'EX165               ', N'Lâm Hữu Khánh Phươnng', N'phuonglhkex165@fe.edu.vn', 15, N'Infomation Technology', 1)
INSERT [dbo].[Examiner] ([ID], [name], [email], [experienceYears], [specialization], [status]) VALUES (N'EX181               ', N'Lê Nguyễn Bảo Ngọc', N'TruongIT2002@gmail.com', 5, N'Distribution management', 1)
INSERT [dbo].[Examiner] ([ID], [name], [email], [experienceYears], [specialization], [status]) VALUES (N'EX202               ', N'Đinh Gia Bảo', N'baoit2002@gmail.com', 4, N'Software Engineer', 1)
INSERT [dbo].[Examiner] ([ID], [name], [email], [experienceYears], [specialization], [status]) VALUES (N'EX248               ', N'Nguyễn Thế Hoàng', N'hoangntex248@fe.edu.vn', 7, N'Infomation Technology', 1)
INSERT [dbo].[Examiner] ([ID], [name], [email], [experienceYears], [specialization], [status]) VALUES (N'EX392               ', N'Trần Ngọc Châu', N'chautnex392@fe.edu.vn', 13, N'Infomation Technology', 1)
INSERT [dbo].[Examiner] ([ID], [name], [email], [experienceYears], [specialization], [status]) VALUES (N'EX412               ', N'Tăng Quang Hiếu', N'hieutqex412@fe.edu.vn', 5, N'Infomation Technology', 1)
INSERT [dbo].[Examiner] ([ID], [name], [email], [experienceYears], [specialization], [status]) VALUES (N'EX454               ', N'Thân Thị Ngọc Vân', N'vanttnex454@fe.edu.vn', 10, N'Infomation Technology', 1)
INSERT [dbo].[Examiner] ([ID], [name], [email], [experienceYears], [specialization], [status]) VALUES (N'EX489               ', N'Thân Van Sử', N'Sutvex489@fe.edu.vn', 15, N'Infomation Technology', 1)
INSERT [dbo].[Examiner] ([ID], [name], [email], [experienceYears], [specialization], [status]) VALUES (N'EX752               ', N'Vũ Thị Thùy Dương', N'duongvttex752@fe.edu.vn', 10, N'Infomation Technology', 1)
INSERT [dbo].[Examiner] ([ID], [name], [email], [experienceYears], [specialization], [status]) VALUES (N'EX753               ', N'Khải', N'khainhse161766@fpt.edu.vn               ', 0, N'No information yet', 1)
GO
INSERT [dbo].[Examiner_In_Semeter] ([ID], [examinerID], [semeterID], [totalSlot], [minSot], [maxSlot], [status]) VALUES (N'I001                ', N'EX165               ', N'SU25                ', 25, 5, 15, 1)
INSERT [dbo].[Examiner_In_Semeter] ([ID], [examinerID], [semeterID], [totalSlot], [minSot], [maxSlot], [status]) VALUES (N'I002                ', N'EX248               ', N'FA23                ', 25, 5, 15, 1)
INSERT [dbo].[Examiner_In_Semeter] ([ID], [examinerID], [semeterID], [totalSlot], [minSot], [maxSlot], [status]) VALUES (N'I003                ', N'EX165               ', N'FA23                ', 25, 5, 15, 1)
INSERT [dbo].[Examiner_In_Semeter] ([ID], [examinerID], [semeterID], [totalSlot], [minSot], [maxSlot], [status]) VALUES (N'I004                ', N'EX165               ', N'FA23                ', 25, 5, 15, 1)
INSERT [dbo].[Examiner_In_Semeter] ([ID], [examinerID], [semeterID], [totalSlot], [minSot], [maxSlot], [status]) VALUES (N'I005                ', N'EX392               ', N'FA23                ', 25, 5, 15, 1)
INSERT [dbo].[Examiner_In_Semeter] ([ID], [examinerID], [semeterID], [totalSlot], [minSot], [maxSlot], [status]) VALUES (N'I006                ', N'EX392               ', N'FA23                ', 25, 5, 15, 1)
INSERT [dbo].[Examiner_In_Semeter] ([ID], [examinerID], [semeterID], [totalSlot], [minSot], [maxSlot], [status]) VALUES (N'I007                ', N'EX412               ', N'FA23                ', 25, 5, 15, 1)
INSERT [dbo].[Examiner_In_Semeter] ([ID], [examinerID], [semeterID], [totalSlot], [minSot], [maxSlot], [status]) VALUES (N'I008                ', N'EX752               ', N'FA23                ', 25, 5, 15, 1)
INSERT [dbo].[Examiner_In_Semeter] ([ID], [examinerID], [semeterID], [totalSlot], [minSot], [maxSlot], [status]) VALUES (N'I009                ', N'EX752               ', N'FA23                ', 25, 5, 15, 1)
INSERT [dbo].[Examiner_In_Semeter] ([ID], [examinerID], [semeterID], [totalSlot], [minSot], [maxSlot], [status]) VALUES (N'I010                ', N'EX454               ', N'FA23                ', 25, 5, 15, 1)
INSERT [dbo].[Examiner_In_Semeter] ([ID], [examinerID], [semeterID], [totalSlot], [minSot], [maxSlot], [status]) VALUES (N'I011                ', N'EX454               ', N'FA23                ', 25, 5, 15, 1)
GO
INSERT [dbo].[ExamRoom] ([ID], [classRoomID], [examSlotID], [subjectID], [examinerID]) VALUES (N'R001                ', N'P001                ', N'Q001                ', N'SWE201c             ', N'EX489               ')
INSERT [dbo].[ExamRoom] ([ID], [classRoomID], [examSlotID], [subjectID], [examinerID]) VALUES (N'R003                ', N'P006                ', N'Q002                ', N'PRJ301              ', N'EX123               ')
INSERT [dbo].[ExamRoom] ([ID], [classRoomID], [examSlotID], [subjectID], [examinerID]) VALUES (N'R004                ', N'P007                ', N'Q004                ', N'SWT301              ', N'EX124               ')
INSERT [dbo].[ExamRoom] ([ID], [classRoomID], [examSlotID], [subjectID], [examinerID]) VALUES (N'R005                ', N'P010                ', N'Q005                ', N'CSD201              ', N'EX489               ')
INSERT [dbo].[ExamRoom] ([ID], [classRoomID], [examSlotID], [subjectID], [examinerID]) VALUES (N'R006                ', N'P011                ', N'Q006                ', N'DBI202              ', N'EX126               ')
INSERT [dbo].[ExamRoom] ([ID], [classRoomID], [examSlotID], [subjectID], [examinerID]) VALUES (N'R007                ', N'P012                ', N'Q007                ', N'WED201c             ', N'EX165               ')
INSERT [dbo].[ExamRoom] ([ID], [classRoomID], [examSlotID], [subjectID], [examinerID]) VALUES (N'R008                ', N'P014                ', N'Q008                ', N'IOT102              ', N'EX248               ')
INSERT [dbo].[ExamRoom] ([ID], [classRoomID], [examSlotID], [subjectID], [examinerID]) VALUES (N'R009                ', N'P015                ', N'Q009                ', N'MAS291              ', N'EX392               ')
INSERT [dbo].[ExamRoom] ([ID], [classRoomID], [examSlotID], [subjectID], [examinerID]) VALUES (N'R010                ', N'P016                ', N'Q010                ', N'SWR302              ', N'EX489               ')
INSERT [dbo].[ExamRoom] ([ID], [classRoomID], [examSlotID], [subjectID], [examinerID]) VALUES (N'R011                ', N'P001                ', N'Q006                ', N'SWT301              ', N'EX489               ')
INSERT [dbo].[ExamRoom] ([ID], [classRoomID], [examSlotID], [subjectID], [examinerID]) VALUES (N'R012                ', N'P001                ', N'Q024                ', N'ACC101              ', N'EX489               ')
INSERT [dbo].[ExamRoom] ([ID], [classRoomID], [examSlotID], [subjectID], [examinerID]) VALUES (N'R013                ', N'P001                ', N'Q038                ', N'ACC101              ', N'EX489               ')
INSERT [dbo].[ExamRoom] ([ID], [classRoomID], [examSlotID], [subjectID], [examinerID]) VALUES (N'R014                ', N'P010                ', N'Q040                ', N'SWP391              ', N'EX753               ')
INSERT [dbo].[ExamRoom] ([ID], [classRoomID], [examSlotID], [subjectID], [examinerID]) VALUES (N'R015                ', N'P010                ', N'Q041                ', N'ACC101              ', N'EX753               ')
GO
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q001                ', 1, CAST(N'2023-10-12T10:30:00.000' AS DateTime), CAST(N'2023-10-12T11:30:00.000' AS DateTime), 5, 0)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q002                ', 2, CAST(N'2023-10-12T07:30:00.000' AS DateTime), CAST(N'2023-10-12T09:00:00.000' AS DateTime), 5, 1)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q003                ', 3, CAST(N'2023-11-12T10:30:00.000' AS DateTime), CAST(N'2023-11-12T11:30:00.000' AS DateTime), 1, 1)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q004                ', 3, CAST(N'2023-11-12T10:30:00.000' AS DateTime), CAST(N'2023-11-12T11:30:00.000' AS DateTime), 1, 0)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q005                ', 4, CAST(N'2023-12-12T17:30:00.000' AS DateTime), CAST(N'2023-12-12T19:30:00.000' AS DateTime), 1, 1)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q006                ', 4, CAST(N'2023-12-12T11:30:00.000' AS DateTime), CAST(N'2023-12-12T14:30:00.000' AS DateTime), 5, 1)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q007                ', 5, CAST(N'2023-12-13T07:30:00.000' AS DateTime), CAST(N'2023-12-13T09:00:00.000' AS DateTime), 1, 1)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q008                ', 5, CAST(N'2023-12-13T10:30:00.000' AS DateTime), CAST(N'2023-12-13T11:30:00.000' AS DateTime), 1, 1)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q009                ', 6, CAST(N'2022-12-14T10:30:00.000' AS DateTime), CAST(N'2022-12-14T11:30:00.000' AS DateTime), 1, 1)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q010                ', 6, CAST(N'2023-12-14T07:30:00.000' AS DateTime), CAST(N'2023-12-14T09:00:00.000' AS DateTime), 1, 1)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q011                ', 7, CAST(N'2023-12-15T10:30:00.000' AS DateTime), CAST(N'2023-12-15T11:30:00.000' AS DateTime), 5, 1)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q012                ', 7, CAST(N'2023-12-15T07:30:00.000' AS DateTime), CAST(N'2023-12-15T09:00:00.000' AS DateTime), 5, 1)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q013                ', 8, CAST(N'2023-12-12T07:30:00.000' AS DateTime), CAST(N'2023-12-12T09:00:00.000' AS DateTime), 5, 1)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q014                ', 9, CAST(N'2023-12-12T10:30:00.000' AS DateTime), CAST(N'2023-12-12T11:30:00.000' AS DateTime), 1, 1)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q015                ', 9, CAST(N'2023-12-13T11:30:00.000' AS DateTime), CAST(N'2023-12-13T14:30:00.000' AS DateTime), 1, 1)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q016                ', 10, CAST(N'2023-12-13T15:30:00.000' AS DateTime), CAST(N'2023-12-13T17:00:00.000' AS DateTime), 1, 0)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q017                ', 10, CAST(N'2023-12-13T17:30:00.000' AS DateTime), CAST(N'2023-12-13T19:00:00.000' AS DateTime), 1, 1)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q020                ', 2, CAST(N'2023-12-25T07:30:00.000' AS DateTime), CAST(N'2023-12-25T09:00:00.000' AS DateTime), 0, 0)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q021                ', 11, CAST(N'2023-12-25T09:00:00.000' AS DateTime), CAST(N'2023-12-25T10:30:00.000' AS DateTime), 0, 0)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q022                ', 12, CAST(N'2023-12-26T07:30:00.000' AS DateTime), CAST(N'2023-12-26T09:30:00.000' AS DateTime), 10, 0)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q023                ', 13, CAST(N'2023-12-25T03:30:00.000' AS DateTime), CAST(N'2023-12-25T05:00:00.000' AS DateTime), 0, 0)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q024                ', 14, CAST(N'2022-11-21T09:00:00.000' AS DateTime), CAST(N'2022-11-21T11:30:00.000' AS DateTime), 0, 0)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q025                ', 15, CAST(N'2023-12-25T07:30:00.000' AS DateTime), CAST(N'2023-12-25T09:00:00.000' AS DateTime), 0, 0)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q026                ', 16, CAST(N'2023-11-30T07:00:00.000' AS DateTime), CAST(N'2023-11-30T09:30:00.000' AS DateTime), 0, 0)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q027                ', 17, CAST(N'2023-11-30T07:00:00.000' AS DateTime), CAST(N'2023-11-30T09:30:00.000' AS DateTime), 0, 0)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q028                ', 18, CAST(N'2023-11-30T07:00:00.000' AS DateTime), CAST(N'2023-11-30T09:30:00.000' AS DateTime), 0, 0)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q029                ', 19, CAST(N'2023-11-28T06:46:00.000' AS DateTime), CAST(N'2023-11-28T09:46:00.000' AS DateTime), 0, 0)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q030                ', 20, CAST(N'2023-11-11T06:49:00.000' AS DateTime), CAST(N'2023-11-11T09:49:00.000' AS DateTime), 0, 0)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q031                ', 21, CAST(N'2023-11-22T05:50:00.000' AS DateTime), CAST(N'2023-11-22T07:50:00.000' AS DateTime), 0, 0)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q032                ', 22, CAST(N'2023-11-27T05:53:00.000' AS DateTime), CAST(N'2023-11-27T08:53:00.000' AS DateTime), 0, 0)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q033                ', 23, NULL, NULL, 0, 0)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q034                ', 24, CAST(N'2023-11-14T07:56:00.000' AS DateTime), CAST(N'2023-11-14T08:56:00.000' AS DateTime), 0, 0)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q035                ', 25, CAST(N'2023-11-30T05:54:00.000' AS DateTime), CAST(N'2023-11-30T09:54:00.000' AS DateTime), 0, 0)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q036                ', 26, CAST(N'2023-11-28T08:51:00.000' AS DateTime), CAST(N'2023-11-28T10:51:00.000' AS DateTime), 0, 0)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q037                ', 27, CAST(N'2023-11-25T09:31:00.000' AS DateTime), CAST(N'2023-11-25T11:31:00.000' AS DateTime), 0, 0)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q038                ', 28, CAST(N'2022-11-20T03:18:00.000' AS DateTime), CAST(N'2022-11-20T07:18:00.000' AS DateTime), 0, 1)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q039                ', 29, CAST(N'2023-11-21T20:16:00.000' AS DateTime), CAST(N'2023-11-21T22:16:00.000' AS DateTime), 5, 1)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q040                ', 30, CAST(N'2023-11-30T05:20:00.000' AS DateTime), CAST(N'2023-11-30T07:18:00.000' AS DateTime), 5, 1)
INSERT [dbo].[ExamSlot] ([ID], [examBatchID], [startTime], [endTime], [quantity], [status]) VALUES (N'Q041                ', 31, CAST(N'2023-11-30T07:41:00.000' AS DateTime), CAST(N'2023-11-30T09:42:00.000' AS DateTime), 5, 1)
GO
INSERT [dbo].[Register] ([examinerID], [examSlotID], [status]) VALUES (N'EX123               ', N'Q007                ', 0)
INSERT [dbo].[Register] ([examinerID], [examSlotID], [status]) VALUES (N'EX124               ', N'Q008                ', 1)
INSERT [dbo].[Register] ([examinerID], [examSlotID], [status]) VALUES (N'EX125               ', N'Q005                ', 0)
INSERT [dbo].[Register] ([examinerID], [examSlotID], [status]) VALUES (N'EX126               ', N'Q005                ', 0)
INSERT [dbo].[Register] ([examinerID], [examSlotID], [status]) VALUES (N'EX126               ', N'Q011                ', 1)
INSERT [dbo].[Register] ([examinerID], [examSlotID], [status]) VALUES (N'EX165               ', N'Q002                ', 1)
INSERT [dbo].[Register] ([examinerID], [examSlotID], [status]) VALUES (N'EX248               ', N'Q001                ', 1)
INSERT [dbo].[Register] ([examinerID], [examSlotID], [status]) VALUES (N'EX392               ', N'Q003                ', 1)
INSERT [dbo].[Register] ([examinerID], [examSlotID], [status]) VALUES (N'EX412               ', N'Q004                ', 1)
INSERT [dbo].[Register] ([examinerID], [examSlotID], [status]) VALUES (N'EX454               ', N'Q006                ', 1)
INSERT [dbo].[Register] ([examinerID], [examSlotID], [status]) VALUES (N'EX489               ', N'Q009                ', 1)
INSERT [dbo].[Register] ([examinerID], [examSlotID], [status]) VALUES (N'EX489               ', N'Q024                ', 1)
INSERT [dbo].[Register] ([examinerID], [examSlotID], [status]) VALUES (N'EX489               ', N'Q038                ', 1)
INSERT [dbo].[Register] ([examinerID], [examSlotID], [status]) VALUES (N'EX752               ', N'Q005                ', 1)
INSERT [dbo].[Register] ([examinerID], [examSlotID], [status]) VALUES (N'EX753               ', N'Q039                ', 1)
INSERT [dbo].[Register] ([examinerID], [examSlotID], [status]) VALUES (N'EX753               ', N'Q040                ', 1)
INSERT [dbo].[Register] ([examinerID], [examSlotID], [status]) VALUES (N'EX753               ', N'Q041                ', 1)
GO
INSERT [dbo].[Semester] ([ID], [code], [name], [year], [startDate], [endDate], [status]) VALUES (N'FA23                ', N'Fall_2023', N'Fall', 2022, CAST(N'2022-09-01T00:00:00.000' AS DateTime), CAST(N'2022-12-31T00:00:00.000' AS DateTime), 1)
INSERT [dbo].[Semester] ([ID], [code], [name], [year], [startDate], [endDate], [status]) VALUES (N'FA24                ', N'Fall_2024', N'Fall', 2024, CAST(N'2024-09-01T00:00:00.000' AS DateTime), CAST(N'2024-12-31T00:00:00.000' AS DateTime), 1)
INSERT [dbo].[Semester] ([ID], [code], [name], [year], [startDate], [endDate], [status]) VALUES (N'FA25                ', N'Fall_2025', N'Fall', 2025, CAST(N'2025-09-01T00:00:00.000' AS DateTime), CAST(N'2025-12-31T00:00:00.000' AS DateTime), 1)
INSERT [dbo].[Semester] ([ID], [code], [name], [year], [startDate], [endDate], [status]) VALUES (N'SP23                ', N'Spring_2023', N'Spring', 2023, CAST(N'2023-01-01T00:00:00.000' AS DateTime), CAST(N'2023-05-31T00:00:00.000' AS DateTime), 1)
INSERT [dbo].[Semester] ([ID], [code], [name], [year], [startDate], [endDate], [status]) VALUES (N'SP24                ', N'Spring_2024', N'Spring', 2024, CAST(N'2024-01-01T00:00:00.000' AS DateTime), CAST(N'2024-05-31T00:00:00.000' AS DateTime), 1)
INSERT [dbo].[Semester] ([ID], [code], [name], [year], [startDate], [endDate], [status]) VALUES (N'SP25                ', N'Spring_2025', N'Spring', 2025, CAST(N'2025-01-01T00:00:00.000' AS DateTime), CAST(N'2025-05-31T00:00:00.000' AS DateTime), 1)
INSERT [dbo].[Semester] ([ID], [code], [name], [year], [startDate], [endDate], [status]) VALUES (N'SU23                ', N'Summer_2023', N'Summer', 2023, CAST(N'2023-06-01T00:00:00.000' AS DateTime), CAST(N'2023-08-31T00:00:00.000' AS DateTime), 1)
INSERT [dbo].[Semester] ([ID], [code], [name], [year], [startDate], [endDate], [status]) VALUES (N'SU24                ', N'Summer_2024', N'Summer', 2024, CAST(N'2024-06-01T00:00:00.000' AS DateTime), CAST(N'2024-08-31T00:00:00.000' AS DateTime), 1)
INSERT [dbo].[Semester] ([ID], [code], [name], [year], [startDate], [endDate], [status]) VALUES (N'SU25                ', N'Summer_2025', N'Summer', 2025, CAST(N'2025-06-01T00:00:00.000' AS DateTime), CAST(N'2025-08-31T00:00:00.000' AS DateTime), 1)
GO
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE170525            ', N'R001                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE170525            ', N'R003                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE170525            ', N'R004                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE170525            ', N'R005                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE170525            ', N'R007                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE170525            ', N'R010                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE170525            ', N'R013                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE170525            ', N'R014                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE170525            ', N'R015                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE170540            ', N'R001                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE170540            ', N'R003                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE170540            ', N'R004                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE170540            ', N'R005                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE170540            ', N'R010                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE170540            ', N'R013                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE170540            ', N'R014                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE170540            ', N'R015                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE170545            ', N'R001                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE170545            ', N'R003                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE170545            ', N'R004                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE170545            ', N'R005                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE170545            ', N'R007                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE170545            ', N'R010                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE170545            ', N'R013                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE170545            ', N'R014                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE170545            ', N'R015                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE171010            ', N'R001                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE171010            ', N'R003                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE171010            ', N'R004                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE171010            ', N'R005                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE171010            ', N'R010                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE171010            ', N'R013                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE171010            ', N'R014                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE171010            ', N'R015                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE171018            ', N'R001                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE171018            ', N'R003                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE171018            ', N'R004                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE171018            ', N'R005                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE171018            ', N'R009                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE171018            ', N'R010                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE171018            ', N'R013                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE171018            ', N'R014                ', 1)
INSERT [dbo].[Stu_ExamRoom] ([studentID], [examRoomID], [status]) VALUES (N'SE171018            ', N'R015                ', 1)
GO
INSERT [dbo].[Student] ([ID], [name], [email], [dateOfBirth], [major], [yearOfStudy], [status]) VALUES (N'SE170525            ', N'Hoàng Khánh Duy', N'duyhkse170525@fpt.edu.vn', CAST(N'2003-09-15' AS Date), N'Sofware Engineer', N'2021', 1)
INSERT [dbo].[Student] ([ID], [name], [email], [dateOfBirth], [major], [yearOfStudy], [status]) VALUES (N'SE170540            ', N'Lương Phạm Việt Anh', N'anhlpvse170540@fpt.edu.vn', CAST(N'2003-10-14' AS Date), N'Sofware Engineer', N'2021', NULL)
INSERT [dbo].[Student] ([ID], [name], [email], [dateOfBirth], [major], [yearOfStudy], [status]) VALUES (N'SE170545            ', N'Nguyễn Quang Khánh', N'khanhnqse170545@fpt.edu.vn', CAST(N'2003-08-07' AS Date), N'Sofware Engineer', N'2021', 1)
INSERT [dbo].[Student] ([ID], [name], [email], [dateOfBirth], [major], [yearOfStudy], [status]) VALUES (N'SE171010            ', N'Ðào Nguyễn Huy Nhân', N'nhandnhse171010@fpt.edu.vn', CAST(N'2003-02-03' AS Date), N'Sofware Engineer', N'2021', 1)
INSERT [dbo].[Student] ([ID], [name], [email], [dateOfBirth], [major], [yearOfStudy], [status]) VALUES (N'SE171018            ', N'Ngô Gia Huấn', N'huanngse171018@fpt.edu.vn', CAST(N'2003-07-12' AS Date), N'Sofware Engineer', N'2021', 1)
GO
INSERT [dbo].[Student_In_Course] ([studentID], [courseID]) VALUES (N'SE170525            ', N'C007                ')
INSERT [dbo].[Student_In_Course] ([studentID], [courseID]) VALUES (N'SE170540            ', N'C007                ')
INSERT [dbo].[Student_In_Course] ([studentID], [courseID]) VALUES (N'SE170545            ', N'C007                ')
INSERT [dbo].[Student_In_Course] ([studentID], [courseID]) VALUES (N'SE171010            ', N'C007                ')
INSERT [dbo].[Student_In_Course] ([studentID], [courseID]) VALUES (N'SE171018            ', N'C007                ')
INSERT [dbo].[Student_In_Course] ([studentID], [courseID]) VALUES (N'SE170525            ', N'C009                ')
INSERT [dbo].[Student_In_Course] ([studentID], [courseID]) VALUES (N'SE170540            ', N'C009                ')
INSERT [dbo].[Student_In_Course] ([studentID], [courseID]) VALUES (N'SE170545            ', N'C009                ')
INSERT [dbo].[Student_In_Course] ([studentID], [courseID]) VALUES (N'SE171010            ', N'C009                ')
INSERT [dbo].[Student_In_Course] ([studentID], [courseID]) VALUES (N'SE171018            ', N'C009                ')
INSERT [dbo].[Student_In_Course] ([studentID], [courseID]) VALUES (N'SE170525            ', N'C010                ')
INSERT [dbo].[Student_In_Course] ([studentID], [courseID]) VALUES (N'SE170540            ', N'C010                ')
INSERT [dbo].[Student_In_Course] ([studentID], [courseID]) VALUES (N'SE170545            ', N'C010                ')
INSERT [dbo].[Student_In_Course] ([studentID], [courseID]) VALUES (N'SE171010            ', N'C010                ')
INSERT [dbo].[Student_In_Course] ([studentID], [courseID]) VALUES (N'SE171018            ', N'C010                ')
INSERT [dbo].[Student_In_Course] ([studentID], [courseID]) VALUES (N'SE170525            ', N'C011                ')
INSERT [dbo].[Student_In_Course] ([studentID], [courseID]) VALUES (N'SE170540            ', N'C011                ')
INSERT [dbo].[Student_In_Course] ([studentID], [courseID]) VALUES (N'SE170545            ', N'C011                ')
INSERT [dbo].[Student_In_Course] ([studentID], [courseID]) VALUES (N'SE171010            ', N'C011                ')
INSERT [dbo].[Student_In_Course] ([studentID], [courseID]) VALUES (N'SE171018            ', N'C011                ')
GO
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'ACC101              ', N'ACC101', N'Principles of Accounting', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'CEA201              ', N'CEA201', N'Computer Organization and Architecture', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'CSD201              ', N'CSD201', N'Data Structures and Algorithms', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'CSI104              ', N'CSI104', N'Introduction to computing', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'DBI202              ', N'DBI202', N'Database Systems', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'EAL201              ', N'EAL201', N'Academic Listening', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'EAW211              ', N'EAW211', N'English Academic Writing', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'EAW221              ', N'EAW221', N'English Academic Writing 2', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'ECB101              ', N'ECB101', N'Culture of English-Speaking Countries', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'ECC301c             ', N'ECC301c', N'Cross-cultural Communication', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'ECO121              ', N'ECO121', N'Macroeconomics', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'ECO201              ', N'ECO201', N'International Economics', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'ECR201              ', N'ECR201', N'Critical Reading', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'ENG302c             ', N'ENG302c', N'Advanced English Grammar', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'ENM301              ', N'ENM301', N'Business English', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'ENM401              ', N'ENM401', N'Business English', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'ENP102              ', N'ENP102', N'English phonetics and phonology in use', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'EPC301              ', N'EPC301', N'Persuasive Communication', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'ERW411              ', N'ERW411', N'Read Think Write 1', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'FIN202              ', N'FIN202', N'Principles of Corporate Finance', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'HRM201c             ', N'HRM201c', N'Human Resource Management', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'IBC201              ', N'IBC201', N'Cross Cultural Management and Negotiation', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'IBF301              ', N'IBF301', N'International Finance', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'IBI101              ', N'IBI101', N'Introduction to International Business', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'IBS301m             ', N'IBS301m', N'International Business Strategy', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'IEI301              ', N'IEI301', N'Import Export', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'IOT102              ', N'IOT102', N'Internet of Things', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'ITA203c             ', N'ITA203c', N'Management Information Systems', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'ITE302c             ', N'ITE302c', N'Ethics in IT', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'LAB211              ', N'LAB211', N'OOP with Java Lab', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'LAW102              ', N'LAW102', N'Business Law and Ethics Fundamentals', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'LIT301              ', N'LIT301', N'British & American Literature', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'LTG202              ', N'LTG202', N'Introduction to Linguistics', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'MAD101              ', N'MAD101', N'Discrete mathematics', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'MAE101              ', N'MAE101', N'Mathematics for Engineering', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'MAS202              ', N'MAS202', N'Applied Statistics for Business', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'MAS291              ', N'MAS291', N'Probability & statistics', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'MKT205c             ', N'MKT205c', N'International Marketing', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'NWC203c             ', N'NWC203c', N'Computer Networking', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'OBE102c             ', N'OBE102c', N'Organizational Behavior', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'OSG202              ', N'OSG202', N'Operating Systems', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'PRF192              ', N'PRF192', N'Programming Fundamentals', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'PRJ301              ', N'PRJ301', N'Java Web application development', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'PRO192              ', N'PRO192', N'Object-Oriented Programming', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'SCM201              ', N'SCM201', N'Supply Chain Management', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'SEM101              ', N'SEM101', N'Semantics', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'SSB201              ', N'SSB201', N'Advanced Business Communication', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'SSC302c             ', N'SSC302c', N'Advanced Presentation Skills', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'SWE201c             ', N'SWE201c', N'Introduction to Software Engineering', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'SWP391              ', N'SWP391', N'Software development project', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'SWR302              ', N'SWR302', N'Software Requirements', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'SWT301              ', N'SWT301', N'Software Testing', 3, 1)
INSERT [dbo].[Subject] ([ID], [code], [name], [credit], [status]) VALUES (N'WED201c             ', N'WED201c', N'Web Design', 3, 1)
GO
INSERT [dbo].[Subject_Slot] ([subjectID], [examSlotID], [status]) VALUES (N'ACC101              ', N'Q024                ', 1)
INSERT [dbo].[Subject_Slot] ([subjectID], [examSlotID], [status]) VALUES (N'ACC101              ', N'Q038                ', 1)
INSERT [dbo].[Subject_Slot] ([subjectID], [examSlotID], [status]) VALUES (N'ACC101              ', N'Q041                ', 1)
INSERT [dbo].[Subject_Slot] ([subjectID], [examSlotID], [status]) VALUES (N'CSD201              ', N'Q002                ', 1)
INSERT [dbo].[Subject_Slot] ([subjectID], [examSlotID], [status]) VALUES (N'DBI202              ', N'Q003                ', 1)
INSERT [dbo].[Subject_Slot] ([subjectID], [examSlotID], [status]) VALUES (N'ECO201              ', N'Q026                ', 1)
INSERT [dbo].[Subject_Slot] ([subjectID], [examSlotID], [status]) VALUES (N'ECO201              ', N'Q027                ', 1)
INSERT [dbo].[Subject_Slot] ([subjectID], [examSlotID], [status]) VALUES (N'ECO201              ', N'Q028                ', 1)
INSERT [dbo].[Subject_Slot] ([subjectID], [examSlotID], [status]) VALUES (N'IOT102              ', N'Q006                ', 1)
INSERT [dbo].[Subject_Slot] ([subjectID], [examSlotID], [status]) VALUES (N'IOT102              ', N'Q020                ', 1)
INSERT [dbo].[Subject_Slot] ([subjectID], [examSlotID], [status]) VALUES (N'IOT102              ', N'Q021                ', 1)
INSERT [dbo].[Subject_Slot] ([subjectID], [examSlotID], [status]) VALUES (N'IOT102              ', N'Q034                ', 1)
INSERT [dbo].[Subject_Slot] ([subjectID], [examSlotID], [status]) VALUES (N'IOT102              ', N'Q037                ', 1)
INSERT [dbo].[Subject_Slot] ([subjectID], [examSlotID], [status]) VALUES (N'LAB211              ', N'Q004                ', 1)
INSERT [dbo].[Subject_Slot] ([subjectID], [examSlotID], [status]) VALUES (N'LAB211              ', N'Q030                ', 1)
INSERT [dbo].[Subject_Slot] ([subjectID], [examSlotID], [status]) VALUES (N'LAB211              ', N'Q032                ', 1)
INSERT [dbo].[Subject_Slot] ([subjectID], [examSlotID], [status]) VALUES (N'LAB211              ', N'Q035                ', 1)
INSERT [dbo].[Subject_Slot] ([subjectID], [examSlotID], [status]) VALUES (N'LAB211              ', N'Q039                ', 1)
INSERT [dbo].[Subject_Slot] ([subjectID], [examSlotID], [status]) VALUES (N'MAS291              ', N'Q009                ', 1)
INSERT [dbo].[Subject_Slot] ([subjectID], [examSlotID], [status]) VALUES (N'MAS291              ', N'Q031                ', 1)
INSERT [dbo].[Subject_Slot] ([subjectID], [examSlotID], [status]) VALUES (N'MAS291              ', N'Q036                ', 1)
INSERT [dbo].[Subject_Slot] ([subjectID], [examSlotID], [status]) VALUES (N'PRJ301              ', N'Q007                ', 1)
INSERT [dbo].[Subject_Slot] ([subjectID], [examSlotID], [status]) VALUES (N'PRJ301              ', N'Q029                ', 1)
INSERT [dbo].[Subject_Slot] ([subjectID], [examSlotID], [status]) VALUES (N'SWE201c             ', N'Q008                ', 1)
INSERT [dbo].[Subject_Slot] ([subjectID], [examSlotID], [status]) VALUES (N'SWP391              ', N'Q040                ', 1)
INSERT [dbo].[Subject_Slot] ([subjectID], [examSlotID], [status]) VALUES (N'SWR302              ', N'Q010                ', 1)
INSERT [dbo].[Subject_Slot] ([subjectID], [examSlotID], [status]) VALUES (N'SWT301              ', N'Q001                ', 1)
INSERT [dbo].[Subject_Slot] ([subjectID], [examSlotID], [status]) VALUES (N'SWT301              ', N'Q022                ', 1)
INSERT [dbo].[Subject_Slot] ([subjectID], [examSlotID], [status]) VALUES (N'SWT301              ', N'Q023                ', 1)
INSERT [dbo].[Subject_Slot] ([subjectID], [examSlotID], [status]) VALUES (N'SWT301              ', N'Q025                ', 1)
INSERT [dbo].[Subject_Slot] ([subjectID], [examSlotID], [status]) VALUES (N'WED201c             ', N'Q015                ', 1)
GO
INSERT [dbo].[Users] ([ID], [userName], [email], [Role], [status]) VALUES (N'U1                            ', N'Lương Phạm Việt Anh', N'anhlpvse170540@fpt.edu.vn               ', N'Admin                         ', 1)
INSERT [dbo].[Users] ([ID], [userName], [email], [Role], [status]) VALUES (N'U2                            ', N'Nguyễn Quang Khánh', N'khanhnqse170545@fpt.edu.vn              ', N'Testing Admin                 ', 1)
INSERT [dbo].[Users] ([ID], [userName], [email], [Role], [status]) VALUES (N'U3                            ', N'Hoàng Khánh Duy', N'duyhkse170525@fpt.edu.vn                ', N'Testing Staff                 ', 1)
INSERT [dbo].[Users] ([ID], [userName], [email], [Role], [status]) VALUES (N'U4                            ', N'Ðào Nguyễn Huy Nhân', N'nhandnhse171010@fpt.edu.vn              ', N'Lecturer                      ', 1)
INSERT [dbo].[Users] ([ID], [userName], [email], [Role], [status]) VALUES (N'U5                            ', N'Ngô Gia Huấn', N'huanngse171018@fpt.edu.vn               ', N'Student                       ', 1)
INSERT [dbo].[Users] ([ID], [userName], [email], [Role], [status]) VALUES (N'U6                            ', N'Nguyễn Văn A', N'tester@gmail.com                        ', N'Admin                         ', 1)
INSERT [dbo].[Users] ([ID], [userName], [email], [Role], [status]) VALUES (N'U7                            ', N'Nguyễn Văn A', N'tester123@gmail.com                     ', N'Student                       ', 1)
INSERT [dbo].[Users] ([ID], [userName], [email], [Role], [status]) VALUES (N'U8                            ', N'Nguyễn Huy Khải', N'nguyenhuykhaipch94@gmail.com            ', N'Admin                         ', 1)
INSERT [dbo].[Users] ([ID], [userName], [email], [Role], [status]) VALUES (N'U9                            ', N'Khải', N'khainhse161766@fpt.edu.vn               ', N'Admin                         ', 1)
GO
ALTER TABLE [dbo].[Course]  WITH CHECK ADD FOREIGN KEY([semesterID])
REFERENCES [dbo].[Semester] ([ID])
GO
ALTER TABLE [dbo].[Course]  WITH CHECK ADD FOREIGN KEY([subjectID])
REFERENCES [dbo].[Subject] ([ID])
GO
ALTER TABLE [dbo].[Department]  WITH CHECK ADD FOREIGN KEY([examinerID])
REFERENCES [dbo].[Examiner] ([ID])
GO
ALTER TABLE [dbo].[ExamBatch]  WITH CHECK ADD  CONSTRAINT [FK__ExamBatch__cours__59063A47] FOREIGN KEY([courseID])
REFERENCES [dbo].[Course] ([ID])
GO
ALTER TABLE [dbo].[ExamBatch] CHECK CONSTRAINT [FK__ExamBatch__cours__59063A47]
GO
ALTER TABLE [dbo].[Examiner_In_Semeter]  WITH CHECK ADD FOREIGN KEY([examinerID])
REFERENCES [dbo].[Examiner] ([ID])
GO
ALTER TABLE [dbo].[Examiner_In_Semeter]  WITH CHECK ADD FOREIGN KEY([semeterID])
REFERENCES [dbo].[Semester] ([ID])
GO
ALTER TABLE [dbo].[ExamRoom]  WITH CHECK ADD FOREIGN KEY([classRoomID])
REFERENCES [dbo].[Classroom] ([ID])
GO
ALTER TABLE [dbo].[ExamRoom]  WITH CHECK ADD FOREIGN KEY([subjectID])
REFERENCES [dbo].[Subject] ([ID])
GO
ALTER TABLE [dbo].[ExamSlot]  WITH CHECK ADD  CONSTRAINT [FK__ExamSlot__examBa__66603565] FOREIGN KEY([examBatchID])
REFERENCES [dbo].[ExamBatch] ([ID])
GO
ALTER TABLE [dbo].[ExamSlot] CHECK CONSTRAINT [FK__ExamSlot__examBa__66603565]
GO
ALTER TABLE [dbo].[Register]  WITH CHECK ADD FOREIGN KEY([examinerID])
REFERENCES [dbo].[Examiner] ([ID])
GO
ALTER TABLE [dbo].[Register]  WITH CHECK ADD  CONSTRAINT [FK__Register__examSl__6A30C649] FOREIGN KEY([examSlotID])
REFERENCES [dbo].[ExamSlot] ([ID])
GO
ALTER TABLE [dbo].[Register] CHECK CONSTRAINT [FK__Register__examSl__6A30C649]
GO
ALTER TABLE [dbo].[Stu_ExamRoom]  WITH CHECK ADD FOREIGN KEY([examRoomID])
REFERENCES [dbo].[ExamRoom] ([ID])
GO
ALTER TABLE [dbo].[Stu_ExamRoom]  WITH CHECK ADD FOREIGN KEY([studentID])
REFERENCES [dbo].[Student] ([ID])
GO
ALTER TABLE [dbo].[Student_In_Course]  WITH CHECK ADD FOREIGN KEY([courseID])
REFERENCES [dbo].[Course] ([ID])
GO
ALTER TABLE [dbo].[Student_In_Course]  WITH CHECK ADD FOREIGN KEY([studentID])
REFERENCES [dbo].[Student] ([ID])
GO
ALTER TABLE [dbo].[Subject_Slot]  WITH CHECK ADD  CONSTRAINT [FK__Subject_S__examS__73BA3083] FOREIGN KEY([examSlotID])
REFERENCES [dbo].[ExamSlot] ([ID])
GO
ALTER TABLE [dbo].[Subject_Slot] CHECK CONSTRAINT [FK__Subject_S__examS__73BA3083]
GO
ALTER TABLE [dbo].[Subject_Slot]  WITH CHECK ADD FOREIGN KEY([subjectID])
REFERENCES [dbo].[Subject] ([ID])
GO
USE [master]
GO
ALTER DATABASE [DB_EXAM_2] SET  READ_WRITE 
GO
