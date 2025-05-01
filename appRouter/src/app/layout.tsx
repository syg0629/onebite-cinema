import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { MovieData } from "@/types";

async function Footer() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    return <footer className={style.footer}>오류가 발생했습니다...</footer>;
  }

  const movies: MovieData[] = await response.json();
  const movieCount = movies.length;
  return (
    <footer className={style.footer}>
      {movieCount}개의 영화가 등록되어 있습니다.
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header className={style.header}>
            <Link href={"/"}>ONEBITE CINEMA</Link>
          </header>
          <main className={style.main}>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
