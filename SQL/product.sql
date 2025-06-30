drop table products;
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  price INT,
  description text,
  image_url VARCHAR(255),
  spec ENUM('hit', 'best','new', 'normal') DEFAULT 'normal',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
desc products;

CREATE TABLE time_deals (
    id INT PRIMARY KEY AUTO_INCREMENT, 					-- 타임딜 번호 (PK)
    product_id INT NOT NULL, 							-- 타임딜 상품번호 (FK)
    deal_price INT NOT NULL, 							-- 세일 가격
    start_time DATETIME NOT NULL,						-- 타임딜 시작 시간
    end_time DATETIME NOT NULL,							-- 타임딜 종료 시간
    is_active BOOLEAN DEFAULT TRUE,						-- 타임딜 진행 중이면 1, 종료 0
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,		-- 타임딜 생성일
    FOREIGN KEY (product_id) REFERENCES products(id) 	-- 상품테이블의 상품번호를 외래키로 참조 (product_id)
);
desc time_deals;

-- 타임딜 예시
INSERT INTO time_deals (product_id, deal_price, start_time, end_time)
VALUES (3, 19000, '2025-07-01 09:00:00', '2025-07-01 14:05:00');

select * from time_deals;

-- 상품 예시
INSERT INTO products (name, price, description, image_url, spec)
VALUES ('React 티셔츠', 29000, '개발자 감성의 React 티셔츠', '/images/react-shirt.jpg','hit');

-- 타임딜 예시
INSERT INTO time_deals (product_id, deal_price, start_time, end_time)
VALUES (1, 19000, '2025-06-30 14:00:00', '2025-06-21 14:05:00');

-- HIT 상품 (4개)
INSERT INTO products (name, price, description, image_url, spec)
VALUES 
('남성 반팔 티셔츠', 19000, '여름용 기본 남성 반팔 티셔츠', '/images/tshirt_m1.jpg', 'hit'),
('여성 크롭 반팔', 22900, '트렌디한 여성용 크롭 반팔 티', '/images/tshirt_f1.jpg', 'hit'),
('남성 반바지', 27900, '편안한 착용감의 캐주얼 반바지', '/images/shorts_m1.jpg', 'hit'),
('여성 플리츠 스커트', 34900, '가벼운 소재의 주름 치마', '/images/skirt_f1.jpg', 'new');

-- BEST 상품 (4개)
INSERT INTO products (name, price, description, image_url, spec)
VALUES 
('여성 린넨 원피스', 49900, '여름철 시원한 린넨 소재 원피스', '/images/dress_f1.jpg', 'best'),
('남성 린넨 셔츠', 35900, '통기성 좋은 남성용 셔츠', '/images/shirt_m1.jpg', 'best'),
('여성 와이드 팬츠', 39900, '트렌디한 핏의 와이드 팬츠', '/images/pants_f1.jpg', 'best'),
('남성 트레이닝 세트', 59900, '운동용/캐주얼 겸용 트레이닝 세트', '/images/training_m1.jpg', 'best');

-- NORMAL 상품 (4개)
INSERT INTO products (name, price, description, image_url, spec)
VALUES 
('남성 슬리퍼', 15900, '가볍고 편안한 EVA 소재 슬리퍼', '/images/slipper_m1.jpg', 'normal'),
('여성 햇빛 차단 모자', 18900, '여름용 넓은 챙 모자', '/images/hat_f1.jpg', 'normal'),
('남성 양말 5족 세트', 9900, '데일리용 면 양말 세트', '/images/socks_m1.jpg', 'normal'),
('여성 캔버스 에코백', 12900, '심플한 디자인의 데일리 에코백', '/images/bag_f1.jpg', 'normal');

select * from products;
