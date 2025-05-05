// 서버 액션 - 간결하고 편리하게 서버 측에서 실행되는 어떠한 동작을 정의
"use server";

export async function createReviewServerAction(formData: FormData) {
  const movieId = formData.get("movieId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!movieId || !content || !author) {
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ movieId, content, author }),
      }
    );
    console.log(response.status);
  } catch (err) {
    console.error(err);
    return;
  }
}
