import {
  MouseEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
  initialHeight: number;
}

// 높이 조절 손잡이의 크기
const HANDLE_HEIGHT = 20;

// 최대로 늘리더라도 남겨놓을 최소한의 공간: 20 + 에디터 헤더 높이
const MIN_SPACE = 20 + 47;

/*
최소한의 deps로 이루어진 state-driven 드래그
ref의 사용을 제거함
이게 되네?
*/
export default function DragResizable(props: Props) {
  const container = useRef<HTMLDivElement>(null);
  const [dragInfo, setDragInfo] = useState<{
    // 드래그가 시작될 때 설정되는 값들
    drag: {
      mouseBaseY: number;
      baseHeight: number;
      maxHeight: number;
    } | null;

    // 드래그 중인 높이
    height: number;
  }>({
    drag: null,
    height: props.initialHeight,
  });

  // props.initialHeight가 바뀌면 드래그 초기화
  const [propHeight, setPropHeight] = useState(props.initialHeight);
  if (propHeight !== props.initialHeight) {
    setPropHeight(props.initialHeight);
    setDragInfo({
      drag: null,
      height: props.initialHeight,
    });
  }

  useEffect(() => {
    const handleMouseUp = () => {
      setDragInfo((dragInfo) =>
        dragInfo.drag
          ? {
              ...dragInfo,
              drag: null,
            }
          : dragInfo,
      );
    };
    const handleMouseDown = (e: MouseEvent) => {
      setDragInfo((dragInfo) => {
        if (!container.current || !dragInfo.drag) return dragInfo;
        const { mouseBaseY, baseHeight, maxHeight } = dragInfo.drag;
        const h = baseHeight - (e.clientY - mouseBaseY);
        const newHeight = Math.max(HANDLE_HEIGHT, Math.min(h, maxHeight));
        return dragInfo.height === newHeight
          ? dragInfo
          : {
              ...dragInfo,
              height: newHeight,
            };
      });
    };

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseDown);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseDown);
    };
  }, []);

  const onMouseDown = useCallback<MouseEventHandler>((e) => {
    setDragInfo((dragInfo) => {
      if (!container.current) return dragInfo;
      return {
        drag: {
          mouseBaseY: e.clientY,
          baseHeight: container.current.clientHeight,
          maxHeight:
            (container.current.parentElement?.clientHeight ?? MIN_SPACE) -
            MIN_SPACE,
        },
        height: dragInfo.height,
      };
    });
  }, []);

  const style = useMemo(() => ({ height: dragInfo.height }), [dragInfo.height]);

  return (
    <Container ref={container} style={style}>
      <Handle onMouseDown={onMouseDown}>
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
