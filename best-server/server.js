const express = require("express");
require("dotenv").config();
const morgan = require("morgan"); // 로그 남기는 용
const path = require("path");
const cors = require("cors");

// 라우터 가져오기
const indexRouter = require("./src/routes/indexRouter");
const postRouter = require("./src/routes/postRouter");
const userRouter = require("./src/routes/userRouter");
const adminRouter = require("./src/routes/adminRouter");
const loginRouter = require("./src/routes/loginRouter");

const {
  verifyAccessToken,
  verifyAdmin,
} = require("./src/middlewares/verifyMiddleware");

const port = process.env.PORT || 7777;

const app = express();

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
// cors 미들웨어 설정
app.use(cors()); // react와 통신하려면 필요한 미들웨어

// 라우터 연결
app.use("/", indexRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
// 로그인 여부 -> 관리자 여부 : 순서대로 체크
app.use("/api/admin", verifyAccessToken, verifyAdmin, adminRouter); // 관리자 여부 체크하는 미들웨어 설정
app.use("/api/auth", loginRouter); // 사용자 인증 체크

// 서버 가동
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
