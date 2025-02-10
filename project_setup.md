# 프로젝트 설정

## 프로젝트 루트 디렉토리 생성
```bash
mkdir project-management-system
cd project-management-system
```

## 백엔드 설정
```bash
mkdir backend
cd backend
npm init -y
npm install express cors dotenv sqlite3 jsonwebtoken bcryptjs body-parser
mkdir routes models controllers config

echo "const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Backend is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});" > server.js

cd ..
```

## 프론트엔드 설정
```bash
mkdir frontend
cd frontend
npm create vite@latest . --template react
npm install
npm install axios react-router-dom tailwindcss postcss autoprefixer
npx tailwindcss init -p

echo "module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};" > tailwind.config.js

cd ..
```

## 프로젝트 실행 방법
### 백엔드
```bash
cd backend
npm install
npm start
```

### 프론트엔드
```bash
cd frontend
npm install
npm run dev
```

## Git 초기화 및 .gitignore 설정
```bash
echo "node_modules/
dist/
.env" > .gitignore
git init
git add .
git commit -m "Initial project setup"
```
