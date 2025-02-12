import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Notice {
  id: number;
  title: string;
  content: string;
  created_at?: string;
}

export default function NoticeDetailPage() {
  const { noticeId } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState<Notice | null>(null);
  const [error, setError] = useState("");

  const fetchNotice = async () => {
    try {
      if (!noticeId) return;
      const response = await axios.get(`http://localhost:5000/api/notices/${noticeId}`);
      setNotice(response.data.notice); // notice = { id, title, content, ... }
    } catch (err: any) {
      console.error("공지사항 상세 조회 오류:", err);
      setError("공지사항을 불러오는 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchNotice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noticeId]);

  const handleDelete = async () => {
    try {
      if (!noticeId) return;
      await axios.delete(`http://localhost:5000/api/notices/${noticeId}`);
      navigate("/notices");
    } catch (err: any) {
      console.error("공지사항 삭제 오류:", err);
      setError("공지사항을 삭제하는 중 오류가 발생했습니다.");
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!notice) {
    return <p>로딩 중...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">공지사항 상세</h1>
      <div className="bg-white shadow p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">{notice.title}</h2>
        {notice.created_at && (
          <p className="text-sm text-gray-500 mb-2">
            작성일: {notice.created_at}
          </p>
        )}
        <p className="mb-4">{notice.content}</p>
      </div>

      <div className="mt-4 space-x-2">
        <Link
          to={`/notices/${notice.id}/edit`}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          수정
        </Link>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          삭제
        </button>
      </div>
    </div>
  );
}