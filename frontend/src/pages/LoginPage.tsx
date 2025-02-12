import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

// ✅ zod 스키마 타입 정의
const loginSchema = z.object({
  email: z.string().email("유효한 이메일을 입력하세요."),
  password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
});

// ✅ TypeScript 타입 추출
type LoginFormType = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ useForm에 타입을 명시적으로 지정
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
  });

  // ✅ SubmitHandler<LoginFormType>을 사용하여 타입 맞추기
  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    try {
      const response = await axios.post("/api/auth/login", data);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("로그인 오류:", err); // ✅ 콘솔에 에러 출력하여 사용
      setError("로그인 실패. 이메일 또는 비밀번호를 확인하세요.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">로그인</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input label="이메일" type="email" {...register("email")} error={errors.email?.message} />
          <Input label="비밀번호" type="password" {...register("password")} error={errors.password?.message} />
          <Button type="submit">로그인</Button>
        </form>
      </div>
    </div>
  );
}
