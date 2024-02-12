require('dotenv').config()

export const config = {
  host: process.env.REACT_APP_DB_HOST,
  port: process.env.REACT_APP_DB_PORT,
  user: process.env.REACT_APP_DB_USER,
  pass: process.env.REACT_APP_DB_PASSWORD,
  db:   process.env.REACT_APP_DB_DATABASE,
//   password: process.env.DBPASSWORD,
//   database: process.env.DBNAME,
//   connectionLimit: 100,
}