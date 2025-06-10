// backend/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
require('dotenv').config(); // dotenv 패키지 바로 실행

const router = express.Router();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// 데이터베이스 연결 테스트
router.get('/db-test', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ status: 'success', message: 'DB 연결 성공', time: result.rows[0].now });
    } catch (err) {
        res.status(500).json({ status: 'error', message: 'DB 연결 실패', error: err.message });
    }
});

// 회원가입 API
router.post('/register', async (req, res) => {
    const { email, password, name, birthDate, position, joinDate, team_name } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({ status: 'error', message: '필수 항목 누락' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        const query = 'INSERT INTO users (email, password, name, birth_date, position, join_date, team_name) VALUES ($1, $2, $3, $4, $5, $6, $7)';
        await pool.query(query, [email, hashedPassword, name, birthDate, position, joinDate, team_name]);
        res.status(201).json({ status: 'success', message: '회원가입 성공' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: '서버 오류', error: err.message });
    }
});

// 로그인 API
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];
        
        if (!user) {
            return res.status(401).json({ status: 'error', message: '로그인 실패' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ status: 'error', message: '로그인 실패' });
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ status: 'success', token, userId: user.id });
    } catch (err) {
        res.status(500).json({ status: 'error', message: '서버 오류', error: err.message });
    }
});

module.exports = router;
