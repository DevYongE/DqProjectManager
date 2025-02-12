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
    <div className="min-h-screen flex">
      {/* 사이드바 영역 */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col fixed h-full">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">메인</h2>
          <nav className="space-y-2">
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
        </div>
        <div className="mt-auto p-6">
          <button
            onClick={handleLogout}
            className="w-full px-3 py-2 rounded bg-red-500 hover:bg-red-600"
          >
            로그아웃
          </button>
        </div>
      </aside>

      {/* 메인 컨텐츠 영역 */}
      <main className="flex-1 ml-64 bg-gray-100">
        <div className="container mx-auto px-6 py-8 max-w-4xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
