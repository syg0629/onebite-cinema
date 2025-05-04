import { notFound } from "next/navigation";
import style from "./page.module.css";

// generateStaticParams로 만들지 않은 페이지는 다 404 에러 페이지로 이동
// export const dynamicParams = "false";

// 동적 경로를 사용하는 페이지를 정적 페이지로 만들고 싶다면,
// `generateStaticParams`라는 약속된 함수를 사용해 빌드 타임에 어떤 URL 파라미터가 존재할지 직접 반환해야 함
// URL 파라미터 값을 명시할 때에는 문자열 데이터로만 명시
// generateStaticParams를 쓰는 순간, 그 페이지는 무조건 정적으로 생성, 컴포넌트 내부에 동적 데이터 패칭을 해도 무시
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string | string[] }>;
}) {
  const { id } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${id}`
  );
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다...</div>;
  }
  const movie = await response.json();

  const {
    title,
    releaseDate,
    company,
    genres,
    subTitle,
    description,
    runtime,
    posterImgUrl,
  } = movie;

  return (
    <div className={style.container}>
      <div
        className={style.poster_img_container}
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
      >
        <img src={posterImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.movie_details}>
        {releaseDate} / {genres} / {runtime}
      </div>
      <div>{company}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
