# API 규칙 정의

## 기본 원칙
1. **RESTful API 설계 원칙 준수**  
   - HTTP 메서드 활용: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`
   - 명확한 엔드포인트 사용: `/users`, `/projects`, `/tasks` 등
2. **응답 형식 (JSON) 통일**  
   - 성공 시 `{ "status": "success", "data": {...} }`
   - 실패 시 `{ "status": "error", "message": "에러 설명" }`
3. **JWT (JSON Web Token) 기반 인증 사용**
   - `Authorization: Bearer <TOKEN>` 형태로 헤더에 포함
4. **에러 코드 일관성 유지**  
   - `200 OK`, `201 Created`, `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `500 Internal Server Error`

---

## 1. 인증 (Auth)

| 기능 | 메서드 | 엔드포인트 | 설명 |
|------|--------|------------|------|
| 회원가입 | `POST` | `/api/auth/register` | 회원가입 |
| 로그인 | `POST` | `/api/auth/login` | 로그인 및 JWT 발급 |
| 로그아웃 | `POST` | `/api/auth/logout` | 클라이언트에서 토큰 삭제 |
| 토큰 검증 | `GET` | `/api/auth/verify` | 토큰 유효성 확인 |

---

## 2. 사용자 관리 (User)

| 기능 | 메서드 | 엔드포인트 | 설명 |
|------|--------|------------|------|
| 사용자 목록 조회 (관리자) | `GET` | `/api/users` | 전체 사용자 목록 조회 |
| 사용자 정보 조회 | `GET` | `/api/users/{userId}` | 특정 사용자 정보 조회 |
| 사용자 정보 수정 | `PUT` | `/api/users/{userId}` | 사용자 정보 수정 |
| 계정 비활성화 | `PATCH` | `/api/users/{userId}/deactivate` | 사용자 계정 비활성화 |

---

## 3. 프로젝트 관리 (Project)

| 기능 | 메서드 | 엔드포인트 | 설명 |
|------|--------|------------|------|
| 프로젝트 생성 | `POST` | `/api/projects` | 새로운 프로젝트 생성 |
| 프로젝트 목록 조회 | `GET` | `/api/projects` | 모든 프로젝트 목록 조회 |
| 프로젝트 상세 조회 | `GET` | `/api/projects/{projectId}` | 특정 프로젝트 정보 조회 |
| 프로젝트 수정 | `PUT` | `/api/projects/{projectId}` | 프로젝트 정보 수정 |
| 프로젝트 삭제 | `DELETE` | `/api/projects/{projectId}` | 프로젝트 삭제 |

---

## 4. 작업 관리 (Task)

| 기능 | 메서드 | 엔드포인트 | 설명 |
|------|--------|------------|------|
| 작업 생성 | `POST` | `/api/tasks` | 새로운 작업 생성 |
| 작업 목록 조회 | `GET` | `/api/tasks` | 전체 작업 목록 조회 |
| 특정 프로젝트의 작업 조회 | `GET` | `/api/projects/{projectId}/tasks` | 특정 프로젝트의 작업 목록 조회 |
| 작업 상세 조회 | `GET` | `/api/tasks/{taskId}` | 특정 작업 상세 정보 조회 |
| 작업 상태 변경 | `PATCH` | `/api/tasks/{taskId}/status` | 작업 상태 변경 (예: 진행 중, 완료) |
| 작업 삭제 | `DELETE` | `/api/tasks/{taskId}` | 작업 삭제 |

---

## 5. 공지사항 관리 (Notice)

| 기능 | 메서드 | 엔드포인트 | 설명 |
|------|--------|------------|------|
| 공지사항 생성 | `POST` | `/api/notices` | 공지사항 등록 |
| 공지사항 목록 조회 | `GET` | `/api/notices` | 모든 공지사항 목록 조회 |
| 공지사항 상세 조회 | `GET` | `/api/notices/{noticeId}` | 특정 공지사항 조회 |
| 공지사항 수정 | `PUT` | `/api/notices/{noticeId}` | 공지사항 수정 |
| 공지사항 삭제 | `DELETE` | `/api/notices/{noticeId}` | 공지사항 삭제 |

---

## 6. 대시보드 (Dashboard)

| 기능 | 메서드 | 엔드포인트 | 설명 |
|------|--------|------------|------|
| 대시보드 데이터 조회 | `GET` | `/api/dashboard` | 대시보드에 표시될 정보 조회 |

---

## 📌 API 설계 원칙 요약

- **인증**: JWT 사용 (`Authorization: Bearer <TOKEN>`)
- **에러 코드 표준화**: `400`, `401`, `403`, `404`, `500`
- **명확한 엔드포인트 설계** (`/api/{리소스명}/{id}`)
- **데이터 응답 형식 통일** (`status`, `data`, `message` 포함)

