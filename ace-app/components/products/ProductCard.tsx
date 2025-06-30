import Link from "next/link";
// import Image from "next/image";
import React from "react";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image_url: string;
  spec?: string;
}
export default function ProductCard({
  id,
  name,
  price,
  image_url,
  spec,
}: ProductCardProps) {
  return (
    <Link href={`/products/${id}`} className={styles.card}>
      <img src={image_url} alt={name} className={styles.image} />
      <div className={styles.name}>
        [{spec}] {name}
      </div>
      <div className={styles.price}>{price.toLocaleString()}원</div>
    </Link>
  );
}
