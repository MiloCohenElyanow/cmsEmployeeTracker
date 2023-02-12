import SQL from "mysql2/promise"

//openeing connection to database that will be made

const dbTunnel = SQL.createPool({
  host:"localhost",
  user:"localhost",
  password:"Bruh123",
  database:"employee_db",
  waitForConnections:true,
  connectionLimit:10,
  queueLimit:0,
});

export {dbTunnel};