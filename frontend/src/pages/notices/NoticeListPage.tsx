// src/pages/NoticeListPage.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

interface Notice {
  id: number;
  title: string;
  content: string;
  created_at?: string; // 백엔드 필드명에 맞춰 수정
  // 필요한 필드 추가
}

export default function NoticeListPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 공지사항 목록 가져오기
  const fetchNotices = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/notices");
      setNotices(response.data); // 백엔드가 배열을 반환한다고 가정
    } catch (err: any) {
      console.error("공지사항 목록 가져오기 오류:", err);
      setError("공지사항을 불러오는 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // 공지사항 생성 페이지로 이동
  const handleCreate = () => {
    navigate("/notices/new");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">공지사항 목록</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        onClick={handleCreate}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        새 공지사항 생성
      </button>

      <ul className="space-y-2">
        {notices.map((notice) => (
          <li key={notice.id} className="bg-white shadow p-4 rounded">
            {/* 상세 보기로 이동하는 링크 */}
            <Link to={`/notices/${notice.id}`} className="font-semibold text-lg">
              {notice.title}
            </Link>
            {notice.created_at && (
              <p className="text-sm text-gray-500">작성일: {notice.created_at}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
