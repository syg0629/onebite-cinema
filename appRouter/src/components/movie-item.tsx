import type { MovieData } from "@/types";
import Link from "next/link";
import style from "./movie-item.module.css";

export default function MovieItem({ id, posterImgUrl }: MovieData) {
  return (
    <Link href={`/movie/${id}`} className={style.container}>
      <img src={posterImgUrl} />
    </Link>
  );
}
