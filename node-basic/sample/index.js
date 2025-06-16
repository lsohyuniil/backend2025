// gop(a, b), divide(a, b) 함수를 구성해서 exports로 내보내기
exports.gop = function (a, b) {
  console.log(`${a} x ${b} = ${a * b}`);
};

exports.divide = function (a, b) {
  console.log(`${a} / ${b} = ${a / b}`);
};

// ex05_require.js에서 가져와 호출
