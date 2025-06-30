import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  // children은 _app.tsx의 App 컴포넌트가 들어옴
  return (
    <>
      <Header />
      <main
        style={{
          minHeight: "100vh",
          padding: "2rem",
          background: "white",
          color: "black",
        }}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
