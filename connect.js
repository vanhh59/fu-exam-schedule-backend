var sql = require('mssql/msnodesqlv8');

// các thông tin kết nối csdl
var config = {
    server: "mssql-147764-0.cloudclusters.net,14397",
    user: "swp391",
    password: "Swp391@@@",
    database: "DB_EXAM_1", // Config cho DB dùng ở server

    // server: ".",
    // user: "sa",
    // password: "123456",
    // database: "DB_EXAM", // Config cho DB dùng ở local
    
    driver: "msnodesqlv8"
};

// tạo pool kết nối tới csdl
var conn = new sql.ConnectionPool(config).connect().then(pool => {
    return pool;
});
//xuất ra để các file khác có thể sử dụng
module.exports = {
    conn: conn,
    sql: sql
}
