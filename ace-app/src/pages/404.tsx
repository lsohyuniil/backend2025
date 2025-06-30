import Link from "next/link";
import React from "react";
import styles from "./404.module.css";
// css 파일명 : 컴포넌트명.module.css
export default function Page404() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404-페이지를 찾을 수 없습니다.</h1>
      <p className={styles.description}>
        요청하신 페이지는 존재하지 않거나 삭제되었습니다.
      </p>
      <Link href={"/"} className={styles.homeButton}>
        홈으로 돌아가기
      </Link>
    </div>
  );
}
