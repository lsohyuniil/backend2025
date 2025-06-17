// path 모듈 : 파일의 경로 처리 기능 제공
// path.sep : OS의 파일 경로 구분자
// join() : 경로를 결합
// resolve(경로) : 주어진 경로를 절대 경로 반환
// dirname(경로) : 주어진 경로에서 파일 이름을 제외한 디렉토리 경로 반환

const path = require("path");
const dirs = ["D:", "ezen-source", "node-basic"];
const dirStr = dirs.join(path.sep);
console.log(dirStr); // D:/ezen-source/node-basic
console.log(__dirname); // /Users/sohyun/2025뉴딜/backend2025/node-basic
console.log(path.join(__dirname, "public", "pizzaUI.html")); // /Users/sohyun/2025뉴딜/backend2025/node-basic/public/pizzaUI.html

const curPath = path.join(__dirname, "public", "pizzaUI.html");
// curPath : 파일명 제외한 상위 경로
const upDir = path.dirname(curPath);
console.log(upDir); // /Users/sohyun/2025뉴딜/backend2025/node-basic/public
const fname = path.basename(curPath);
console.log(fname); // pizzaUI.html
const ext = path.extname(curPath);
console.log(ext); // .html

const filePath = "/home/user/project/file.txt";
// 2단계 상위 디렉토리 가져오기
const str = path.join(filePath, "..", "..");
console.log(str); // /home/user
console.log(path.resolve(str)); // 주어진 경로를 절대 경로로 반환

