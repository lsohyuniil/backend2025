import { create } from "zustand";
import type { Role } from "../components/users/types/User";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role?: Role;
  accessToken?: string;
  refreshToken?: string;
}

// 상태 정의
interface AuthState {
  authUser: AuthUser | null;
  isLoading: boolean; // App에서 인증요청을 모두 마치고 authUser state값을 셋팅하는 동안 로딩 상태 유지
  loginAuthUser: (user: AuthUser) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  isLoading: true,
  loginAuthUser: (user) => set(() => ({ authUser: user })),
  logout: () => set(() => ({ authUser: null })),
  setLoading: (loading: boolean) => set(() => ({ isLoading: loading })),
}));
