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
        <ListToggleButtonLabel>{props.language}</ListToggleButtonLabel>
        <img src="/icon/OpenSelect.svg" alt="▼" width="21rem" />
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
  width: 12.8rem;
  height: fit-content;
`;

const Button = styled.button`
  width: 100%;
  height: 3.5rem;
  padding: 0 0.5rem;

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
  border: 0.4rem solid #373737;
  border-radius: 0.5rem;
  position: relative;

  img {
    transform: rotate(${({ $isOpen }) => ($isOpen ? "-180deg" : "0deg")});
  }
`;

const ListToggleButtonLabel = styled.span`
  font-size: 1.33rem;
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
  top: calc(100% - 0.5rem);
  left: 0;
  width: 100%;

  margin: 0;
  padding: 0;
  list-style: none;

  background: white;
  border: 0.4rem solid #373737;
  border-radius: 0.5rem;
  max-height: 20rem;
  overflow-y: auto;

  z-index: ${zIndex.selectOptions};
`;
