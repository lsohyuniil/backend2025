const { Sequelize } = require("sequelize");
const config = require("../config/config").development; // 개발 모드 설정 적용

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// 이 객체를 통해 DB 연결, 모델 정의, 쿼리 실행 등을 함
const db = {}; // 모델들과 Sequelize 객체를 모아둘 객체
db.sequelize = sequelize;
db.Sequelize = Sequelize; // Sequelize 라이브러리
db.Product = require("./product")(sequelize, Sequelize);

module.exports = db;
