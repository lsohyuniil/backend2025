import { Link } from "react-router";
import { usePostStore } from "../../stores/postStore";
import { useEffect } from "react";

const PostList: React.FC = () => {
  const fetchPostList = usePostStore((state) => state.fetchPostList);
  const postList = usePostStore((s) => s.postList);
  const totalCount = usePostStore((s) => s.totalCount);

  useEffect(() => {
    fetchPostList();
  }, []);

  return (
    <div className="post-list">
      <h3>총 게시글 수 : {totalCount}개</h3>
      {postList.map((post, index) => (
        <div
          key={index}
          className="d-flex my-3 p-3"
          style={{ background: "#efefef", borderRadius: 10 }}
        >
          <div style={{ width: "25%" }}>
            <img
              src={
                post.file
                  ? `http://localhost:7777/uploads/${post.file}`
                  : `http://localhost:7777/images/noImage.png`
              }
              alt={post.title}
              className="postImage"
            />
          </div>
          <div className="flex-grow-1 ms-3">
            <h5>
              작성자: {post.writer}
              <br />
              <small>
                <i>Posted on {post.wdate}</i>
              </small>
            </h5>
            <Link to={`/posts/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
          </div>
        </div>
      ))}
      {/* 페이지 네비게이션 */}
      <div></div>
      <div></div>
    </div>
  );
};

export default PostList;
