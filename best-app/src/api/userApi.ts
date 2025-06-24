import axiosInstance from "./axiosInstance";
import type {
  User,
  CreateUserResponse,
  CreateEmailResponse,
  UserListResponse,
} from "../components/users/types/User";

// 회원가입 요청
export const apiSignup = async (user: User): Promise<CreateUserResponse> => {
  const respone = await axiosInstance.post("/users", user);

  return respone.data; // result, msg, data : {insertId:회원번호}
};

// 이메일 중복 체크
export const apiCheckEmail = async (
  email: string
): Promise<CreateEmailResponse> => {
  const respone = await axiosInstance.post("/users/duplex", { email });
  return respone.data;
};

// 전체 회원 목록 /api/admin/users
export const apiUserList = async (): Promise<UserListResponse[]> => {
  const respone = await axiosInstance.get("/admin/users");

  return respone.data;
};
