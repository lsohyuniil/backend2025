import React from "react";
import ProductList from "../../../components/products/ProductList";
import type { Product } from "../../../types/Product";
import styles from "./AllProductPage.module.css";
import { useRouter } from "next/router";

// const dummyProducts = [
//   {
//     id: 1,
//     name: "티셔츠",
//     price: 35000,
//     image_url: "/images/shirt_m1.jpg",
//     spec: "best",
//   },
// ];

interface Props {
  products: Product[];
  totalCount: number;
}

export default function AllProductPage({ products, totalCount }: Props) {
  // getServerSideProps 함수가 반환하는 props가 들어옴

  const router = useRouter();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = e.target.value; // 사용자가 선택한 정렬값 (latest, price_asc, price_desc)
    router.push(`/products?sort=${selectedSort}`);
    // router.push('/페이지') -> 페이지 이동. router.reload(), router.back()
  };

  return (
    <div style={{ padding: "2rem" }} className={styles.container}>
      <h2>🛍️ 전체 상품</h2>
      <div>
        <label>
          정렬 방식
          <select
            style={{ marginLeft: 8, marginRight: 8 }}
            onChange={handleSortChange}
          >
            <option value="latest">최신 상품순</option>
            <option value="price_asc">가격 낮은순</option>
            <option value="price_desc">가격 높은순</option>
          </select>
        </label>
        <span>총 상품 개수 : {totalCount} 개</span>
      </div>
      <div style={{ padding: "1rem" }}>
        <ProductList products={products} />
      </div>
      <div>페이지네이션</div>
    </div>
  );
}

// SSR => getServerSideProps() 함수 구성
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps(context: any) {
  try {
    // url의 queryString값 받기 SSR일 경우 : context.query를 이용해서 받음
    const sort = context.query.sort || "latest";
    console.log("getServerSideProps() sort: ", sort);

    let orderBy = "idDESC";
    if (sort === "price_asc") orderBy = "priceASC";
    if (sort === "price_desc") orderBy = "priceDESC";

    const queryString = `order=${orderBy}`;

    const url = `http://localhost:7777/api/products?${queryString}`;
    const response = await fetch(url);
    const data = await response.json();

    return {
      props: {
        products: data.products,
        totalCount: data.totalCount,
      },
    };
  } catch (error) {
    console.error("상품 데이터 가져오기 실패: ", error);
    return {
      props: {
        products: [],
        totalCount: 0,
      },
    };
  }
}
