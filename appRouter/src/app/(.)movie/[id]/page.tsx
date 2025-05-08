import MoviePage from "@/app/movie/[id]/page";
import Modal from "@/components/modal";

// 인터셉팅 라우트는 링크를 클릭한다던가, router.push()를 통해서 페이지를 이동하는 클라이언트 사이드 렌더링 방식으로
// 페이지를 이동할 때, 그 페이지를 가로채서 다른 페이지로 이동할 수 있도록 해주는 기능
// 페이지를 새로고침해서 초기 접속 요청을 날리게 되면 인터셉팅 라우트가 작동하지 않음
export default function Page(props: any) {
  return (
    <Modal>
      가로채기 성공!
      <MoviePage {...props} />
    </Modal>
  );
}
