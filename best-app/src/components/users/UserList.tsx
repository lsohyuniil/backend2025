import { useState, useEffect } from "react";
import type { UserListResponse } from "./types/User";
import { apiUserList } from "../../api/userApi";

export default function UserList() {
  const [users, setUsers] = useState<UserListResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 인증 사용자, 인가 사용자 (권한 : ADMIN) 여부를 검사하는 로직

    // 관리자일 경우 사용자 목록 가져오기 - API 요청
    const fetchUsers = async () => {
      try {
        const res = await apiUserList();
        setUsers(res);
      } catch (error) {
        alert("회원 목록 조회 중 에러 발생 " + (error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div>
        <h4 className="text-center my-4">Loading...</h4>
      </div>
    );
  }

  return (
    <div className="container py-3">
      <h2 className="text-center my-4">회원 목록 [Admin Page - 관리자 전용]</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>회원 ID</th>
            <th>이름</th>
            <th>이메일</th>
            <th>등록일</th>
            <th>ROLE</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.indate}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
