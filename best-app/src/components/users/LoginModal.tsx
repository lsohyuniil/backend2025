import type { ChangeEvent, FormEvent } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useAuthStore } from "../../stores/authStore";
import type { AuthUser } from "../../stores/authStore";
import { useState, useRef } from "react";
import { SiElsevier } from "react-icons/si";
import { GiEskimo } from "react-icons/gi";
import { apiSignin } from "../../api/userApi";

interface LoginModalProps {
  show: boolean;
  setShowLogin: (show: boolean) => void;
}

const LoginModal = ({ show, setShowLogin }: LoginModalProps) => {
  const [loginUser, setLoginUser] = useState<{ email: string; passwd: string }>(
    { email: "", passwd: "" }
  );
  const loginAuthUser = useAuthStore((s) => s.loginAuthUser);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwdRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const { email, passwd } = loginUser;
    if (!email.trim()) {
      alert("아이디를 입력하세요.");
      emailRef.current?.focus();
      return;
    }
    if (!passwd.trim()) {
      alert("비밀번호를 입력하세요.");
      passwdRef.current?.focus();
      return;
    }

    requestLogin();
  };

  const requestLogin = async () => {
    try {
      const res = await apiSignin(loginUser);
      // alert(JSON.stringify(res));
      const { result, message, data } = res;

      if (result === "success") {
        alert(message + `${data?.name}님 환영합니다.`);

        if (data) {
          const { accessToken, refreshToken } = data;

          // 회원 정보, 토큰들 loginAuthUser 통해서 전달. 전역적 state로 관리하기 위해
          loginAuthUser({ ...data });

          // sessionStorage, localStorage에 accessToken, refreshToken 저장
          sessionStorage.setItem("accessToken", accessToken!);
          localStorage.setItem("refreshToken", refreshToken!);
        }
      } else {
        alert(message + "로그인 실패");
      }

      setShowLogin(false); // 모달창 닫기

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      // alert((error as Error).message);
      alert(error.response?.data?.message ?? error.message);
    } finally {
      reset();
      emailRef.current?.focus();
    }
  };

  const reset = () => {
    setLoginUser({ email: "", passwd: "" });
  };

  return (
    <Modal show={show} centered onHide={() => setShowLogin(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          <Col className="p-4 mx-auto" xs={10} sm={10} md={8}>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={loginUser.email}
                  ref={emailRef}
                  placeholder="ID (email)"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="passwd"
                  onChange={handleChange}
                  value={loginUser.passwd}
                  ref={passwdRef}
                  placeholder="Password"
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button type="submit" variant="outline-success">
                  Login
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
