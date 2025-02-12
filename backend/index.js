// index.js (서버 실행 파일)
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth'); // auth 라우터 가져오기
const noticeRoutes = require('./routes/notices'); // auth 라우터 가져오기

dotenv.config(); // 환경 변수 로드

const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());

// 라우트 설정
app.use('/api/auth', authRoutes);
app.use('/api/notices', noticeRoutes)
// 기본 라우트
app.get('/', (req, res) => {
    res.send('Backend is running...');
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
