// import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// 동적 라우팅 /pages/cart/[uid].tsx
export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <h1>Home</h1>
        <p>best 상품 Hit 상품 타임딜 상품 진열할 예정</p>
      </div>
    </>
  );
}
