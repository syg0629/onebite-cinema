"use client";

import { deleteReviewAction } from "@/actions/delete-review.action";
import { useActionState, useEffect, useRef } from "react";

export default function ReviewItemDeleteButton({
  reviewId,
  movieId,
}: {
  reviewId: number;
  movieId: number;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null
  );

  useEffect(()=>{
    if(state && !state.status){
        alert(state.error);
    } 

  },[state])

  return (
    <form ref={formRef} action={formAction}>
      <input name="reviewId" value={reviewId} hidden />
      <input name="movieId" value={movieId} hidden />
      {isPending ? (
        <div>삭제중 ...</div>
      ) : (
        <div onClick={() => formRef.current?.requestSubmit()}>
          {/*submit: 유효성 검사나 이벤트 핸들러 등을 다 무시하고 강제로 폼 제출, 위험한 메서드 */}
          {/* requestSubmit: 비교적 의도한 대로 안전하게 동작 */}
          {/* 리액트에서는 submit메서드보다는 requestSubmit 메서드를 사용하는 걸 더 권장 */}
          🗑️ 리뷰 삭제하기
        </div>
      )}
    </form>
  );
}
