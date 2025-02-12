import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

interface Notice {
  id: number;
  title: string;
  content: string;
  created_at?: string;
}

export default function NoticeListPage() {
  // 처음부터 빈 배열로 초기화하여 map 에러 방지
  const [notices, setNotices] = useState<Notice[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchNotices = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/notices");
      // 서버가 '[]' 형태(순수 배열)로 응답한다면 그대로 set
      setNotices(response.data.notices);
    } catch (err: any) {
      console.error("공지사항 목록 가져오기 오류:", err);
      setError("공지사항을 불러오는 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

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
