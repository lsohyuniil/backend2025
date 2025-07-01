import React from "react";
import type { Product } from "../../types/Product";
import ProductCard from "./ProductCard";
import styles from "./ProductList.module.css";

interface ProductListProps {
  products: Product[];
  title?: string;
}

export default function ProductList({ products, title }: ProductListProps) {
  if (!products || products.length === 0) {
    return (
      <div className={styles.row}>
        <h3>상품 준비 중</h3>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.row}>
        {products.map((prod) => (
          <ProductCard key={prod.id} {...prod} />
        ))}
      </div>
    </div>
  );
}
