# backend2025

## 페이징 처리
[1] 총 게시글 수 알아내기 -> DB에서 가져오기
검색한 총 게시글 수 알아내기
select count(id) from posts
select count(id) from posts where title like '%키워드%'
==> totalCount STATE에 SETTING

[2] 한 페이지에 보여줄 목록 개수 정하기
const size = 3; (1페이지에 3개의 게시글 보여주기)

[3] 총 페이지 수 구하기 (연산)
totalCount : 11개
size : 3개
totalPages : 4페이지

totalCount      size        totalPages
 1, 2, 3         3              1
 4, 5, 6         3              2
 7, 8, 9         3              3

 totalCount = Math.ceil(totalCount/size) : 올림 -> 정수값을 반환
 -> json 데이터로 게시글 목록, totalCount, totalPages를 클라이언트 쪽에 보냄

## react
[4] 리액트에서 totalPages를 store에 state로 추가
[5] [페이징 블럭 처리 안 할 경우] : totalPages만큼 페이지 네비게이션 만들기
    Array.from({length:totalPages}, (_, i)=>i+1).map(n)=>`<button>${n}</button>`)}
[6] page 번호 버튼에 onClick 이벤트 처리
    onClick() = {()=>setPage(n)}
    -> page 값이 변경되고 -> PostList의 useEffect()의 의존성 배열에 page를 넣어줌

[페이징 블럭 처리 할 경우]
    페이지 블럭 처리를 위한 연산
Prev [1][2][3][4][5] Next | Prev [6][7][8][9][10] Next | Prev ...

page    pageBlock   startPage   endPage
1~5         5           1           5
6~10                    6           10
11~15                  11           15

startPage = Math.floor((page - 1) / pageBlock) * pageBlock + 1;
endPage = Math.min(startPage + (pageBlock - 1), totalPages);

## 백엔드 쪽 postController.js
[7] page 번호를 req.query로 받음
req.query.page -> string 타입 -> 숫자형으로 변경 (parseInt(), Number())
페이지 번호를 이용해서 DB에서 레코드를 끊어 와야 함