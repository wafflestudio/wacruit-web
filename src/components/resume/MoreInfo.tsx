import styled from "styled-components";
import {
  createContext,
  MouseEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Scrollbar, { ScrollbarRef } from "./Scrollbar.tsx";

type Props = {
  value: MoreInfoInput;
  onChange: (value: MoreInfoInput) => void;
};

const admissionOptions = [
  ...Array.from({ length: 10 }, (_, i) => 23 - i).map((i) => `${i}학번`),
  "기타",
];

const Context = createContext({} as Props);
export default function MoreInfo(props: Props) {
  return (
    <Context.Provider value={props}>
      <Container>
        <LabeledInput k="university" placeholder="서울대학교">
          대학교
        </LabeledInput>
        <LabeledInput k="college" placeholder="공과대학">
          단과대
        </LabeledInput>
        <LabeledInput k="major" placeholder="컴퓨터공학부">
          학과/부
        </LabeledInput>
        <LabeledInput k="github_id" placeholder="id">
          깃허브 아이디
        </LabeledInput>
        <LabeledInput k="slack_email" placeholder="example@gmail.com">
          슬랙 초대 이메일
        </LabeledInput>
        <LabeledInput k="notion_email" placeholder="example@gmail.com">
          노션 초대 이메일
        </LabeledInput>
        <Sep />
        {/* 선택 창이 다른 입력보다 위에 렌더링 되어야하므로 뒤쪽에 배치 */}
        <LabeledSelect k="admission" options={admissionOptions}>
          학번
        </LabeledSelect>
        <LabeledSelect k="status" options={["재학", "휴학", "졸업", "기타"]}>
          소속 상태
        </LabeledSelect>
      </Container>
    </Context.Provider>
  );
}

type LabeledInputProps = {
  children: string;
  k: keyof MoreInfoInput;
  placeholder?: string;
};
function LabeledInput({ k, children, placeholder }: LabeledInputProps) {
  const { value, onChange } = useContext(Context);
  return (
    <Label k={k}>
      <span>{children}</span>
      <input
        value={value[k]}
        onChange={(e) => onChange({ ...value, [k]: e.target.value })}
        placeholder={placeholder}
      />
    </Label>
  );
}

type LabeledSelectProps = {
  children: string;
  k: keyof MoreInfoInput;
  options: string[];
};

function LabeledSelect({ children, k, options }: LabeledSelectProps) {
  const { value, onChange } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);
  const makeOptionClickHandler = (option: string): MouseEventHandler => {
    return (e) => {
      e.preventDefault();
      onChange({ ...value, [k]: option });
      setIsOpen(false);
    };
  };
  const scrollbarRef = useRef<ScrollbarRef>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const options = optionsRef.current;
    const scrollbar = scrollbarRef.current;
    if (!options) return;

    scrollbar?.handleScroll(options);
    const observer = new ResizeObserver(() => {
      scrollbar?.handleScroll(options);
    });
    observer.observe(options);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const options = optionsRef.current;
    const selected = selectedRef.current;
    if (!(options && selected)) return;

    options.scrollTop = Math.max(selected.offsetTop - 80, 0);
  }, []);

  return (
    <Label k={k} onClick={(e) => e.preventDefault()}>
      <span>{children}</span>
      <CurrentOption
        onClick={() => setIsOpen(!isOpen)}
        $isOpen={isOpen}
        onBlur={(e) => {
          if (!optionsRef.current?.contains(e.relatedTarget)) setIsOpen(false);
        }}
      >
        <span>{value[k].length > 0 ? value[k] : "선택"}</span>
        <img src="/icon/OpenSelect.svg" alt="▼" />
      </CurrentOption>
      <Options
        onScroll={(e) => scrollbarRef.current?.handleScroll(e.currentTarget)}
        ref={optionsRef}
        $isOpen={isOpen}
      >
        {options.map((option) => (
          <Option
            key={option}
            onClick={makeOptionClickHandler(option)}
            $selected={option === value[k]}
            ref={option === value[k] ? selectedRef : undefined}
          >
            {option}
          </Option>
        ))}
        <Scrollbar ref={scrollbarRef} />
      </Options>
    </Label>
  );
}

export type MoreInfoInput = {
  admission: string;
  status: string;
  university: string;
  college: string;
  major: string;
  github_id: string;
  slack_email: string;
  notion_email: string;
};

const Container = styled.div`
  display: grid;
  grid-template-areas:
    "admission  status sep github_id"
    "university .      sep slack_email"
    "college    .      sep notion_email"
    "major      .      sep .";
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  gap: 16px;
  margin-bottom: 130px;
`;

const Label = styled.label<{
  k: string;
}>`
  color: #404040;
  font-size: 20px;
  grid-area: ${(props) => props.k};
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 6px;

  > span {
    font-weight: 500;
  }

  input {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #d9d9d9;
    background: #f6f6f6;
    padding: 0 12px;
  }

  input::placeholder {
    color: #d9d9d9;
  }

  input:focus {
    background: #e6e6e6;
    outline: none;
  }
`;

const Sep = styled.hr`
  grid-area: sep;
  width: 0;
  border-width: 0 1px;
  height: 100%;
`;

const Options = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: calc(100% - 1px);
  background: white;
  border: 1px solid #404040;
  border-radius: 0 0 2px 2px;
  width: 100%;
  max-height: 200px;
  overflow: auto;
  display: ${(props) => (props.$isOpen ? "block" : "none")};

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Option = styled.button<{ $selected: boolean }>`
  font-size: 16px;
  padding: 0 12px;
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) => (props.$selected ? "#d9d9d9" : "white")};
  width: 100%;
`;

const CurrentOption = styled.button<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border: 1px solid #404040;
  border-radius: ${(props) => (props.$isOpen ? "2px 2px 0 0" : "2px")};
  width: 100%;
  height: 40px;
  font-size: 16px;
  padding: 0 12px;
  cursor: pointer;

  img {
    transform: ${(props) =>
      props.$isOpen ? "rotate(180deg)" : "rotate(0deg)"};
  }
`;
