// CRUD 로직
const pool = require("../models/dbPool");

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
    // 1. 전체 게시글 수 가져오기
    const query = `select count(id) as count from posts`;
    const [[{ count }]] = await pool.query(query);
    // console.log("count : ", count);

    // 2. 전체 게시 목록 가져오기
    // const sql = `select id, title, content, writer, attach, wdate from posts order by id desc`;
    const sql = `select id, title, content, writer, attach as file, date_format(wdate,'%Y-%m-%d') as wdate from posts order by id desc;`;
    const [posts] = await pool.query(sql);
    // console.log(posts);
    res.json({ data: posts, totalCount: count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server Error : ${error.message}` });
  }
};
