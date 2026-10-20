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
      <ListToggleButton
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        $isOpen={isOpen}
        aria-expanded={isOpen}
      >
        <span>{props.language}</span>
        <img src="/icon/OpenSelect.svg" alt="" />
      </ListToggleButton>
      {isOpen && (
        <List>
          {languages.map((option) => (
            <li key={option}>
              <ListItemButton
                type="button"
                $selected={props.language === option}
                onClick={() => {
                  setIsOpen(false);
                  props.onChange(option);
                }}
              >
                {option}
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
  width: 12rem;
`;

const ListToggleButton = styled.button<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  width: 100%;
  height: 3rem;
  padding: 0 1rem;
  border: 1px solid
    ${({ $isOpen, theme }) =>
      $isOpen ? theme.colors.oak : theme.colors.black[300]};
  border-radius: 0.4rem;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black[900]};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes[13]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;

  span {
    flex: 1;
    text-align: left;
  }

  img {
    width: 1.4rem;
    height: 1.4rem;
    opacity: 0.6;
    transform: rotate(${({ $isOpen }) => ($isOpen ? "-180deg" : "0deg")});
    transition: transform 0.2s ease;
  }
`;

const List = styled.ul`
  position: absolute;
  top: calc(100% + 0.4rem);
  left: 0;
  z-index: ${zIndex.selectOptions};
  width: 100%;
  max-height: 20rem;
  margin: 0;
  padding: 0.4rem;
  border: 1px solid ${({ theme }) => theme.colors.black[300]};
  border-radius: 0.4rem;
  background-color: ${({ theme }) => theme.colors.white};
  list-style: none;
  overflow-y: auto;
`;

const ListItemButton = styled.button<{ $selected: boolean }>`
  width: 100%;
  height: 3rem;
  padding: 0 0.8rem;
  border-radius: 0.2rem;
  background-color: ${({ $selected, theme }) =>
    $selected ? theme.colors.black[100] : theme.colors.white};
  color: ${({ theme }) => theme.colors.black[900]};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes[13]};
  font-weight: ${({ $selected, theme }) =>
    $selected ? theme.fontWeights.bold : theme.fontWeights.medium};
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.black[100]};
  }
`;
