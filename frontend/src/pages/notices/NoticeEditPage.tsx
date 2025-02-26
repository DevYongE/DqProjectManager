// src/pages/notices/NoticeEditPage.tsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function NoticeEditPage() {
  const { noticeId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const fetchNotice = async () => {
    try {
      if (!noticeId) return;
      const response = await axios.get(`http://localhost:5000/api/notices/${noticeId}`);
      const notice = response.data.notice;
      setTitle(notice.title);
      setContent(notice.content);
    } catch (err: any) {
      console.error("공지사항 가져오기 오류:", err);
      setError("공지사항을 불러오는 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchNotice();
  }, [noticeId]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!noticeId) return;
      await axios.put(`http://localhost:5000/api/notices/${noticeId}`, { title, content });
      navigate(`/notices/${noticeId}`);
    } catch (err: any) {
      console.error("공지사항 수정 오류:", err);
      setError("공지사항을 수정하는 중 오류가 발생했습니다.");
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">공지사항 수정</h1>

      <form onSubmit={handleUpdate} className="space-y-4 max-w-md">
        <div>
          <label className="block font-semibold mb-1">제목</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">내용</label>
          <textarea
            className="w-full p-2 border rounded"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          수정
        </button>
      </form>
    </div>
  );
}
