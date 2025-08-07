-- 데이터베이스 초기화 스크립트

-- 사용자 테이블 생성
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 게시글 테이블 생성
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 샘플 데이터 삽입
INSERT INTO users (name, email) VALUES 
    ('관리자', 'admin@example.com'),
    ('사용자1', 'user1@example.com'),
    ('사용자2', 'user2@example.com')
ON CONFLICT (email) DO NOTHING;

INSERT INTO posts (title, content, user_id) VALUES 
    ('첫 번째 게시글', '이것은 첫 번째 게시글입니다.', 1),
    ('두 번째 게시글', '이것은 두 번째 게시글입니다.', 2),
    ('세 번째 게시글', '이것은 세 번째 게시글입니다.', 1);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at);
