// CRUD 로직
const pool = require("../models/dbPool");
const { post } = require("../routes/indexRouter");

exports.createPost = async (req, res) => {
  console.log("createPost 들어옴");

  try {
    const { writer, title, content } = req.body;
    console.log(writer, title, content);
    const sql = `insert into post(writer, title, content) values(?, ?, ?)`; // 배열로 보내야 함
    const postData = [writer, title, content];
    // const sql = `insert into post(witer, title, content) set ?`; // 객체로 보내야 함 (sql injection 공격 방어 가능)
    // const postData = { writer, title, content };

    const [result] = await pool.query(sql, postData);
    console.log(result);
    res.status(201).json({ message: "Post Created", postId: result.insertId });
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
    const sql = `select id, title, content, writer, attach, wdate from posts order by id desc`;
    const [posts] = await pool.query(sql);
    // console.log(posts);
    res.json({ data: posts, totalCount: count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server Error : ${error.message}` });
  }
};
