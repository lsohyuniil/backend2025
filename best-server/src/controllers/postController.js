// CRUD 로직
const pool = require("../models/dbPool");
const path = require("path");
const fs = require("fs");

exports.createPost = async (req, res) => {
  console.log("createPost 들어옴");

  try {
    // 파라미터 데이터 -> req.body
    const { writer, title, content } = req.body;

    // 첨부파일 -> req.file
    const file = req.file; // multer 저장한 파일 정보
    console.log("file", file);

    let fileName = null;
    if (file) {
      fileName = file.filename; // 실제 저장된 파일명이 들어옴 (DB에 저장)
    }

    // console.log(writer, title, content);
    const sql = `insert into posts(writer, title, content, attach) values(?, ?, ?, ?)`; // 배열로 보내야 함
    const postData = [writer, title, content, fileName];

    // const sql = `insert into post(witer, title, content) set ?`; // 객체로 보내야 함 (sql injection 공격 방어 가능)
    // const postData = { writer, title, content };

    const [result] = await pool.query(sql, postData);
    console.log(result);

    const newPost = {
      id: result.insertId,
      writer,
      title,
      content,
      file: fileName,
    };

    // res.status(201).json({ message: "Post Created", postId: result.insertId });
    res.status(201).json(newPost);
  } catch (error) {
    console.error("createPost error : ", error);
    res.status(500).json({ message: "Server Error" + error.message });
  }
};

// 모든 포스트 목록 조회
exports.listPost = async (req, res) => {
  try {
    const size = 3; // 한 페이지당 보여줄 목록 개수
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * size;

    // 1. 전체 게시글 수 가져오기
    const query = `select count(id) as count from posts`;
    const [[{ count }]] = await pool.query(query);
    // console.log("count : ", count);

    // 1-2. 총 페이지 수 (totalPages) 구하기
    const totalPages = Math.ceil(count / size);

    // 2. 전체 게시 목록 가져오기 (현재 보여줄 페이지 번호에 해당하는 데이터만 끊어서 가져오기)
    // const sql = `select id, title, content, writer, attach, wdate from posts order by id desc`;
    const sql = `select id, title, content, writer, attach as file, date_format(wdate,'%Y-%m-%d') as wdate from posts order by id desc limit ? offset ?`;
    const [posts] = await pool.query(sql, [size, offset]);
    // console.log(posts);
    res.json({ data: posts, totalCount: count, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server Error : ${error.message}` });
  }
};

// GET /posts/100 -> req.parmsr
exports.viewPost = async (req, res) => {
  const { id } = req.params;

  try {
    const sql = `select id, writer, title, content, attach as file, date_format(wdate, '%Y-%m-%d %H:%i:%s'), wdate from posts where id=?`;

    const [result] = await pool.query(sql, [id]);
    if (result.length == 0) {
      return res.status(404).json({ message: "해당 글은 없습니다." });
    }

    res.json({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" + error.message });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    // 1. 해당 게시글의 첨부파일명 가져오기
    const sql1 = `select attach as file from posts where id=?`;
    const [result] = await pool.query(sql1, [id]);
    console.log("@@@@2", result);
    if (result.length === 0) {
      return res.status(404).json({ message: "해당 글은 존재하지 않습니다." });
    }

    const post = result[0];
    let filePath = "";
    if (post.file) {
      filePath = path.join(
        __dirname,
        "..",
        "..",
        "public",
        "uploads",
        post.file
      );
      console.log("filePath : ", filePath);
    }

    // 2. DB에서 해당 글 삭제
    const sql2 = `delete from posts where id=?`;
    const [result2] = await pool.query(sql2, [id]);

    if (result2.affectedRows === 0) {
      return res.status(404).json({ message: "해당 글은 존재하지 않습니다." });
    }

    // 3. 첨부 파일이 있다면 서버에서 삭제
    if (fs.existsSync(filePath)) {
      // 동기 방식으로 파일을 삭제하는 함수
      // 비동기 방식 => fs.unlink()
      fs.unlinkSync(filePath);
    }

    res.status(200).json({ message: `${id}번 글을 삭제했습니다.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" + error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    // 글 번호 : id => req.params.id
    const { id } = req.params;

    // 글 내용 : writer, title, ... => req.body
    const { writer, title, content } = req.body;

    // 첨부파일 :
    const file = req.file; // 새로 수정처리할 첨부 파일
    let fileName = file?.filename; // 새 첨부 파일명

    const sql1 = `select attach as file from posts where id=?`;
    const [result1] = await pool.query(sql1, [id]);

    if (result1.length === 0) {
      return res.status(404).json({ message: "해당 글이 존재하지 않습니다." });
    }

    const post = result1[0];
    let filePath = "";
    if (post.file) {
      // 이전에 첨부한 파일이 있다면
      filePath = path.join(
        __dirname,
        "..",
        "..",
        "public",
        "uploads",
        post.file
      );
    }

    const params = [writer, title, content]; // ? : 인파라미터 값들을 저장할 배열

    let sql2 = `update posts set writer=?, title=?, content=? `;

    if (file) {
      sql2 += `, attach=? `;
      params.push(fileName);
    }

    sql2 += ` where id=?`;
    params.push(id);
    console.log(sql2);
    const [result2] = await pool.query(sql2, params);

    if (result2.affectedRows === 0) {
      return res.status(404).json({ message: "해당 글이 존재하지 않습니다." });
    }

    if (result1.length > 0 && fs.existsSync(filePath)) {
      // 새로 첨부한 파일이 있다면
      fs.unlinkSync(filePath); // 기존 첨부 파일은 삭제 처리
    }

    res.status(200).json({ message: "Post 글 수정이 완료되었습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" + error.message });
  }
};
