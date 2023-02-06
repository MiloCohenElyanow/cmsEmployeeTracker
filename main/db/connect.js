const SQL = require("mysql2");

//openeing connection to database that will be made

const dbTunnel = SQL.createPool({
  host:"localhost",
  user:"localhost",
  password:"Bruh123",
  database:"employee_db",
  waitForConnections:true,
  connectionLimit:2,
});

export {dbTunnel};