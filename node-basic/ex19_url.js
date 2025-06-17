const url = require("url");

// url 주소를 파싱하여 조작할 수 있게 하는 모듈
const str = `https://brand.naver.com/weeknine/shoppingstory/detail?id=5002039527`;
const str2 = `https://example.com:8080/path/name?query=string&id=100#hash`;

// 1. url.parse(url주소) : url 주소를 분해해서 내가 원하는 정보를 추출할 수 있음
// 2. url.format(객체) : 분해된 url 객체를 다시 원 상태로 조립한 문자열 반환
const parseUrl = url.parse(str);
console.log(parseUrl);
console.log(parseUrl.query); // id=5002039527
console.log(parseUrl.pathname); // weeknine/shoppingstory/detail?id=5002039527

console.log("url.format() : ", url.format(parseUrl));

// 최근 WHATWG URL 표준을 따르는 새로운 URL API를 사용
const myUrl = new URL(str2);

// 쿼리 읽기
console.log("@@@@");
console.log(myUrl);

// 쿼리 읽기
console.log(myUrl.searchParams.get("query"));
console.log(myUrl.searchParams.get("id"));
console.log(myUrl.hash);

// 쿼리 수정
myUrl.searchParams.set("id", "300");
console.log(myUrl.href);

// 쿼리 추가
myUrl.searchParams.append("sort", "price");
console.log(myUrl.href);
// https://example.com:8080/path/name?query=string&id=300&sort=price#hash

// 쿼리 삭제
myUrl.searchParams.delete("query");
console.log(myUrl.href);
// https://example.com:8080/path/name?id=300&sort=price#hash
