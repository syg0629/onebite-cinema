import MovieItem from "@/components/movie-item";
import style from "./page.module.css";
import { MovieData } from "@/types";
import { delay } from "../util/delay";
import { Suspense } from "react";
import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";

// export const dynamic = "force-dynamic";
// 특정 페이지의 유형을 강제로 Static, Dynamic 페이지로 설정
// 1. auto : 기본값, 아무것도 강제하지 않음
// 2. force-dynamic : 페이지를 강제로 Dynamic 페이지로 설정
// 3. force-static : 페이지를 강제로 Static 페이지로 설정
// 4. error : 페이지를 강제로 Static 페이지 설정 (설정하면 안되는 이유 -> 빌드 오류)

async function Allmovies() {
  await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
    { cache: "force-cache" }
  );
  if (!response.ok) return <div>오류가 발생했습니다...</div>;
  const allmovies: MovieData[] = await response.json();

  return allmovies.map((movie) => <MovieItem key={movie.id} {...movie} />);
}

async function Recomovies() {
  await delay(3000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`,
    { next: { revalidate: 3 } }
  );
  if (!response.ok) return <div>오류가 발생했습니다...</div>;
  const recomovies: MovieData[] = await response.json();

  return recomovies.map((movie) => <MovieItem key={movie.id} {...movie} />);
}

export default async function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <div className={style.recommand_container}>
          <Suspense fallback={<MovieListSkeleton count={3} />}>
            <Recomovies />
          </Suspense>
        </div>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <div className={style.all_container}>
          <Suspense fallback={<MovieListSkeleton count={5} />}>
            <Allmovies />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
