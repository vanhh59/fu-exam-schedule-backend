let { conn, sql } = require('../../connect');
let Download = require('../models/download.model');
let download = new Download();

exports.getXlsx = async function (req, res) {
    res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + "Salaries.xlsx"
    );
    if (workbook != null) {
        return workbook.xlsx.write(res).then(function () {
            res.status(200).end();
        });
    } else {
        return res.status(400).send("No files were found.");
    }
}

exports.getExamRoomsXlsx = async function (req, res) {
    res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + "Salaries.xlsx"
    );
    download.downloadExamRoomXlsx(req.params.id);
    if (workbook != null) {
        return workbook.xlsx.write(res).then(function () {
            res.status(200).end();
        });
    } else {
        return res.status(400).send("No files were found.");
    }
}