require("dotenv").config();

module.exports = {
  development: {
    // 개발 모드
    username: "ezen",
    password: process.env.PASSWORD,
    database: "edudb",
    host: "localhost",
    dialect: "mysql",
  },
  production: {
    // 운영 모드
    username: "root",
    password: process.env.PASSWORD,
    database: "edudb",
    host: "localhost",
    dialect: "mysql",
  },
};
