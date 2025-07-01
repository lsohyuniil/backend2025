import styles from "@/styles/Home.module.css";
import type { Product } from "../../types/Product";
import type { TimeDeal } from "../../types/TimeDeal";
import ProductList from "../../components/products/ProductList";
import TimeDealSlider from "./products/TimeDealSlider";

interface Props {
  bestProducts: Product[];
  hitProducts: Product[];
  timeDeals: TimeDeal[];
}

// SSG - 빌드 타임에 사전 렌더링. 정적인 페이지를 구성할 때 사용 : getStaticProps()
// SSR - 요청이 있을 때마다 사전 렌더링. 동적인 페이지 구성할 때 사용 : getServerProps()

// 동적 라우팅 /pages/cart/[uid].tsx
export default function Home({ bestProducts, hitProducts, timeDeals }: Props) {
  return (
    <>
      <div className={styles.container}>
        <h1>Home</h1>
        <TimeDealSlider deals={timeDeals} title="⏰ 지금 진행 중인 타임딜" />
        <br />
        <div style={{ padding: "1rem" }}>
          <ProductList products={bestProducts} title="👍 BEST 상품" />
        </div>
        <div style={{ padding: "1rem" }}>
          <ProductList products={hitProducts} title="⭐️ HIT 상품" />
        </div>
      </div>
    </>
  );
}

// SSG + 일정 기간이 지나면 수정된 데이터를 반영하게끔 => ISR
export async function getStaticProps() {
  try {
    const url1 = `http://localhost:7777/api/products/spec`;
    const url2 = `http://localhost:7777/api/timeDeals`;

    const bestRes = await fetch(url1 + "?spec=best");
    const hitRes = await fetch(url1 + `?spec=hit`);
    const timeDealsRes = await fetch(url2);

    const bestProducts = await bestRes.json();
    const hitProducts = await hitRes.json();
    const timeDeals = await timeDealsRes.json();

    return {
      props: {
        bestProducts,
        hitProducts,
        timeDeals,
      },
      revalidate: 60 * 5, // 초단위 : 5분 뒤에 update => ISR
      // [1] 초기에는 SSG로 정적인 페이지를 생성
      // [2] 요청이 들어오고 revalidate에 지정된 시간이 만료되면 (5분이 지나면) SSR을 수행해서 페이지를 재생성
      // [3] 재생성한 페이지를 정적으로 다시 저장하고 응답을 보냄
      // [4] 다음 요청부처는 재생성된 정적인 페이지를 응답으로 서비스하게 됨
    };
  } catch (error) {
    console.error("상품 가져오기 실패: ", error);

    return {
      props: {
        bestProducts: [],
        hitProducts: [],
        timeDeals: [],
      },
    };
  }
}
