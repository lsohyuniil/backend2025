/* 모듈화 해서 내보내는 방법
1. exports 전역 객체를 이용 : exports.프로퍼티
    : 값 자체를 할당하는 것이 아닌 내보낼 요소를 exports의 속성 또는 메서드로 추가함
2. module.exports : module.exports = 프로퍼티
    : 객체의 하나의 값만 할당 가능함
*/

exports.num = 1000;
exports.plus = function (a, b) {
  console.log(`${a} + ${b} = ${a + b}`);
};

exports.minus = function (a, b) {
  console.log(`${a} - ${b} = ${a - b}`);
};
