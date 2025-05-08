"use client";
import { ReactNode, useEffect, useRef } from "react";
import style from "./modal.module.css";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

// 모달은 전체화면을 덮는 글로벌한 요소이기에 createPortal을 사용
export default function Modal({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!dialogRef.current?.open) {
      // 모달은 꺼져있는 상태가 기본 상태이기에 showModal()로 강제로 켜줌
      dialogRef.current?.showModal();
      // 모달이 등장하자마자 스크롤이 상단에 위치하도록 설정
      dialogRef.current?.scroll({ top: 0 });
    }
  }, []);

  return createPortal(
    <dialog
      onClose={() => 
        // 사용자가 모달을 닫았을 때, ESC버튼을 눌렀을 때 -> 뒤로가기
        router.back()}
      onClick={(e) => {
        // 모달 바깥을 클릭했을 때 -> 뒤로가기
        if ((e.target as any).nodeName === "DIALOG") {
          router.back();
        }
      }}
      className={style.modal}
      ref={dialogRef}
    >
      {children}
    </dialog>,
    document.getElementById("modal-root") as HTMLElement
  );
}
