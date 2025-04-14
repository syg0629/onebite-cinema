import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import style from "./index.module.css";
import movie from "@/mock/dummy.json";
import MovieItem from "@/components/movie-item";
import { InferGetServerSidePropsType } from "next";
import fetchMovies from "@/lib/fetch-movies";

export const getServerSideProps = async () => {
  // 사전 렌더링 과정에서 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수. 객체를 반환해야 함.
  // 서버 측에서 실행
  const allMovies = await fetchMovies();

  return {
    props: { allMovies },
  };
};

export default function Home({
  allMovies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  //함수 반환값 타입을 추론하는 유틸리티
  console.log(allMovies);

  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={style.recommand_container}>
          {movie.slice(0, 3).map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className={style.all_container}>
          {movie.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
