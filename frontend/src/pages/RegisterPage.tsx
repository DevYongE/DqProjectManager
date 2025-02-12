import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

// 1) Zod 스키마에서 DB 컬럼명과 동일하게 snake_case 또는 그대로 사용
//    position 은 예약어 이슈로 DB에서 "position"처럼 따옴표를 쓰는 경우가 있지만
//    여기서는 key 값 그대로 position 사용.
const registerSchema = z.object({
  email: z.string().email("유효한 이메일을 입력하세요."),
  password: z
    .string()
    .min(6, "비밀번호는 최소 6자 이상이어야 합니다.")
    .max(20, "비밀번호는 최대 20자 이하로 작성하세요."),
  name: z.string().nonempty("이름을 입력하세요."),
  birthDate: z.string().nonempty("생년월일을 입력하세요."),
  position: z.string().nonempty("직책(포지션)을 입력하세요."),
  joinDate: z.string().nonempty("입사일을 입력하세요."),
  team_name: z.string().nonempty("팀 이름을 입력하세요."),
});

// 2) 스키마에서 타입 추출
type RegisterFormType = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 3) react-hook-form 설정
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
  });

  // 4) 폼 전송 로직
  const onSubmit: SubmitHandler<RegisterFormType> = async (data) => {
    try {
      // 실제 API 경로와 맞춰서 수정 (예: localhost:5000 등)
      await axios.post("http://localhost:5000/api/auth/register", {
        email: data.email,
        password: data.password,
        name: data.name,
        birthDate: data.birthDate,
        position: data.position,
        joinDate: data.joinDate,
        team_name: data.team_name,
      });
      // 회원가입 성공 후 이동할 라우트
      navigate("/login");
    } catch (err) {
      console.error("회원가입 오류:", err);
      setError("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="w-full max-w-md bg-white rounded-md shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">회원가입</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* 이메일 */}
          <Input
            label="이메일"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />

          {/* 비밀번호 */}
          <Input
            label="비밀번호"
            type="password"
            {...register("password")}
            error={errors.password?.message}
          />

          {/* 이름 */}
          <Input
            label="이름"
            type="text"
            {...register("name")}
            error={errors.name?.message}
          />

          {/* 생년월일 (YYYY-MM-DD) */}
          <Input
            label="생년월일"
            type="date"
            {...register("birthDate")}
            error={errors.birthDate?.message}
          />

          {/* 직책(포지션) */}
          <Input
            label="직책"
            type="text"
            {...register("position")}
            error={errors.position?.message}
          />

          {/* 입사일 (YYYY-MM-DD) */}
          <Input
            label="입사일"
            type="date"
            {...register("joinDate")}
            error={errors.joinDate?.message}
          />

          {/* 팀 이름 */}
          <Input
            label="팀 이름"
            type="text"
            {...register("team_name")}
            error={errors.team_name?.message}
          />

          <Button type="submit" className="w-full">
            회원가입
          </Button>
        </form>

        {/* 이미 계정이 있는 경우 로그인 페이지로 이동 */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            이미 계정이 있으신가요?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
