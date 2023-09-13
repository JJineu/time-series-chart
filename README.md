# Search disease

# 💡 프로젝트 개요

특정 지역의 데이터를 시계열 차트로 나타내는 웹 프로젝트입니다.

- 진행 기간: 약 2일(2023.09.11 ~ 2023.09.13)

- 개발 인원 : 1인 [@김현진](https://github.com/JJineu)

- 배포 주소 : [https://time-series-chart-kappa.vercel.app/](https://time-series-chart-kappa.vercel.app/)

<br>

※ 개발 과정은 Notion으로 정리했습니다.

- [Notion](https://www.notion.so/ongoingjin/week-03-like-react-query-7ace65753c054860b957115aff724363)

<br>

주요 구현 사항

- 주어진 데이터로 시계열 차트 구성

- 호버 기능

- 필터링 기능

<br>

<br>

# 🧑🏻‍💻 프로젝트 정보

<br>
<p align='center'>
<img src='https://github.com/JJineu/time-series-chart/assets/96639305/b23b5ab8-62c0-40a7-ab90-ab0d838a3c5f'>
</p>
<br>

### 실행 방법

- 다음 링크를 클릭하시거나, [https://time-series-chart-kappa.vercel.app/](https://time-series-chart-kappa.vercel.app/)

- 프로젝트를 clone 하여 실행할 수 있습니다.

  ```jsx
  // 실행하기 위해서는 Node.js가 설치된 환경이 필요합니다.
  git clone https://github.com/JJineu/time-series-chart.git
  yarn
  yarn dev
  ```

  ```jsx
  // .env 설정이 필요합니다.
  VITE_BASE_URL=http://localhost:3000
  ```

### 프로젝트 구조

```jsx
src
 ┣ 📂 components  컴포넌트 분리
 ┣ 📂 constants   상수 처리
 ┣ 📂 context     context api
 ┣ 📂 httpClient  httpClient instance
 ┣ 📂 pages
 ┣ 📂 services    service instance
 ┣ 📂 styles
 ┣ 📂 types
 ┗ 📂 utils

```

### 개발 환경 및 사용기술

- JavaScript / TypeScript / React
- build tool: vite
- HTTP Client: fetch
- chart: Chart.js
- style: Styled-components

```jsx
// dependencies
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
// devDependencies
    "chart.js": "^4.4.0",
    "react-chartjs-2": "^5.2.0",
    "styled-components": "^6.0.7",
    "typescript": "^5.0.2",
    "vite": "^4.4.5"
```

<br>
<br>

# 📝 구현 상세 내용

## 1. Chart.js 선정 및 커스터마이징

Chart 라이브러리는 대략 Canvas 방식과 SVG 렌더링 방식으로 나뉩니다. Canvas 방식은 렌더링 속도가 빠르지만 픽셀 기반이라 이미지가 손상되어 보일 수 있고, 반면에 SVG 방식은 고화질 처리가 가능하고 이벤트 핸들러도 지원됩니다.
필터링 기능이 중요하므로 Canvas 방식을, 요구사항을 염두하여 사용해야 될 차트 종류가 많지 않아 기본적인 도구 및 반응적인 디자인을 적용한 라이브러리를 찾았고, 결론적으로 사용자가 가장 많아 안정성이 높을 것으로 예상되는 Chart.js 를 선정하게 되었습니다.

Chartjs는 plugin으로 차트 인스턴스 간 공유할 수 있는 옵션을 커스터마이징 할 수 있습니다. 옵션 항목에 파싱한 데이터를 반환하면 커스텀이 되는데, 항목마다 Chart context를 받을 수 있고 callback 혹은 정해진 함수를 이용해서 데이터를 가공할 수 있습니다.
tooltip은 callback으로 chart context를 {id, value_area, value_bar}로 파싱하여 전달했고, x축 부분은 요구사항에는 없었지만 afterTickToLabelConversion라는 프로퍼티를 이용하여 x축 데이터를 30초 단위로 나타나도록 가공했습니다.

## 2. 차트 데이터 상태를 공유하기 위한, context api 사용

차트 데이터를 fetch 하는 부분, 차트를 그리는 부분, 필터링하는 부분이 모두 차트 데이터를 필요로 하여,
공통의 상태를 props 보다 편리하게 공유하고자 context api를 사용하였습니다.
또한, 추후 변경을 고려하여 httpClient와 더불어 chartService 구현체를 사용했습니다.

```jsx
export function ChartProvider({
  children,
  chartService,
}) {
  const [data, setData] = useState<Idata[]>([]);
  const [filterID, setFilterID] = useState<string | null>(null);

  useEffect(() => {
    chartService.get().then((data) => {
      const parsedData = parsingData(data);
      setData(parsedData);
    });
  }, [chartService, setData]);
...
}
```
