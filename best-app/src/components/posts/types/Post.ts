export interface Post {
  id: number;
  writer: string;
  title: string;
  content: string;
  file?: string; // 업로드 파일 (선택 사항 옵션)
  wdate?: string;
}
