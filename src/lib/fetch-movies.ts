import { MovieData } from "@/types";

export default async function fetchMovies(): Promise<MovieData[]> {
  const url = `http://localhost:12345/api/movie`;

  const response = await fetch(url);
  try {
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}
