import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

export default function DashboardPage() {
  const navigate = useNavigate();

  // 로그인 토큰이 없으면 접근할 수 없도록 예시 처리 (선택 사항)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // 토큰이 없으면 로그인 페이지로 이동
      navigate("/login");
    }
  }, [navigate]);

  // 로그아웃 버튼 클릭 시 토큰 삭제 후 로그인 페이지로 이동
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* 사이드바 */}
      <aside className="w-64 bg-gray-800 text-white py-6 px-4">
        <h2 className="text-xl font-bold mb-4">메인</h2>

        {/* 사이드바 메뉴: 프로젝트 관리 & 공지사항 */}
        <nav className="space-y-2">
          <Link to="/projects" className="block px-3 py-2 rounded hover:bg-gray-700">
            프로젝트 관리
          </Link>
          <Link to="/notices" className="block px-3 py-2 rounded hover:bg-gray-700">
            공지사항
          </Link>
        </nav>

        {/* 로그아웃 버튼 */}
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 rounded bg-red-500 hover:bg-red-600"
          >
            로그아웃
          </button>
        </div>
      </aside>

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1 bg-gray-100 p-6">
        {/* 현재 프로젝트 진행 사항 */}
        <section className="mb-8">
          <h1 className="text-2xl font-bold mb-4">현재 프로젝트 진행 사항</h1>
          <div className="bg-white p-4 rounded shadow">
            <p>프로젝트 A 진행률: 70%</p>
            <p>프로젝트 B 진행률: 40%</p>
            <p>프로젝트 C 진행률: 90%</p>
            {/* 실제 진행률, 데이터 등은 props나 API 호출로 가져와서 표시 */}
          </div>
        </section>

        {/* 공지사항 */}
        <section>
          <h1 className="text-2xl font-bold mb-4">공지사항</h1>
          <div className="bg-white p-4 rounded shadow">
            <ul className="list-disc list-inside space-y-2">
              <li>사내 네트워크 점검 안내 (예: 09/01)</li>
              <li>추석 연휴 일정 안내 (예: 09/15 ~ 09/18)</li>
              <li>사내 교육 프로그램 신청 (예: 08/30 ~ 09/05)</li>
              {/* 실제 공지사항 데이터도 서버와 연동해 동적으로 로드 가능 */}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
