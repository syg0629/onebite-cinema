import MovieItem from "@/components/movie-item";
import style from "./page.module.css";
import { MovieData } from "@/types";

async function Allmovies() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SEVER_URL}/movie`,
    { cache: "no-store" }
  );
  if (!response.ok) return <div>오류가 발생했습니다...</div>;
  const allmovies: MovieData[] = await response.json();

  return allmovies.map((movie) => <MovieItem key={movie.id} {...movie} />);
}

async function Recomovies() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SEVER_URL}/movie/random`,
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
          <Recomovies />
        </div>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <div className={style.all_container}>
          <Allmovies />
        </div>
      </section>
    </div>
  );
}
