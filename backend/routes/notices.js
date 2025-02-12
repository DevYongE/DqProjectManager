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

// ✅ 1. 공지사항 생성 API
// 공지사항 생성 API
router.post('/', async (req, res) => {
    const { title, content, created_by } = req.body;
    console.log("📌 [POST] /api/notices 요청 데이터:", { title, content, created_by });

    // 필수 값 검증
    if (!title || !content || created_by === undefined) {
        console.error("❌ 필수 항목 누락:", { title, content, created_by });
        return res.status(400).json({ status: 'error', message: '필수 항목 누락' });
    }

    try {
        // ✅ created_by가 users 테이블에 존재하는지 확인
        const userCheck = await pool.query('SELECT id FROM users WHERE id = $1', [created_by]);
        if (userCheck.rows.length === 0) {
            console.warn(`⚠️ 존재하지 않는 사용자 ID: ${created_by}`);
            return res.status(400).json({ status: 'error', message: '존재하지 않는 사용자 ID입니다.' });
        }

        // ✅ 공지사항 삽입
        const query = `
            INSERT INTO notices (title, content, created_by, created_at, updated_at) 
            VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *`;
        console.log("🛠 SQL 실행:", query);

        const result = await pool.query(query, [title.trim(), content.trim(), created_by]);

        console.log("✅ 공지사항 생성 완료:", result.rows[0]);
        res.status(201).json({ status: 'success', notice: result.rows[0] });
    } catch (err) {
        console.error("🔥 DB 오류:", err);
        res.status(500).json({ status: 'error', message: '서버 오류', error: err.message });
    }
});
// ✅ 2. 공지사항 목록 조회 API
router.get('/', async (req, res) => {
    try {
        console.log("📌 [GET] /api/notices 요청");
        const result = await pool.query('SELECT * FROM notices ORDER BY created_at DESC');

        console.log("✅ 공지사항 목록 조회 완료, 총 개수:", result.rows.length);
        res.json({ status: 'success', notices: result.rows });
    } catch (err) {
        console.error("🔥 DB 오류:", err);
        res.status(500).json({ status: 'error', message: '서버 오류', error: err.message });
    }
});

// ✅ 3. 공지사항 상세 조회 API
router.get('/:noticeId', async (req, res) => {
    const { noticeId } = req.params;
    console.log(`📌 [GET] /api/notices/${noticeId} 요청`);

    try {
        const result = await pool.query('SELECT * FROM notices WHERE id = $1', [noticeId]);
        if (result.rows.length === 0) {
            console.warn(`⚠️ 공지사항 없음: ID=${noticeId}`);
            return res.status(404).json({ status: 'error', message: '공지사항 없음' });
        }

        console.log("✅ 공지사항 조회 성공:", result.rows[0]);
        res.json({ status: 'success', notice: result.rows[0] });
    } catch (err) {
        console.error("🔥 DB 오류:", err);
        res.status(500).json({ status: 'error', message: '서버 오류', error: err.message });
    }
});

// ✅ 4. 공지사항 수정 API
router.put('/:noticeId', async (req, res) => {
    const { noticeId } = req.params;
    const { title, content } = req.body;
    console.log(`📌 [PUT] /api/notices/${noticeId} 요청 데이터:`, { title, content });

    if (!title || !content) {
        console.error("❌ 필수 항목 누락:", { title, content });
        return res.status(400).json({ status: 'error', message: '필수 항목 누락' });
    }

    try {
        const query = `UPDATE notices SET title = $1, content = $2, updated_at = NOW() 
                       WHERE id = $3 RETURNING *`;
        console.log("🛠 SQL 실행:", query);
        const result = await pool.query(query, [title.trim(), content.trim(), noticeId]);

        if (result.rows.length === 0) {
            console.warn(`⚠️ 공지사항 없음: ID=${noticeId}`);
            return res.status(404).json({ status: 'error', message: '공지사항 없음' });
        }

        console.log("✅ 공지사항 수정 성공:", result.rows[0]);
        res.json({ status: 'success', notice: result.rows[0] });
    } catch (err) {
        console.error("🔥 DB 오류:", err);
        res.status(500).json({ status: 'error', message: '서버 오류', error: err.message });
    }
});

// ✅ 5. 공지사항 삭제 API
router.delete('/:noticeId', async (req, res) => {
    const { noticeId } = req.params;
    console.log(`📌 [DELETE] /api/notices/${noticeId} 요청`);

    try {
        const query = 'DELETE FROM notices WHERE id = $1 RETURNING *';
        console.log("🛠 SQL 실행:", query);
        const result = await pool.query(query, [noticeId]);

        if (result.rows.length === 0) {
            console.warn(`⚠️ 공지사항 없음: ID=${noticeId}`);
            return res.status(404).json({ status: 'error', message: '공지사항 없음' });
        }

        console.log("✅ 공지사항 삭제 성공:", result.rows[0]);
        res.json({ status: 'success', message: '공지사항 삭제됨' });
    } catch (err) {
        console.error("🔥 DB 오류:", err);
        res.status(500).json({ status: 'error', message: '서버 오류', error: err.message });
    }
});

module.exports = router;
