const sql = require('mssql');

let config = {
    server: "mssql-147764-0.cloudclusters.net",
    port: 14397,
    user: "swp391",
    password: "Swp391@@@",
    database: "DB_EXAM_1",
    driver: "tedious",
    options: {
        trustServerCertificate: true
    }
};

let conn = new sql.ConnectionPool(config).connect()
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