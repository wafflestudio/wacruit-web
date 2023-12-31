import { UserInfoFormContext } from "./UserInfoFormContext.tsx";
import { useContext, useEffect, useRef, useState } from "react";
import Scrollbar from "./Scrollbar.tsx";
import styled from "styled-components";
import { Label } from "./Label.ts";

import { UserInvitationEmails, UserUpdate } from "../../../types/apiTypes.ts";

type LabeledSelectProps = {
  children: string;
  name: keyof (UserUpdate & UserInvitationEmails);
  options: string[];
};

// Select에서 사용되는 value는 선택되지 않은 경우 "", 선택된 경우 해당 옵션의 string
export function LabeledSelect({ children, name, options }: LabeledSelectProps) {
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
    <Label name={name} onClick={(e) => e.preventDefault()}>
      <span>{children}</span>
      <CurrentOption
        onClick={() => setIsOpen(!isOpen)}
        $isOpen={isOpen}
        onBlur={(e) => {
          // 다른 곳을 클릭하면 닫힌다. 단, 옵션을 클릭한 경우는 제외한다.
          if (!optionsRef.current?.contains(e.relatedTarget)) setIsOpen(false);
        }}
      >
        <span>{value[name].length > 0 ? value[name] : "선택"}</span>
        <img src="/icon/OpenSelect.svg" alt="▼" />
      </CurrentOption>

      {/* 스크롤 유지를 위해, 조건부 렌더링 하지 않음 */}
      <Options ref={optionsRef} $isOpen={isOpen}>
        {options.map((option) => (
          <Option
            key={option}
            onClick={() => {
              onChange({ ...value, [name]: option });
              setIsOpen(false);
            }}
            $selected={option === value[name]}
            ref={option === value[name] ? selectedRef : undefined}
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
  max-height: 20rem;
  overflow: auto;

  position: absolute;
  top: calc(100% - 0.1rem);

  background: white;
  border: 0.1rem solid #404040;
  border-radius: 0 0 0.2rem 0.2rem;

  // 커스텀 스크롤바 사용
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Option = styled.button<{ $selected: boolean }>`
  display: flex;
  align-items: center;

  width: 100%;
  height: 4rem;
  padding: 0 1.2rem;

  font-size: 1.6rem;
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
  height: 4rem;
  padding: 0 1.2rem;

  border: 0.1rem solid #404040;
  border-radius: ${(props) => (props.$isOpen ? "0.2rem 0.2rem 0 0" : "0.2rem")};

  font-size: 1.6rem;
  cursor: pointer;
  background-color: white;

  img {
    transform: ${(props) =>
      props.$isOpen ? "rotate(180deg)" : "rotate(0deg)"};
  }
`;
