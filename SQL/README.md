- DBMS : MySQL, Oracle, MS Server, H2,… -> 관계형 데이터베이스NoSQL (비정형화)-> MongoDB, …

1. DB 생성

- create database eduDB;

2. user 생성

- create user 'ezen'@'%' identified by '1234';
- create user 'ezen'@'localhost' identified by '1234';

3. 권한 부여

- grant all on eduDB.\_ to 'ezen'@'%';
- grant all on eduDB.\_ to 'ezen'@'localhost';
- flush privileges;

4. 권한 조회

- show grants for 'ezen'@'localhost';

5. 현재 유저 확인

- select user(), current_user();

6. ezen으로 접속하기

- mysql -u ezen -p

7. Database changed

- use eduDB;

- 테이블 : 여러 개의 컬럼을 갖는 레코드들로 구성
- 회원 테이블
- 회원 (1) —- 포스트에 글을 쓴다. —— 포스트(게시판) (N) -> 1:N 관계
  id (PK) --------------------- id
  name ------------------------ title
  email (Unique) -------------- content
  ---------------------------- write (FK) -> members 테이블의 email을 레퍼런스

- DDL (Data Definition Language) => create, drop, alter,…
- create table if not exists members(
  id int auto_increment primary key,
  name varchar(50) not null,
  email varchar(100) unique not null,
  passwd varchar(100) not null,
  role varchar(20) default 'USER',
  indate datetime default current_timestamp,
  refreshtoken varchar(255)
  );

- alter user 'root'@'localhost'identified with mysql_native_passwordby 비밀번호 작성;
- alter user 'ezen'@'%'identified with mysql_native_passwordby 비밀번호 작성;
- alter user 'ezen'@'localhost'identified with mysql_native_passwordby 비밀번호 작성;

- connection pool : 데이터베이스에 접속하기 위한 여러 개의 커넥션을 미리 생성해두고, 이를 필요할 때 빌려 쓰고 다시 반납하는 커넥션 재사용 기술 (ex28_mysql.js 참고)

  - DB 연결 시간을 줄이기 위해 사용 : 커넥션 생성/해제의 오버헤드를 줄임
  - 효율적인 리소스 관리 : DB에 과도한 연결 요청을 방지
  - con, con, con, con, con => db 연결 시간 지체 없이 바로 가능하게 함

- TalendAPI로 테스트
