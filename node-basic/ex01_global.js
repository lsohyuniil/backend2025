// 전역 객체 : global
console.log(global);
console.log("@@@@@");

global.setTimeout(() => {
  console.log("1초뒤 실행");
}, 1000);

global.func = () => {
  console.log("Global Function");
};

console.log(global);
console.log(global.var);
func();

// 전역 변수 : __filename, __dirname
console.log(`현재 실행 중인 파일명 : %s`, __filename);
console.log(`현재 실행 중인 파일의 상위 경로 : %s`, __dirname);
