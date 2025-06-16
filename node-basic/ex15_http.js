// http 모듈 : 웹 서버를 만들거나 클라이언트로 http 요청을 보낼 수 있게 하는 모듈
// express 모듈 : 외장 모듈. 설치해서 사용. 더 많은 기능을 가짐

const http = require("http");

// createServer() : 웹 서버를 생성함
const server = http.createServer((req, res) => {
  // 1. 요청 분석
  console.log(`요청 방식 : ${req.method}`); // GET, POST, ...
  console.log(`요청 URL : ${req.url}`);

  // 2. 응답 작성
  res.statusCode = 200; // 200 성공적 응답 ok
  res.setHeader("Content-Type", "text/html; charset='utf-8"); // 헤더에 컨텐트 타입 설정
  res.write("<h1>Hello Node.js</h1>"); // 브라우저에 데이터 쓰기
  res.write("<h2>안녕 노드야</h2>");
  res.end(); // 쓰기 종료
});

// 서버 기동
server.listen(3333, () => {
  console.log(`http://localhost:3333 에서 실행 중...`);
});
