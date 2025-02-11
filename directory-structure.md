project-management-system/
├── frontend/
│   ├── src/
│   │   ├── assets/                    # 정적 파일
│   │   │   ├── images/
│   │   │   └── styles/
│   │   │
│   │   ├── components/               # 재사용 컴포넌트
│   │   │   ├── common/              # 공통 컴포넌트
│   │   │   │   ├── Button/
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   └── Button.test.tsx
│   │   │   │   ├── Input/
│   │   │   │   └── Modal/
│   │   │   ├── layout/             # 레이아웃 컴포넌트
│   │   │   │   ├── Header/
│   │   │   │   ├── Sidebar/
│   │   │   │   └── Footer/
│   │   │   └── features/          # 기능별 컴포넌트
│   │   │       ├── dashboard/
│   │   │       ├── project/
│   │   │       └── notice/
│   │   │
│   │   ├── pages/                # 페이지 컴포넌트
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
│   │   ├── store/                # Zustand 스토어
│   │   │   ├── slices/          # 기능별 스토어 슬라이스
│   │   │   │   ├── authSlice.ts
│   │   │   │   ├── projectSlice.ts
│   │   │   │   └── noticeSlice.ts
│   │   │   └── index.ts        # 스토어 통합
│   │   │
│   │   ├── services/           # API 서비스
│   │   │   ├── api.ts         # axios 인스턴스 설정
│   │   │   ├── authService.ts
│   │   │   ├── projectService.ts
│   │   │   └── noticeService.ts
│   │   │
│   │   ├── hooks/             # 커스텀 훅
│   │   │   ├── useAuth.ts
│   │   │   ├── useProject.ts
│   │   │   └── useNotice.ts
│   │   │
│   │   ├── types/            # TypeScript 타입 정의
│   │   │   ├── auth.ts
│   │   │   ├── project.ts
│   │   │   └── notice.ts
│   │   │
│   │   ├── utils/           # 유틸리티 함수
│   │   │   ├── format.ts
│   │   │   └── validation.ts
│   │   │
│   │   └── constants/       # 상수 정의
│   │       ├── api.ts
│   │       └── common.ts
│   │
│   └── public/             # 정적 파일
│
└── backend/              # 백엔드 구조는 이전과 동일



    # 모듈화: 각 기능이 독립적인 모듈로 분리되어 있어 유지보수가 용이
    # 상태 관리 단순화: Zustand를 통해 전역 상태 관리가 간단해짐
    # 타입 안정성: TypeScript를 통한 타입 체크
    # 코드 재사용: 커스텀 훅을 통한 로직 재사용
    # 테스트 용이성: 각 컴포넌트와 로직이 분리되어 있어 테스트가 쉬움
    