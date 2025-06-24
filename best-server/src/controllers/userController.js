const pool = require("../models/dbPool");
const bcrypt = require("bcrypt");

// 회원가입 처리 메서드
exports.createUser = async (req, res) => {
  const { name, email, passwd, role } = req.body;

  if (!name || !email || !passwd) {
    return res.status(400).json({
      result: "fail",
      message: "이름, 이메일, 비밀번호 모두 입력 필수",
    });
  }

  const sql = `insert into members (name, email, passwd, role) values (?, ?, ?, ?)`;

  try {
    // 비밀번호 암호화 -> bcrypt 모듈
    // ex) passwd : 111 (평문) => hashing(111 + salt)
    const saltRound = 10; // 2^10 (1024)번 반복된 해싱 값을 생성하기 위해
    const hashPasswd = await bcrypt.hash(passwd, saltRound);
    console.log(hashPasswd);
    // 로그인 시에는 bcrypt.compare(passwd, dbPasswd) 이용해서 비교
    const [result] = await pool.query(sql, [name, email, hashPasswd, role]);

    if (result.affectedRows > 0) {
      res.json({
        result: "success",
        message: "회원가입 완료 - 로그인하세요.",
        data: { insertId: result.insertId },
      });
    } else {
      res.json({ result: "fail", message: "회원 정보 등록 실패" });
    }
  } catch (error) {
    console.error("error : ", error);
    res
      .status(500)
      .json({ result: "fail", message: "DB SQL error" + error.message });
  }
};

exports.duplicatedEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ result: "fail", message: "이메일을 입력하세요." });
  }
  try {
    const sql = `select id from members where email = ?`;
    const [result] = await pool.query(sql, [email]);
    // 해당 email이 없다면 빈 배열 []을 반환, 있다면 [{id: 10}]

    if (result.length === 0) {
      // 해당 이메일은 사용 가능 ok
      res.json({ result: "ok", message: `${email}은 사용 가능합니다.` });
    } else {
      // 해당 이메일은 이미 사용 중 duplex
      res.json({ result: "duplex", message: `${email}은 이미 사용 중입니다.` });
    }
  } catch (error) {
    console.error("error : ", error);
    res
      .status(500)
      .json({ result: "fail", message: "DB SQL error" + error.message });
  }
};
