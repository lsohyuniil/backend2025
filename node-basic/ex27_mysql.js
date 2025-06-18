// mysql 모듈 설치 -> Promise를 지원, async/await 사용 가능
// npm i mysql -> callback fn
// npm i mysql2 -> promise
const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

// db 연결 정보
const conn = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});
// console.log(conn);

// DB 연결
conn.connect((err) => {
  if (err) {
    console.error("MySQL 연결 시도 중 에러: ", err);
    return;
  }

  console.log("MySQL에 성공적으로 연결됐습니다.");
});

// 쿼리 실행
conn.query("select * from members order by id desc", (err, result) => {
  if (err) {
    console.error("쿼리 실행 에러 : ", err);
    return;
  }

  //   console.log(result); -> array
  result.forEach((element) => {
    console.log(element.id, element.name, element.email, element.role);
  });
});

// DB 연결 종료
conn.end();
