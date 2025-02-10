# 프로젝트 기획에 따른 브랜치 명명 규칙

Git 브랜치를 체계적으로 관리하면 협업과 유지보수가 훨씬 쉬워집니다. 일반적으로 **Git Flow** 방식을 참고하여 브랜치 전략을 설정할 수 있습니다.

---

## 1. 기본 브랜치 (Main & Develop)

| 브랜치 | 설명 |
|--------|------|
| `main` | 배포 가능한 안정적인 코드가 있는 브랜치 |
| `develop` | 개발 중인 기능을 통합하는 브랜치 |

```sh
git branch -M main  # main 브랜치 설정
git checkout -b develop  # develop 브랜치 생성
git push -u origin develop  # 원격 저장소에 develop 브랜치 푸시
```

---

## 2. 기능 개발 브랜치 (Feature)

✅ `feature/{기능명}`: 새로운 기능 개발 브랜치  
`develop`에서 분기하여 새로운 기능을 개발하고, 완료 후 `develop`으로 병합 (merge)합니다.

**예시**
- `feature/auth` → 로그인/회원가입 기능 개발
- `feature/dashboard` → 대시보드 UI 구현
- `feature/project-management` → 프로젝트 관리 페이지 개발

```sh
git checkout develop  # develop 브랜치로 이동
git checkout -b feature/auth  # 새로운 기능 브랜치 생성
git push -u origin feature/auth  # 원격에 브랜치 등록
```

---

## 3. 버그 수정 브랜치 (Bugfix)

✅ `bugfix/{수정내용}`: 버그 수정 브랜치  
`develop`에서 분기하여 버그 수정 후 `develop`으로 병합합니다.

**예시**
- `bugfix/login-error` → 로그인 에러 수정
- `bugfix/dashboard-loading` → 대시보드 로딩 속도 개선

```sh
git checkout develop
git checkout -b bugfix/login-error
git push -u origin bugfix/login-error
```

---

## 4. 핫픽스 브랜치 (Hotfix)

✅ `hotfix/{수정내용}`: 운영 중인 버그 긴급 수정 브랜치  
`main`에서 직접 분기하여 긴급한 문제를 해결하고, 수정 후 `main`과 `develop`에 병합합니다.

**예시**
- `hotfix/api-fix` → 운영 서버 API 오류 긴급 수정
- `hotfix/security-patch` → 보안 패치 적용

```sh
git checkout main
git checkout -b hotfix/api-fix
git push -u origin hotfix/api-fix
```

---

## 5. 릴리즈 브랜치 (Release)

✅ `release/{버전}`: 배포 전 최종 테스트 브랜치  
`develop`에서 분기하여 배포 전 마지막 테스트 및 QA를 수행한 후, `main`과 `develop`에 병합합니다.

**예시**
- `release/v1.0.0` → 1.0.0 버전 출시 준비

```sh
git checkout develop
git checkout -b release/v1.0.0
git push -u origin release/v1.0.0
```

---

## 6. 브랜치 병합 & 삭제

### 기능 완료 후 `develop`으로 병합
```sh
git checkout develop
git merge feature/auth
git push origin develop
git branch -d feature/auth  # 로컬 브랜치 삭제
git push origin --delete feature/auth  # 원격 브랜치 삭제
```

### 릴리즈 완료 후 `main`으로 병합
```sh
git checkout main
git merge release/v1.0.0
git push origin main
git branch -d release/v1.0.0
git push origin --delete release/v1.0.0
```

---

## 📌 정리: 브랜치 네이밍 규칙

| 브랜치 유형 | 네이밍 규칙 | 사용 목적 |
|------------|-----------|----------|
| 메인 브랜치 | `main` | 배포 가능한 최종 버전 |
| 개발 브랜치 | `develop` | 개발 중인 기능을 통합 |
| 기능 개발 | `feature/{기능명}` | 새로운 기능 개발 |
| 버그 수정 | `bugfix/{수정내용}` | 버그 수정 |
| 긴급 패치 | `hotfix/{수정내용}` | 운영 서버 긴급 수정 |
| 릴리즈 | `release/{버전}` | 배포 전 테스트 |

이 방식으로 브랜치를 관리하면 **협업이 원활**해지고, **각 브랜치의 역할이 명확**해집니다. 🚀  
추가로 필요한 사항이 있으면 말씀해주세요! 😊
