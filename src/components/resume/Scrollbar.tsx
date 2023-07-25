import styled from "styled-components";
import {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

export type ScrollbarRef = {
  handleScroll: (elem: HTMLElement) => void;
};

const Scrollbar = forwardRef((_, ref: ForwardedRef<ScrollbarRef>) => {
  const divRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLElement | null>(null);
  const dragBase = useRef<number | null>(null);
  useImperativeHandle(ref, () => ({
    handleScroll: (elem: HTMLElement) => {
      parentRef.current = elem;
      if (!divRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = elem;
      if (scrollHeight <= clientHeight) return;

      const scrollBottom = scrollHeight - scrollTop - clientHeight;
      divRef.current.style.top = `${
        scrollTop + (scrollTop / scrollHeight) * clientHeight
      }px`;
      divRef.current.style.bottom = `${
        -scrollTop + (scrollBottom / scrollHeight) * clientHeight
      }px`;
      divRef.current.style.display = "block";
    },
  }));
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
  }, []);
  return (
    <BarWrapper
      ref={divRef}
      onMouseDown={(e) => {
        e.preventDefault();
        dragBase.current = e.clientY;
      }}
    >
      <div />
    </BarWrapper>
  );
});
export default Scrollbar;

const BarWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  border: 2.5px solid #404040;
  border-radius: 2.5px;
  margin: 9.5px 7.5px;
  display: none;
`;
