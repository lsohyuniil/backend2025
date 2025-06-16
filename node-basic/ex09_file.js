// fs : 파일시스템 내장 모듈
const fs = require("fs");

// 1. 동기 방식으로 파일 읽기 : readFileSync(파일명, 인코딩)
const data = fs.readFileSync("package.json", "utf-8");

// 파일 데이터가 data에 담김
// 순차적으로 실행 파일 읽기 마침 -> bye bye 출력
console.log(data);
console.log("bye bye");

// 2. 비동기 방식 파일 읽기 : readFile(파일명, 인코딩, 콜백함수)
console.log("----비동기 방식으로 파일 읽기 시작----");
fs.readFile("ex01_global.js", "utf8", function (err, data) {
  if (err) throw err; // console.error(err);
  console.log(data);
});
console.log("----비동기 방식으로 파일 읽기 종료----");
