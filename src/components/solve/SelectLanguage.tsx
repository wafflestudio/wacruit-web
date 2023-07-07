import { useState } from "react";
import styled from "styled-components";

const options = ["Python", "Java", "Javascript"] as const;
export type Language = (typeof options)[number];

interface Props {
  language: Language;
  onChange: (language: Language) => void;
}

export default function SelectLanguage(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Wrapper>
      <Button onClick={() => setIsOpen(!isOpen)}>
        <span>{props.language}</span>
        <img src="/icon/OpenSelect.svg" alt="▼" />
      </Button>
      {isOpen && (
        <List>
          {options.map((option) => (
            <li>
              <button
                key={option}
                onClick={() => {
                  setIsOpen(false);
                  props.onChange(option);
                }}
              >
                {props.language === option && (
                  <img src="/icon/Check.svg" alt="✓" width={16} />
                )}
                <span>{option}</span>
              </button>
            </li>
          ))}
        </List>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  height: 32px;

  color: #342d29;
  font-size: 16px;
`;

const Button = styled.button`
  width: 128px;
  height: 100%;

  background: white;
  cursor: pointer;

  border: 4px solid #373737;
  border-radius: 5px;

  display: flex;
  align-items: center;

  span {
    text-align: left;
    flex: 1;
  }
`;

const List = styled.ul`
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  width: 100%;
  box-sizing: border-box;

  margin: 0;
  padding: 0;
  list-style: none;
  background: white;
  border: 4px solid #373737;
  border-radius: 5px;

  button {
    width: 100%;
    text-align: left;
    border: 0;
    background: none;
    color: #373737;
    cursor: pointer;
    position: relative;
    padding-left: 20px;
    img {
      position: absolute;
      left: 4px;
    }
  }
`;
