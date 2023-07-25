import styled from "styled-components";
import { MouseEventHandler, MutableRefObject, useEffect, useRef } from "react";

export default function Scrollbar() {
  const { parentRef, scrollbarRef } = useParentScrollListener();
  const { handleMouseDown } = useScrollbarDrag(parentRef);

  return (
    <BarWrapper ref={scrollbarRef} onMouseDown={handleMouseDown}>
      <div />
    </BarWrapper>
  );
}

function useScrollbarDrag(parentRef: MutableRefObject<HTMLElement | null>) {
  /*
   스크롤 기준점.
   | null => 드래그 중이 아님
   | number => 드래그 중, 기준 y좌표 값 저장
  */
  const dragBase = useRef<number | null>(null);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragBase.current === null || !parentRef.current) return;
      const { scrollHeight, clientHeight } = parentRef.current;
      const diff = e.clientY - dragBase.current;
      dragBase.current = e.clientY;
      parentRef.current.scrollTop += (diff / clientHeight) * scrollHeight;
    };
    const handleMouseUp = () => {
      dragBase.current = null;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [parentRef]);
  const handleMouseDown: MouseEventHandler = (e) => {
    // 근처 글씨 드래그 방지
    e.preventDefault();

    dragBase.current = e.clientY;
  };
  return {
    handleMouseDown,
  };
}

function useParentScrollListener() {
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const parent = scrollbarRef.current?.parentElement ?? null;
    parentRef.current = parent;
    if (!parent) return;

    const handleScroll = () => {
      if (!scrollbarRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = parent;

      if (scrollHeight <= clientHeight) {
        // 스크롤이 필요 없다
        scrollbarRef.current.style.display = "none";
      } else {
        // scrollTop의 반대 (scrollHeight로부터 보이는 부분의 위치)
        const scrollBottom = scrollHeight - scrollTop - clientHeight;

        scrollbarRef.current.style.top = `${
          scrollTop + (scrollTop / scrollHeight) * clientHeight
        }px`;
        // bottom의 기준점은 scrollHeight가 아니라 clientHeight
        scrollbarRef.current.style.bottom = `${
          -scrollTop + (scrollBottom / scrollHeight) * clientHeight
        }px`;
        scrollbarRef.current.style.display = "block";
      }
    };

    // 스크롤바 위치 초기화
    handleScroll();

    // 스크롤 및 크기 변화 감지
    const observer = new ResizeObserver(handleScroll);
    observer.observe(parent);
    parent.addEventListener("scroll", handleScroll);
    return () => {
      observer.disconnect();
      parent.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return {
    parentRef,
    scrollbarRef,
  };
}

const BarWrapper = styled.div`
  // 기본적으로 보이지 않고, 스크롤 이벤트가 정상적으로 등록된 경우에만 보인다
  display: none;

  position: absolute;
  top: 0;
  right: 0;

  width: 0;
  margin: 9.5px 7.5px;

  border: 2.5px solid #404040;
  border-radius: 2.5px;
`;
