// os (내장 모듈)
const os = require("os");
console.log("OS 시스템의 타입 : %s", os.type());
console.log("시스템의 호스트명: %s", os.hostname());
console.log("시스템의 메모리 %d bytes/ %d bytes", os.freemem(), os.totalmem);

console.log("----cpu 정보----");
console.log(os.cpus().length); // cpu 코어 수 반환
console.log(os.cpus());
console.log(os.networkInterfaces());
