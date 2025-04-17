import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import MovieItem from "@/components/movie-item";
import style from "./index.module.css";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchMovies from "@/lib/fetch-movies";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  //GetServerSidePropsContext 현재 브라우저로부터 받은 요청에 대한 모든 정보를 담고 있음
  const q = context.query.q
  const searchedMovies = await fetchMovies(q as string);
  
  return {
    props: { searchedMovies },
  };
};

export default function Page({searchedMovies}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={style.container}>
      {searchedMovies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
