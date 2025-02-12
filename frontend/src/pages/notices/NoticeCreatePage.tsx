// src/pages/notices/NoticeCreatePage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function NoticeCreatePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId"); // ✅ 숫자로 변환
      console.log(userId);
      if (userId == null || userId == '' ) {
        setError("로그인이 필요합니다.");
        return;
      }
  
      await axios.post("http://localhost:5000/api/notices", {
        title,
        content,
        created_by: 4, // ✅ 올바른 ID 전달
      });
  
      navigate("/notices");
    } catch (err: any) {
      console.error("공지사항 생성 오류:", err);
      setError("공지사항을 생성하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">공지사항 생성</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
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
          생성
        </button>
      </form>
    </div>
  );
}
