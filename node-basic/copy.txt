// process 객체 : 프로그램과 프로세스 관련 기능을 수행
// 속성
// argv
console.log("argv 속성의 파라미터 수 : %d", process.argv.length);
console.log(process.argv);

// node ex03_process.js 99 88 77
// argv 속성의 파라미터 수 : 5
// [
//   "/opt/homebrew/Cellar/node/21.7.1/bin/node",
//   "/Users/sohyun/2025뉴딜/backend/node-basic/ex03_process.js",
//   "99",
//   "88",
//   "77",
// ];

console.log(process.argv[2]);
process.argv.forEach((val, i) => {
  console.log(`${i} : ${val}`);
});

// process.env : 운영체제에 의해 설정된 환경 변수가 들어감
console.log("@@@@");
// console.log(process.env);
console.log(process.env["OS"]);
console.log(process.env["PATH"]);

// 프로그램 종료
// process.exit();

/* 노드에서 이벤트 등록 방법
[1] addListener('이벤트', 핸들러 함수)
[2] on('이벤트', 핸들러 함수)

이벤트를 강제로 발생시키고자 할 때
[1] emit('이벤트 종류')
*/

// process.addListener("exit", () => {
//   console.log("프로그램이 종료됩니다.");
// });
// process.exit();

process.on("myevent", () => {
  console.log("myevent 발생");
});
process.emit("myevent");
