const obj = require("./ex05_module"); // 확장자 생략 가능
const obj2 = require("./sample");

console.log(obj.num);
obj.plus(10, 3);
obj.minus(10, 3);

/* require('모듈명')
require('./module')
1. 먼저 module.js 를 찾음
2. 해당 파일이 없다면 module이라는 디렉토리를 찾음
3. 디렉토리가 있으면 해당 디렉토리의 index.js를 찾아 가져옴
 */

obj2.gop(2, 4);
obj2.divide(20, 4);
