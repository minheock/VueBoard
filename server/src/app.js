const express = require('express');
const db = require('./dbSetUp');

const app = express();

// 모든 사용자 정보 가져오기
app.get('/users', (req, res) => {
    const users = db.prepare('SELECT * FROM users WHERE user_yn = ?').all('Y');
    res.json(users);
});

// 특정 사용자 ID로 검색하기
app.get('/users/:id', (req, res) => {
    const user = db.prepare('SELECT * FROM users WHERE id = ? AND user_yn = ?').get(req.params.id, 'Y');
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// 모든 보드 정보 가져오기
app.get('/boards', (req, res) => {
    const boards = db.prepare('SELECT * FROM board').all();
    res.json(boards);
});

// 특정 보드 ID로 검색하기
app.get('/boards/:board_id', (req, res) => {
    const board = db.prepare('SELECT * FROM board WHERE board_id = ?').get(req.params.board_id);
    if (board) {
        res.json(board);
    } else {
        res.status(404).json({ error: 'Board not found' });
    }
});

// 서버 시작
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});

module.exports = app;
