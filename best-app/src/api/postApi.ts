// post 관련 api 요청을 서버에 보내는 모듈
import type { Post } from "../components/posts/types/Post";
import axiosInstance from "./axiosInstance";

// post 목록 가져오기
export interface PostResponse {
  data: Post[];
  totalCount: number;
  // totalPages: number;
}

// post 목록 가져오기
export const apiFetchPostList = async (): Promise<PostResponse> => {
  const response = await axiosInstance.get("/posts");
  // response.data.data => 글 목록
  // response.data.totalCount => 게시글 수
  return response.data;
};

// post 새 글 등록하기
export const apiCreatePost = async (data: FormData): Promise<Post> => {
  const response = await axiosInstance.post("/posts", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data as Post;
};
