import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

// zod 스키마
const loginSchema = z.object({
  email: z.string().email("유효한 이메일을 입력하세요."),
  password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
});

type LoginFormType = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
  });

  // 폼 제출 로직
  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email: data.email,
        password: data.password,
      });

      // 백엔드에서 status='success'와 token을 함께 보내준다고 가정
      if (response.data.status === "success") {
        // 토큰 로컬 저장
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", data.email);
        // 페이지 이동
        navigate("/");
      } else {
        // status='error'인 경우, message를 표시
        setError(response.data.message || "로그인에 실패했습니다.");
      }
    } catch (err: any) {
      console.error("로그인 오류:", err);
      // 서버에서 오는 에러 메시지가 있을 경우 사용, 없으면 기본 메시지
      setError(
        err.response?.data?.message || "로그인 실패. 이메일 또는 비밀번호를 확인하세요."
      );
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col justify-center items-center">
      {/* 로그인 박스 */}
      <div className="w-full max-w-md bg-white rounded-md shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="이메일"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />
          <Input
            label="비밀번호"
            type="password"
            {...register("password")}
            error={errors.password?.message}
          />

          <Button type="submit" className="w-full">
            로그인
          </Button>
        </form>

        {/* 회원가입 & 비밀번호 찾기 링크 섹션 */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-gray-600">
            아직 계정이 없으신가요?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              회원가입
            </Link>
          </p>
          <p className="text-gray-600">
            비밀번호를 잊으셨나요?{" "}
            <Link
              to="/forgot-password"
              className="text-blue-600 font-semibold hover:underline"
            >
              비밀번호 찾기
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
