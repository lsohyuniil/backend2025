import { useUserStore } from "../../stores/userStore";
import type { Role } from "./types/User";
import { useNavigate } from "react-router-dom";
import { useState, useRef, type ChangeEvent, type FormEvent } from "react";
import { apiSignup } from "../../api/userApi";
import { apiCheckEmail } from "../../api/userApi";

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const { user, duplicateChecked, setField, reset, setDuplicatedChecked } =
    useUserStore();
  const [dupMsg, setDupMsg] = useState(""); // 이메일 중복 체크 결과 메세지를 담을 state
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwdRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setField(e.target.name as keyof typeof user, e.target.value);
  };

  const handleChangeRole = (e: ChangeEvent<HTMLSelectElement>) => {
    setField("role", e.target.value as Role);
  };

  // 이메일 중복 체크
  const handleCheckEmail = async () => {
    if (!user.email.trim()) {
      alert("이메일을 입력해야 합니다.");
      emailRef.current?.focus(); // 입력 포커스 주기
      return;
    }

    try {
      const res = await apiCheckEmail(user.email.trim());
      alert(JSON.stringify(res));

      const isUse = res.result; // ok | duplex

      setDuplicatedChecked(isUse === "ok");
      setDupMsg(res.message);
    } catch (error) {
      alert("서버 에러 (이메일 중복 체크 실패) : " + (error as Error).message);
      // alert(
      //   "서버 에러 (이메일 중복 체크 실패) : " + error.response?.data?.message
      // );
      setDuplicatedChecked(false);
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { name, email, passwd } = user;

    if (!name.trim()) {
      alert("이름을 입력하세요.");
      nameRef.current?.focus();
      return;
    }
    if (!email.trim()) {
      alert("이메일을 입력하세요.");
      emailRef.current?.focus();
      return;
    }
    if (!passwd.trim()) {
      alert("비밀번호를 입력하세요.");
      passwdRef.current?.focus();
      return;
    }
    // 이메일 중복 체크 여부 확인
    if (!duplicateChecked) {
      alert("이메일 중복 여부 체크하세요.");
      emailRef.current?.focus();
      return;
    }

    try {
      // api 요청
      const res = await apiSignup(user);
      // alert(JSON.stringify(res));
      if (res.result === "success") {
        alert(`${res.message}\n회원번호 : ${res.data?.insertID}`);
        reset();
        navigate("/");
      } else {
        alert("회원가입 실패" + res.message);
      }
    } catch (error) {
      alert("서버 오류 : " + (error as Error).message);
    }
  };

  return (
    <div className="container py-4">
      <h1 className="text-center">Signup</h1>

      <form onSubmit={onSubmit}>
        {/* 이름 */}
        <div className="mb-3 col-md-8 offset-md-2">
          <label className="form-label">이름</label>
          <input
            className="form-control"
            name="name"
            ref={nameRef}
            value={user.name}
            onChange={handleChange}
          />
        </div>

        {/* 이메일 */}
        <div className="mb-3 col-md-8 offset-md-2">
          <label className="form-label">이메일</label>
          <input
            className="form-control"
            name="email"
            ref={emailRef}
            value={user.email}
            onChange={handleChange}
          />
          <button
            type="button"
            className="btn btn-outline-success mt-2"
            onClick={handleCheckEmail}
          >
            중복 체크
          </button>
          <div className="mt-1 small text-primary">{dupMsg}</div>
        </div>

        {/* 비밀번호 */}
        <div className="mb-3 col-md-8 offset-md-2">
          <label className="form-label">비밀번호</label>
          <input
            className="form-control"
            type="password"
            name="passwd"
            ref={passwdRef}
            value={user.passwd}
            onChange={handleChange}
          />
        </div>

        {/* 역할 */}
        <div className="mb-3 col-md-8 offset-md-2">
          <label className="form-label">역할</label>
          <select
            className="form-select"
            name="role"
            value={user.role}
            onChange={handleChangeRole}
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        {/* 버튼 */}
        <div className="text-center">
          <button className="btn btn-primary me-2" type="submit">
            회원가입
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => reset()}
          >
            다시 쓰기
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
