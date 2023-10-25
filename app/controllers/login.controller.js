var { conn, sql } = require('../../connect');
var Login = require('../models/login.model');
var login = new Login();

exports.getRole = async function (req, res) {
    login.getRole(req.body.email ,function (err, data) {
        if (data === 'Admin')
            res.redirect('/admin');
        else if (data === 'Testing Admin')
            res.redirect('/testingAdmin');
        else if (data === 'Testing Staff')
            res.redirect('/testingStaff');
        else if (data === 'Lecturer')
            res.redirect('/lecturer');
        else if (data === 'Student')
            res.redirect('/student');
        else res.status(401).send('Your account is not support!');
    });
}
