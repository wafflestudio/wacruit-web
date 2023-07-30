import { UserInfoFormContext } from "./UserInfoFormContext.tsx";
import { useContext, useEffect, useRef, useState } from "react";
import Scrollbar from "./Scrollbar.tsx";
import styled from "styled-components";
import { Label } from "./Label.ts";

import { UserInfo } from "../../../mocks/types/types.ts";

type LabeledSelectProps = {
  children: string;
  k: keyof UserInfo;
  options: string[];
};

// Select에서 사용되는 value는 선택되지 않은 경우 "", 선택된 경우 해당 옵션의 string
export function LabeledSelect({ children, k, options }: LabeledSelectProps) {
  const { value, onChange } = useContext(UserInfoFormContext);
  const [isOpen, setIsOpen] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  // 선택된 옵션이 있는 경우 해당 요소, 없는 경우 null
  const selectedRef = useRef<HTMLButtonElement>(null);

  // 현재 선택된 옵션으로 스크롤 이동
  useEffect(() => {
    if (!optionsRef.current || !selectedRef.current) return;

    optionsRef.current.scrollTop = Math.max(
      // 선택된 옵션이 가운데에 오도록 한다. (80 = 2 * 옵션 높이)
      selectedRef.current.offsetTop - 80,
      0,
    );
  }, []);

  return (
    <Label k={k} onClick={(e) => e.preventDefault()}>
      <span>{children}</span>
      <CurrentOption
        onClick={() => setIsOpen(!isOpen)}
        $isOpen={isOpen}
        onBlur={(e) => {
          // 다른 곳을 클릭하면 닫힌다. 단, 옵션을 클릭한 경우는 제외한다.
          if (!optionsRef.current?.contains(e.relatedTarget)) setIsOpen(false);
        }}
      >
        <span>{value[k].length > 0 ? value[k] : "선택"}</span>
        <img src="/icon/OpenSelect.svg" alt="▼" />
      </CurrentOption>

      {/* 스크롤 유지를 위해, 조건부 렌더링 하지 않음 */}
      <Options ref={optionsRef} $isOpen={isOpen}>
        {options.map((option) => (
          <Option
            key={option}
            onClick={() => {
              onChange({ ...value, [k]: option });
              setIsOpen(false);
            }}
            $selected={option === value[k]}
            ref={option === value[k] ? selectedRef : undefined}
          >
            {option}
          </Option>
        ))}
        <Scrollbar />
      </Options>
    </Label>
  );
}

const Options = styled.div<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? "block" : "none")};

  width: 100%;
  max-height: 200px;
  overflow: auto;

  position: absolute;
  top: calc(100% - 1px);

  background: white;
  border: 1px solid #404040;
  border-radius: 0 0 2px 2px;

  // 커스텀 스크롤바 사용
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Option = styled.button<{ $selected: boolean }>`
  display: flex;
  align-items: center;

  width: 100%;
  height: 40px;
  padding: 0 12px;

  font-size: 16px;
  cursor: pointer;
  background-color: ${(props) => (props.$selected ? "#d9d9d9" : "white")};

  &:hover {
    background-color: ${(props) => (props.$selected ? "#d9d9d9" : "#f2f2f2")};
  }
`;

const CurrentOption = styled.button<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 40px;
  padding: 0 12px;

  border: 1px solid #404040;
  border-radius: ${(props) => (props.$isOpen ? "2px 2px 0 0" : "2px")};

  font-size: 16px;
  cursor: pointer;
  background-color: white;

  img {
    transform: ${(props) =>
      props.$isOpen ? "rotate(180deg)" : "rotate(0deg)"};
  }
`;
