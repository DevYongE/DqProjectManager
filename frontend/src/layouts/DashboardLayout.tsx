import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function DashboardLayout() {
  const navigate = useNavigate();

  // (선택) 로그인 토큰 없으면 로그인 페이지로 강제 이동
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* 사이드바 영역 */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-xl font-bold mb-4">메인</h2>
        <nav className="space-y-2">
          {/* 사이드바 메뉴 */}
          <Link
            to="/projects"
            className="block px-3 py-2 rounded hover:bg-gray-700"
          >
            프로젝트 관리
          </Link>
          <Link
            to="/notices"
            className="block px-3 py-2 rounded hover:bg-gray-700"
          >
            공지사항
          </Link>
        </nav>

        {/* 로그아웃 버튼 */}
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="w-full px-3 py-2 rounded bg-red-500 hover:bg-red-600"
          >
            로그아웃
          </button>
        </div>
      </aside>

      {/* 메인 컨텐츠 영역: 하위 라우트가 Outlet으로 표시됨 */}
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
