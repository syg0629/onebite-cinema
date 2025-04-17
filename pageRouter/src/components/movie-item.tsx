import Link from "next/link";
import { MovieData } from "../types";
import style from "./movie-item.module.css";

export default function MovieItem({ id, posterImgUrl }: MovieData) {
  return (
    <Link href={`/movie/${id}`} className={style.container}>
      <img src={posterImgUrl} />
    </Link>
  );
}
