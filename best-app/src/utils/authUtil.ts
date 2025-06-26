/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

// jwt payload type
interface JWTPayload {
  exp: number;
  [key: string]: any;
}

// 토큰이 유효한지 여부를 체크하는 함수. 유효하지 않으면 true 반환할 예정
export const checkTokenExpiration = (token: string): boolean => {
  try {
    // header.payload.signature
    const payload = JSON.parse(atob(token.split(".")[1])) as JWTPayload;
    const expTime = payload.exp * 1000; // exp 초단위
    const isExpired = expTime < Date.now();
    // 1시 < 2시 -> 유효시간이 지난 경우 -> true
    // 3시 < 2시 -> 유효시간이 남은 경우 -> false
    return isExpired;
  } catch (error) {
    console.error("잘못된 토큰 포맷 에러 : ", error);
    return true; // 오류 발생시 만료된 것으로 간주
  }
};

export const refreshAcessToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    console.log("refreshToken 없음");
    return null;
  }

  // refreshToken을 보내서 서버로부터 검증을 받기 -> 검증 통과시 새 accessToken을 받음
  try {
    const response = await axios.post(
      `http://localhost:7777/api/auth/refresh`,
      {
        refreshToken,
      }
    );
    const newAcessToken = await response.data?.accessToken;
    // 서버에서 보낸 데이터 : {accessToken : newAccessToken}

    return newAcessToken;
  } catch (error) {
    console.error("refreshToken error : ", error);

    return null;
  }
};
