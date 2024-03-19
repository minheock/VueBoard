const Database = require('better-sqlite3');

const db = new Database('./file.db', { verbose: console.log });

// 데이터베이스 테이블과 데이터 생성
if (!db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='users'").get()) {
    db.exec(`CREATE TABLE users (
        id TEXT PRIMARY KEY,
        pw TEXT,
        username TEXT,
        authority TEXT,
        user_yn TEXT,
        created_at DATETIME
    )`);

    const insertUser = db.prepare(
        "INSERT INTO users (id, pw, username, authority, user_yn, created_at) VALUES ($id, $pw, $username, $authority, $user_yn, $created_at)"
    );
    const usersData = [
        { id: "min", pw: "as1234!@", username: "최민혁", authority: "1", user_yn: "Y", created_at: "2024/03/19" },
        { id: "su", pw: "as1234!@", username: "송수련", authority: "1", user_yn: "Y", created_at: "2024/03/19" },
        { id: "beong", pw: "as1234!@", username: "양병연", authority: "1", user_yn: "Y", created_at: "2024/03/19" },
        { id: "admin", pw: "as1234!@", username: "관리자1", authority: "2", user_yn: "Y", created_at: "2024/03/01" },
        { id: "withfirst", pw: "as1234!@", username: "관리자2", authority: "2", user_yn: "Y", created_at: "2024/03/01" }
    ];

    for (const user of usersData) insertUser.run(user);
}

if (!db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='board'").get()) {
    db.exec(`CREATE TABLE board(
        board_id INTEGER PRIMARY KEY,
        board_no INTEGER,
        board_title VARCHAR2,
        board_content VARCHAR2,
        board_yn VARCHAR2,
        board_type VARCHAR2,
        user_id VARCHAR2,
        username VARCHAR2,
        created_at DATE
    )`);
}

// 보드 테이블에 인덱스 생성
db.exec("CREATE INDEX IF NOT EXISTS board_idx ON board (board_no)");

module.exports = db;
