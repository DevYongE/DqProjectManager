// backend/routes/notices.js
const express = require('express');
const { Pool } = require('pg');
const router = express.Router();
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// 공지사항 생성 API
router.post('/', async (req, res) => {
    const { title, content, created_by } = req.body;
    if (!title || !content || !created_by) {
        return res.status(400).json({ status: 'error', message: '필수 항목 누락' });
    }
    try {
        const query = 'INSERT INTO notices (title, content, created_by, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *';
        const result = await pool.query(query, [title, content, created_by]);
        res.status(201).json({ status: 'success', notice: result.rows[0] });
    } catch (err) {
        res.status(500).json({ status: 'error', message: '서버 오류', error: err.message });
    }
});

// 공지사항 목록 조회 API
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM notices ORDER BY created_at DESC');
        res.json({ status: 'success', notices: result.rows });
    } catch (err) {
        res.status(500).json({ status: 'error', message: '서버 오류', error: err.message });
    }
});

// 공지사항 상세 조회 API
router.get('/:noticeId', async (req, res) => {
    const { noticeId } = req.params;
    try {
        const result = await pool.query('SELECT * FROM notices WHERE id = $1', [noticeId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ status: 'error', message: '공지사항 없음' });
        }
        res.json({ status: 'success', notice: result.rows[0] });
    } catch (err) {
        res.status(500).json({ status: 'error', message: '서버 오류', error: err.message });
    }
});

// 공지사항 수정 API
router.put('/:noticeId', async (req, res) => {
    const { noticeId } = req.params;
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ status: 'error', message: '필수 항목 누락' });
    }
    try {
        const query = 'UPDATE notices SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 RETURNING *';
        const result = await pool.query(query, [title, content, noticeId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ status: 'error', message: '공지사항 없음' });
        }
        res.json({ status: 'success', notice: result.rows[0] });
    } catch (err) {
        res.status(500).json({ status: 'error', message: '서버 오류', error: err.message });
    }
});

// 공지사항 삭제 API
router.delete('/:noticeId', async (req, res) => {
    const { noticeId } = req.params;
    try {
        const query = 'DELETE FROM notices WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [noticeId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ status: 'error', message: '공지사항 없음' });
        }
        res.json({ status: 'success', message: '공지사항 삭제됨' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: '서버 오류', error: err.message });
    }
});

module.exports = router;
