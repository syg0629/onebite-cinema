// 서버 액션 - 간결하고 편리하게 서버 측에서 실행되는 어떠한 동작을 정의
"use server";

import { delay } from "@/app/util/delay";
import { revalidateTag } from "next/cache";

export async function createReviewServerAction(_: any, formData: FormData) {
  const movieId = formData.get("movieId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!movieId || !content || !author) {
    return {
      status: false,
      error: "리뷰 내용과 작성자를 입력해주세요",
    };
  }

  try {
    await delay(2000);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ movieId, content, author }),
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // 재검증
    // 서버에서만 호출 가능(서버 액션, 서버 컴포넌트에서만 사용 가능)
    // 클라이언트 컴포넌트에서 호출 불가
    // 재검증을 통해 캐시된 데이터를 무효화하고 다시 가져옴

    // 1. 특정 주소의 해당하는 페이지만 재검증
    // revalidatePath(`/movie/${movieId}`);

    // 2. 특정 경로의 모든 동적 페이지를 재검증
    // revalidatePath("/movie/[id]", "page");

    // 3. 특정 레이아웃을 갖는 모든 페이지 재검증
    // revalidatePath("/(with-searchbar)", "layout");

    // 4. 모든 데이터(페이지) 재검증
    // revalidatePath("/", "layout");

    // 5. 태그 기준, 데이터 캐시 재검증
    revalidateTag(`review-${movieId}`);
    return {
      status: true,
      error: "",
    };
  } catch (err) {
    return {
      status: false,
      error: `리뷰 작성에 실패했습니다 : ${err}`,
    };
  }
}
