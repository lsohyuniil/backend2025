/* 
postStore.ts : post 목록 가져오기, 1건 post 조회, post 삭제 관리 (서버 통신 로직 중심)
postFormStore.ts : post 글 쓰기/수정에 필요한 폼 입력 상태 관리 (UI 상태 중심)
*/

import { create } from "zustand";
import type { Post } from "../components/posts/types/Post";
import { apiFetchPostList } from "../api/postApi";

interface PostState {
  postList: Post[];
  totalCount: number;

  fetchPostList: () => Promise<void>;
}

export const usePostStore = create<PostState>((set) => ({
  postList: [],
  totalCount: 0,
  fetchPostList: async () => {
    try {
      // api 호출 -> 반환해주는 목록, 게시글 수를 set
      const data = await apiFetchPostList();

      set({ postList: data.data, totalCount: data.totalCount });
    } catch (error) {
      alert("목록 가져오기 실패 : " + (error as Error).message);
    }
  },
}));
