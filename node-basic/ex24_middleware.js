const http = require("http"),
  express = require("express");

const app = express();

// 1. 전역 미들웨어 -> 라우터 전에 배치
app.use((req, res, next) => {
  console.log("1. 미들웨어 요청 처리");
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.write("<h1>Express Middleware Test</h1>");
  next(); // 다음 미들웨어로 넘김
});

app.use((req, res, next) => {
  console.log("2. 미들웨어 요청 처리");
  req.user = "Hong"; // user명 설정
  next();
});

app.use((req, res, next) => {
  console.log("3. 미들웨어 요청 처리");
  res.write(`<h2 style='color:blue'>${req.user}님 접속</h2>`);
  next();
});

// 라우팅
app.get("/", (req, res) => {
  console.log(req.url, req.method);
  res.write(`<h1>/로 요청들어옴</h1>`);
  if (req.user == "Hong") throw new Error("Hong은 제외");
  res.end(); // 응답 종료
});

function auth(req, res, next) {
  console.log("auth 미들웨어 들어옴...");
  // 인증받은 경우 헤더에 'Authorization' : 'Bearer토큰'
  if (!req.headers || !req.headers.authorization) {
    return res
      .status(401)
      .end(
        `<h1 style='color:red'>${req.user}는 인증받지 않은 사용자예요. 접근 불가</h1>`
      );
  }
  next();
}

// 2. 라우터 미들웨어 설정 (ex. 인증 미들웨어)
app.get("/mypage", auth, (req, res) => {
  res.write(`<h1>MyPage</h1>`);
  res.write(`<h2>회원 인증을 거쳐야 들어오는 페이지</h2>`);
  res.end();
});

// 3. 에러 처리 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).end("<h1 style='color:orange'>Server Error</h1>");
});

http.createServer(app).listen(5555, () => {
  console.log("http://localhost:5555");
});
