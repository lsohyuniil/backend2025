- 다중 동적 라우팅
  - /category/clothes/100, /category/elec/200

- catch-all / optional catch all
  - search/mac/notebook
    mac, notebook 검색어가 여러 개 들어 올 경우 : /pages/search/[[...keywords]].tsx
    => catch all 라우팅 /pages/search/[...keywords].tsx
    - 이 경우는 search/a, search/a/b/c와 같이 1개 이상의 세그먼트가 있을 때만 매치됨
    - /search => 매치되지 않고 404 발생
    => optional catch all [[...keywords]].tsx
    - 선택적 라우트가 되어 /search도 매치되어 나옴

- 홈페이지 레이아웃 구조 갖추기
1. components/Header.tsx
            Footer.tsx
            Layout.tsx
2. _app.tsx에서 Layout wrapping

- components/products/ProductCart 컴포넌트
                      ProductList 컴포넌트