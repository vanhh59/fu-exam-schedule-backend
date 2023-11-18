var sql = require('mssql');

// Config Kết nối database server
var config = {
    server: "mssql-154595-0.cloudclusters.net",
    port: 19834,
    user: "SWP391",
    password: "Swp391@@@",
    database: "DB_EXAM_2",
    driver: "tedious",
    options: {
        trustServerCertificate: true
    }
};

// Config kết nối database local
// var config = {
//     server: "localhost",
//     port: 1433,
//     user: "sa",
//     password: "123456",
//     database: "DB_EXAM_2",
//     driver: "tedious",
//     options: {
//         trustServerCertificate: true
//     }
// };

var conn = new sql.ConnectionPool(config).connect()
    .then(pool => {
        console.log("Database connection is successful.");
        return pool;
    })
    .catch(err => {
        console.error("Database connection failed:", err);
    });

module.exports = {
    conn: conn,
    sql: sql
};
