import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header style={{ background: "#222", color: "#fff", padding: "1rem" }}>
      <nav style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Link href={"/"}>
          <h1>Ace Shop</h1>
        </Link>
        <Link href={"/products"}>상품</Link>
        <Link href={"/admin/timeDeal"}>타임딜 관리</Link>

        <div style={{ marginLeft: "auto", display: "flex", gap: "1rem" }}>
          <Link href={"/about"}>About</Link>
          <Link href={"/cart/king"}>Cart</Link>
          <Link href={"/category/Clothes/100"}>Category</Link>
        </div>
      </nav>
    </header>
  );
}
