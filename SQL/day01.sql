-- 단문 주석
/*
 복문 주석
 DB -> SQL (Structured Query Language) : 표준
*/

use eduDB;
desc members;
select * from members;

-- 데이터 삽입 : insert문
/*
DDL (Data Definition L) : CREATE, ALTER, ...
DML (Data Manipulation Language) : INSERT, DELETE, UPDATE
DQL (DaTA QUERT L) : SELECT 
insert into 테이블명 (컬럼명1, 컬럼명2,...)
values (값1, 값2,...)
varchar, char, text, ... 홀 따옴표로 감싸서 값을 넣는다. '깂'
*/
insert into members(name, passwd, email)
values('홍길동', '111', 'hong@a.b.c');

-- TCL (Transaction Control L) : mysql은 auto commit이 설정 돼있음
commit; -- 메모리에 보관하던 데이터를 DB에 영구 저장
rollback; -- 이전 작업 취소

-- 데이터 조회 : select
/*
select 컬럼1, 컬럼2, ... from 테이블명
[where 조건]
*/
select id, name, email, indate, passwd, refreshtoken from members;
select * from members;

insert into members(name, passwd, email, role)
values('홍철수', '111', 'hong2@a.b.c', 'USER'),
	('최관리', '111', 'kasd@a.b.c', 'ADMIN'),
	('이민정', '111', 'leem@a.b.c', 'USER'),
	('이병헌', '111', 'leebh@naver.com', 'USER')
; 

select * from members where role = 'USER';

-- 회원 번호가 2번인 회원의 id, name, indate 출력
select id, name, indate from members where id = 2;

-- 이름이 홍길동인 회원 정보 출력 
select * from members where name = '홍길동';

-- 이름에 김씨 성을 가진 회원 정보 출력
-- like 절을 이용 (% -> 와일드카드)
select * from members where name like '김%';
select * from members where name like '%희';
select * from members where name like '%철%';

-- email에 com자를 가진 회원 정보 출력
select * from members where email like '%com%';

-- 이름에 임자가 들어가고 role이 ADMIN인 최원정보 출력 -> and 연산자
select * from members where name like '%임%' and role='ADMIN';

-- 이름에 김자가 들어가거나 role이 ADMIN인 회원정보 출력 -> or 연산자
select * from members where name like '%김%' or role='ADMIN';

-- 정렬, 제한
-- 회원의 이름 가나다순으로 출력
-- order by 컬럼명 acs (오름차순) | desc (내림차순)
select id, name, role from members order by name asc;

-- role 오름차순으로 정렬하고, 같은 role일 경우 등록일(indate) 내림차순하여 회원 정보 출력
select * from members order by role asc, indate desc;

-- 이메일에 .com이 포함된 회원들을 보여주되 등록일 내림차순으로 출력
-- WGHO 순서
-- where > group by > having > order by 순서
select * from members where email like '%.com%' order by indate desc;

-- 가장 오래 전에 등록한 회원 2명만 출력
select * from members order by indate asc limit 2;

-- 집계 함수
-- 일반 USER가 몇 명인지 출력
select count(id) from members where role='USER';

select * from members;
update members set name='최지열', email='master@a.b.c', passwd=222 where id=8;

-- 6번 이메일의 값을 'hong@a.b.c.'로 수정 -> 에러
update members set email = 'kcs@a.b.c.' where name = '홍철수';

-- delete문
/*
delete from 테이블; -> 모든 레코드가 삭제됨
delete from 테이블 where 조건;
*/
delete from members where id=9;

-- 테이블 생성
create table if not exists posts(
	id int auto_increment primary key,
	writer varchar(100) not null,
    title varchar(200) not null,
	content text,
	attach varchar(255),
	wdate datetime default current_timestamp,
	-- 외래키 제약조건 (members의 email을 writer가 참조하도록)
    -- 회원정보를 삭제하면 게시글도 같이 삭제되는 옵션 on delete cascade
    foreign key (writer) REFERENCES members(email) on delete cascade
);

-- posts에 글쓰기
insert into posts (writer, title, content)
values ('hong@a.b.c', '처음 쓰는 글', '처음 글쓰기 해요!!');

insert into posts (writer, title, content)
values ('hong@a.b.c', '공지사항', '공지합니다.'),
		('cyh@a.b.c', 'SQL 정리', 'DML 문장 복습.'),
        ('hong@a.b.c', 'Node.js 스터디 자료', '첨부파일을 확인하세요.'),
        ('leem@a.b.c', '프로젝트 계획', '6월말 시작 예정');

select * from posts;

-- 게시글 목록 (작성자 이름도 포함)
/* 
	posts (writer-email), members(name) 
	FK -> UK
    join문 사용 : 2개 이상의 테이블을 합쳐서 1개의 테이블 처럼 보여줄 수 있음.
    select a.column1, a.column2, b.column1, b.column2
    form table1 a(별칭)
    join table2 b
    on a.pk = b.fk
*/
select m.name, m.email, p.writer, p.title, wdate, p.id as '글번호'
from members m
join posts p
on m.email=p.writer
order by p.id desc;

select count(id) from members;

-- 중복 제외
select distinct writer from posts;

-- 전체 게시글 수 츨력
select count(id) from posts;

-- 회원별 게시글 수 출력
-- select * from tableName group by columnName;
-- 그룹 함수 : count(), max(), min(), sum(), avg(), ...
-- group by에 의해 select할 수 있는 컬럼은 group by 절에 사용된 컬럼만 가져올 수 있음 + 그룹함수
-- 작성자별로 게시글 수가 3개 이상되는 통계치만 보기
-- group by절에 조건을 부여할 때는 having 절 이용
select writer, count(id) from posts group by writer having count(id) >= 3;

-- date format
select id, title, content, writer, attach as file, date_format(wdate,'%Y-%m-%d %H:%i:%s') as wdate
from posts order by id desc;

select * from posts order by id desc;

select id, title, content, writer, attach as file, date_format(wdate, '%Y-%m-%d %H:%i:%s') as wdate 
from posts order by id desc limit 3 offset 0;
-- page		size(limit)		offset
-- 1			3				0
-- 2			3				3
-- 3			3				6
-- 4			3				9
-- offset = (page - 1) * size;









