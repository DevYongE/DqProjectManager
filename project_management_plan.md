# 프로젝트 관리 웹사이트 기획안

## 1. 프로젝트 개요
- **프로젝트명**: 사내 프로젝트 관리 시스템
- **목적**: 프로젝트 진행 사항 및 일정, 팀원 관리 등을 효율적으로 운영하기 위한 웹사이트 구축
- **대상**: 사내 직원
- **주요 기능**: 로그인, 회원가입, 프로젝트 관리, 대시보드, 공지사항

---

## 2. 주요 기능 상세

### 2.1 로그인 및 회원가입
- **첫 화면**: 로그인 페이지
- **로그인 정보**:
  - 이메일 (사내 이메일 사용 권장)
  - 비밀번호
- **회원가입 정보**:
  - 이메일
  - 비밀번호 / 비밀번호 확인
  - 이름
  - 생년월일
  - 직급
  - 입사일
  - 팀명

### 2.2 메인 대시보드
- 로그인 후 접속되는 페이지
- 주요 정보 표시:
  - 현재 진행 중인 프로젝트 목록
  - 공유할 사항 (최신 게시글 3개)
  - 프로젝트 진행 퍼센트
  - 금주 할 일

### 2.3 프로젝트 관리 페이지
- 프로젝트 생성 및 수정 가능
- 입력 항목:
  - 프로젝트명
  - 프로젝트 기간 (시작일 ~ 종료일)
  - 투입 M.M (Man-Month)
- 프로젝트 상세 페이지에서 진행 상황 업데이트 가능

### 2.4 공지사항 관리
- 팀원들이 공유할 사항을 등록할 수 있는 게시판 제공
- 최신 공지사항 3개는 대시보드에 표시

---

## 3. 시스템 구성
- **프론트엔드**: React.js 기반의 컴포넌트 방식 UI 구현
- **백엔드**: Node.js + Express 기반 API 서버
- **데이터베이스**: SQLite 또는 MongoDB 활용

---

## 4. 개발 일정
| 단계 | 작업 내용 | 기간 |
|------|----------|------|
| 1 | 요구사항 분석 및 기획 | 1주 |
| 2 | UI/UX 설계 | 1주 |
| 3 | 프론트엔드 개발 | 2주 |
| 4 | 백엔드 개발 | 2주 |
| 5 | 기능 통합 및 테스트 | 1주 |
| 6 | 배포 및 운영 | 지속 |

---

## 5. 기대 효과
- 프로젝트 진행 상황을 체계적으로 관리 가능
- 팀원 간 협업 강화
- 업무 진행의 투명성 확보

---

위 내용을 기반으로 개발을 진행하면 효과적인 프로젝트 관리 시스템을 구축할 수 있을 것입니다. 추가로 원하는 기능이 있으면 말씀해주세요!
