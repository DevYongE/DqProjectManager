// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHomePage from "./layouts/DashboardPage";

// 공지사항
import NoticeListPage from "./pages/notices/NoticeListPage";
import NoticeCreatePage from "./pages/notices/NoticeCreatePage";
import NoticeDetailPage from "./pages/notices/NoticeDetailPage";
import NoticeEditPage from "./pages/notices/NoticeEditPage";

// 그 외 로그인, 회원가입, 프로젝트 페이지 등 임포트
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
// import ProjectsPage from "./pages/ProjectsPage";
// 등등...

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인/회원가입 등은 사이드바 없이 표시한다고 가정 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 대시보드 레이아웃 (사이드바 고정) */}
        <Route path="/" element={<DashboardLayout />}>
       
        <Route path="dashboard" element={<DashboardHomePage />} /> 
         

          {/* 프로젝트 관리 페이지 예시 */}
          {/* <Route path="projects" element={<ProjectsPage />} /> */}

          {/* 공지사항 관련 라우트 */}
          <Route path="notices" element={<NoticeListPage />} />
          <Route path="notices/new" element={<NoticeCreatePage />} />
          <Route path="notices/:noticeId" element={<NoticeDetailPage />} />
          <Route path="notices/:noticeId/edit" element={<NoticeEditPage />} />
        </Route>

        {/* 404 처리 등 */}
        <Route path="*" element={<div>페이지를 찾을 수 없습니다</div>} />
      </Routes>
    </BrowserRouter>
  );
}
