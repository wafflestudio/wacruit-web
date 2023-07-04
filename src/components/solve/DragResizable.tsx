import { ReactNode, useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
  initialHeight: number;
}

// 높이 조절 손잡이의 크기
const HANDLE_HEIGHT = 20;

// 최대로 늘리더라도 남겨놓을 최소한의 공간
const MIN_SPACE = 20;

export default function DragResizable(props: Props) {
  /*
   드래그 중에는 element의 style.height를 직접 조절하고,
   드래그가 끝나면 state에 반영한다.
  */

  const container = useRef<HTMLDivElement>(null);
  // 드래그가 시작될 때 설정되는 값들
  const dragInfo = useRef<{
    mouseBaseY: number;
    baseHeight: number;
    maxHeight: number;
  } | null>(null);
  // 드래그되지 않는 상태에서 저장하고 있는 높이
  const [height, setHeight] = useState(`${props.initialHeight}px`);

  // props.initialHeight가 바뀌면 드래그 초기화
  const [propHeight, setPropHeight] = useState(props.initialHeight);
  if (propHeight !== props.initialHeight) {
    setPropHeight(props.initialHeight);
    setHeight(`${props.initialHeight}px`);
    dragInfo.current = null;
  }

  useEffect(() => {
    const handleMouseUp = () => {
      dragInfo.current = null;
      if (!container.current) return;
      setHeight(container.current.style.height);
    };
    const handleMouseDown = (e: MouseEvent) => {
      if (!container.current || !dragInfo.current) return;
      const { mouseBaseY, baseHeight, maxHeight } = dragInfo.current;
      const h = baseHeight - (e.clientY - mouseBaseY);
      const newHeight = Math.max(HANDLE_HEIGHT, Math.min(h, maxHeight));
      container.current.style.height = `${newHeight}px`;
    };

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseDown);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseDown);
    };
  }, []);

  return (
    <Container ref={container} style={{ height }}>
      <Handle
        onMouseDown={(e) => {
          if (!container.current) return;
          dragInfo.current = {
            mouseBaseY: e.clientY,
            baseHeight: container.current.clientHeight,
            maxHeight:
              (container.current.parentElement?.clientHeight ?? MIN_SPACE) -
              MIN_SPACE,
          };
        }}
      >
        <img
          src="/icon/DragHandle.svg"
          alt="&equiv;"
          draggable={false}
          height={HANDLE_HEIGHT}
        />
      </Handle>
      {props.children}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
`;
const Handle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: ${HANDLE_HEIGHT}px;
  cursor: ns-resize;
  text-align: center;
  user-select: none;
`;
