// npm i mysql2
const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const port = 5555;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 데이터베이스 커넥션 풀 설정(mysql2)

// const pool = mysql
//   .createPool({
//     host: process.env.MYSQL_HOST,
//     port: Number(process.env.MYSQL_PORT),
//     database: process.env.MYSQL_DATABASE,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     connectionLimit: 10,
//   })
//   .promise(); // promise 기반으로 변환됨

let pool;

// 즉시 실행 함수
(async () => {
  try {
    pool = await mysql
      .createPool({
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT),
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        connectionLimit: 10,
      })
      .promise();
  } catch (err) {
    console.error("db 접속 실패: ", err);
  }
})();

// 회원가입
app.post(`/api/users`, async (req, res) => {
  // post -> req.body, get -> req.query, '/api/users/100' -> req.params
  const { name, email, passwd } = req.body; // req.body -> 미들웨어 설정 해줘야 함
  console.log(name, email, passwd);

  // 유효성 검사 (not null 제약 조건을 가진 필드들)
  if (!name || !email || !passwd) {
    return res.status(400).json({
      result: "fail",
      message: "이름, 이메일, 비밀번호는 반드시 입력 해야 해요.",
    });
  }

  try {
    // DB 연동
    const sql = `insert into members(name, email, passwd)
                    values(?, ?, ?)`; // Prepared Statement의 인파라미터 (Input Parameter) /  (Binding Parameter) 또는 플레이스홀더 (Placeholder)

    const [result] = await pool.query(sql, [name, email, passwd]);
    console.log(result);

    res.json({
      result: "success",
      message: "회원가입 완료 - 로그인하세요.",
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ result: "fail", message: "DB error: " + err.message });
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
