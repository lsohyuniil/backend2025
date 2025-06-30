import React from "react";
import type { Product } from "../../../types/Product";
import { GetServerSideProps } from "next";

// SSR

interface Props {
  product: Product;
}

export default function ProductDetailPage({ product }: Props) {
  return (
    <div>
      name: {product.name}
      <br />
      price: {product.price.toLocaleString()} 원
      <br />
      <img
        src={product.image_url}
        alt={product.name}
        style={{ width: "220px" }}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // products?sort=idDESC => context.query.sort
  // /products/1 => context.prams.id

  const id = context.params?.id;
  const response = await fetch(`http://localhost:7777/api/products/${id}`);

  if (!response.ok) {
    return {
      notFound: true, // 404
    };
  }

  const product = await response.json();

  return {
    props: {
      product,
    },
  };
};
