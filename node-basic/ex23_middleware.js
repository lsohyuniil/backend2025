const express = require("express");

const app = express();

/*
요청과 응답 사이에 추가적인 기능을 하는 중간 작업을 하고자 할 때 미들웨어를 사용한다
=> app.use(미들웨어) 를 이용함
*/

// 로그를 남기는 미들웨어
const myLogger = (req, res, next) => {
  console.log(
    "요청 들어옴 요청 경로 : " + req.url + ",요청 메소드 : " + req.method
  );
    next();
};

// app.use(미들웨어) : 모든 요청시 미들웨어 실행
// app.use('/user', 미들웨어) : 특정 경로로 시작하는 요청에서 미들웨어 실행
// app.post('/join', 미들웨어, 콜백함수) : 특정 경로의 post 방식 요청에서 미들웨어 실행
// app.use(myLogger);
app.use("/users", myLogger);

// 라우터
app.get("/", (req, res) => {
  res.send(`Hello world`);
});

app.get("/users", (req, res) => {
  res.send(`모든 회원 목록`);
});

app.listen(7777, () => {
  console.log("http://localhost:7777");
});
