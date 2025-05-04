"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

// Next는 에러가 발생했을 때 에러 컴포넌트에게 자바스크립트 에러 타입의 에러 객체를 props로 전달한다.
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error.message);
  }, [error]);

  return (
    <div>
      <h3>오류가 발생했습니다</h3>
      {/* startTransition: 함수 하나를 인수로 받아서, 해당 함수 내부의 코드를 동기적으로 실행 */}
      {/* refresh(): 현재 페이지에서 필요한 서버 컴퍼넌트들을 다시 불러옴 */}
      {/* reset(): 에러 상태를 초기화, 컴포넌트들을 다시 렌더링 */}
      {/* 두개를 같이 쓰는 이유: 서버 컴포넌트들을 다시 불러와서 렌더링 한다고 해도 Client 컴포넌트인 Error가 사라지지 않음 -> 에러 상태 초기화 불가, reset()을 추가로 호출해야 서버 컴포넌트의 결과값을 다시 계산, 에러 상태 초기화*/}
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh();
            reset();
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
