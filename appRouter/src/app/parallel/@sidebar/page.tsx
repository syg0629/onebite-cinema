// slot(슬롯): 병렬로 렌더링될 페이지 컴포넌트를 보관하는 폴더
// 이 컴포넌트는 부모인 layout.tsx에 props로 자동 전달
// 그때 props의 이름은 이 슬롯의 이름인 sidebar가 됨
// Slot은 URL 경로에 아무런 영향을 미치지 않음(like. Route Group 라우트 그룹)
export default function Page() {
  return <div>@sidebar</div>;
} 