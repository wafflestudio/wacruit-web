import { useState } from "react";
import styled from "styled-components";
import { Language, languages } from "./useLanguage.tsx";
import { zIndex } from "../../../lib/zIndex";

interface Props {
  language: Language;
  onChange: (language: Language) => void;
}

export default function LanguageSelection(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Wrapper>
      <ListToggleButton onClick={() => setIsOpen(!isOpen)} $isOpen={isOpen}>
        <span>{props.language}</span>
        <img src="/icon/OpenSelect.svg" alt="▼" />
      </ListToggleButton>
      {isOpen && (
        <List>
          {languages.map((option) => (
            <li key={option}>
              <ListItemButton
                $selected={props.language === option}
                onClick={() => {
                  setIsOpen(false);
                  props.onChange(option);
                }}
              >
                <span>{option}</span>
              </ListItemButton>
            </li>
          ))}
        </List>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 128px;
  height: fit-content;
`;

const Button = styled.button`
  width: 100%;
  height: 35px;
  padding: 0 5px;

  cursor: pointer;
  font-weight: 600;

  display: flex;
  align-items: center;

  span {
    text-align: left;
    flex: 1;
  }
`;

const ListToggleButton = styled(Button)<{ $isOpen: boolean }>`
  background: white;
  border: 4px solid #373737;
  border-radius: 5px;
  position: relative;

  img {
    transform: rotate(${({ $isOpen }) => ($isOpen ? "-180deg" : "0deg")});
  }
`;

const ListItemButton = styled(Button)<{ $selected: boolean }>`
  border: none;
  background: ${({ $selected }) => ($selected ? "#E6E6E6" : "white")};

  &:hover {
    background: #e6e6e6;
  }
`;

const List = styled.ul`
  position: absolute;
  box-sizing: border-box;
  top: calc(100% - 5px);
  left: 0;
  width: 100%;

  margin: 0;
  padding: 0;
  list-style: none;

  background: white;
  border: 4px solid #373737;
  border-radius: 5px;
  max-height: 200px;
  overflow-y: auto;

  z-index: ${zIndex.selectOptions};
`;
