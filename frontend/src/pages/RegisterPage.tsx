import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

// ---------------------
// 1) Zod 스키마 정의
// ---------------------
const registerSchema = z.object({
  email: z.string().email("유효한 이메일을 입력하세요."),
  password: z
    .string()
    .min(6, "비밀번호는 최소 6자 이상이어야 합니다.")
    .max(20, "비밀번호는 최대 20자 이하로 작성하세요."),
  confirmPassword: z
    .string()
    .min(6, "비밀번호를 다시 입력하세요."), // 최소 길이만 단순 체크
  
  name: z.string().nonempty("이름을 입력하세요."),
  birthdate: z
    .string()
    .nonempty("생년월일을 입력하세요."), // 필요하면 .regex() 사용하여 형식 검증 가능
  position: z.string().nonempty("직책을 입력하세요."),
  join_date: z
    .string()
    .nonempty("입사일을 입력하세요."), // 필요하면 .regex() 사용하여 형식 검증 가능
  team: z.string().nonempty("팀을 입력하세요."),
});

// 2) 비밀번호와 비밀번호 확인이 일치하는지 refine 체크
const enhancedRegisterSchema = registerSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"], // 여기 필드에 에러 메시지 표시
  }
);

// 3) 스키마에서 타입 추출
type RegisterFormType = z.infer<typeof enhancedRegisterSchema>;

export default function RegisterPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 4) react-hook-form 설정
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(enhancedRegisterSchema),
  });

  // 5) 폼 전송 로직
  const onSubmit: SubmitHandler<RegisterFormType> = async (data) => {
    try {
      // 회원가입 API 요청
      // confirmPassword는 서버에 보낼 필요가 없으므로 제외
      await axios.post("/api/auth/register", {
        email: data.email,
        password: data.password,
        name: data.name,
        birthdate: data.birthdate,
        position: data.position,
        join_date: data.join_date,
        team: data.team,
      });
      // 회원가입 성공 시 로그인 페이지(또는 원하는 라우트)로 이동
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

          {/* 비밀번호 확인 */}
          <Input
            label="비밀번호 확인"
            type="password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />

          {/* 이름 */}
          <Input
            label="이름"
            type="text"
            {...register("name")}
            error={errors.name?.message}
          />

          {/* 생년월일 */}
          <Input
            label="생년월일"
            type="date" // 브라우저 기본 날짜 선택 UI 사용
            {...register("birthdate")}
            error={errors.birthdate?.message}
          />

          {/* 직책 */}
          <Input
            label="직책"
            type="text"
            {...register("position")}
            error={errors.position?.message}
          />

          {/* 입사일 */}
          <Input
            label="입사일"
            type="date"
            {...register("join_date")}
            error={errors.join_date?.message}
          />

          {/* 팀 */}
          <Input
            label="팀"
            type="text"
            {...register("team")}
            error={errors.team?.message}
          />

          <Button type="submit" className="w-full">
            회원가입
          </Button>
        </form>

        {/* 이미 계정이 있는 경우 로그인 페이지 이동 링크 */}
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
