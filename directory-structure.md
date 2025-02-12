
---

## 📁 프로젝트 폴더 구조
```
project-management-system/
├── frontend/               # 프론트엔드 (React + TypeScript)
│   ├── src/
│   │   ├── assets/        # 정적 파일 (이미지, 스타일 등)
│   │   │   ├── images/
│   │   │   └── styles/
│   │   │
│   │   ├── components/   # 재사용 가능한 UI 컴포넌트
│   │   │   ├── common/    # 공통 컴포넌트 (Button, Input, Modal 등)
│   │   │   │   ├── Button/
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   └── Button.test.tsx
│   │   │   │   ├── Input/
│   │   │   │   └── Modal/
│   │   │   ├── layout/    # 레이아웃 컴포넌트 (Header, Sidebar, Footer 등)
│   │   │   │   ├── Header/
│   │   │   │   ├── Sidebar/
│   │   │   │   └── Footer/
│   │   │   └── features/  # 기능별 컴포넌트 (대시보드, 프로젝트, 공지사항 등)
│   │   │       ├── dashboard/
│   │   │       ├── project/
│   │   │       └── notice/
│   │   │
│   │   ├── pages/        # 페이지 컴포넌트
│   │   │   ├── auth/
│   │   │   │   ├── LoginPage.tsx
│   │   │   │   └── RegisterPage.tsx
│   │   │   ├── dashboard/
│   │   │   │   └── DashboardPage.tsx
│   │   │   ├── project/
│   │   │   │   ├── ProjectListPage.tsx
│   │   │   │   └── ProjectDetailPage.tsx
│   │   │   └── notice/
│   │   │       └── NoticePage.tsx
│   │   │
│   │   ├── store/        # Zustand 스토어 (전역 상태 관리)
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.ts
│   │   │   │   ├── projectSlice.ts
│   │   │   │   └── noticeSlice.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── services/     # API 서비스
│   │   │   ├── api.ts    # axios 인스턴스 설정
│   │   │   ├── authService.ts
│   │   │   ├── projectService.ts
│   │   │   └── noticeService.ts
│   │   │
│   │   ├── hooks/        # 커스텀 훅
│   │   │   ├── useAuth.ts
│   │   │   ├── useProject.ts
│   │   │   └── useNotice.ts
│   │   │
│   │   ├── types/        # TypeScript 타입 정의
│   │   │   ├── auth.ts
│   │   │   ├── project.ts
│   │   │   └── notice.ts
│   │   │
│   │   ├── utils/        # 유틸리티 함수
│   │   │   ├── format.ts
│   │   │   └── validation.ts
│   │   │
│   │   └── constants/    # 상수 정의
│   │       ├── api.ts
│   │       └── common.ts
│   │
│   └── public/           # 정적 파일
│
└── backend/              # 백엔드 구조 (이전과 동일)
```

---

## 📌 주요 특징
✅ **모듈화**: 각 기능이 독립적인 모듈로 분리되어 있어 유지보수가 용이함.  
✅ **상태 관리 단순화**: Zustand를 활용하여 전역 상태 관리를 간단하게 구현.  
✅ **타입 안정성**: TypeScript를 사용하여 정적 타입 체크가 가능.  
✅ **코드 재사용성 증가**: 커스텀 훅을 활용하여 반복되는 로직을 최소화.  
✅ **테스트 용이성**: 컴포넌트와 로직이 분리되어 있어 단위 테스트가 쉬움.

---

