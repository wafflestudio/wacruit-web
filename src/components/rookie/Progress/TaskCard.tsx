import { Link } from "react-router-dom";
import styled from "styled-components";
import { StatusTag, StatusTagVariant } from "../../../shared/ui/tag/Tag";

type TaskCardProps = {
  title: string;
  to: string;
  variant: StatusTagVariant;
  label: string;
};

export function TaskCard({ title, to, variant, label }: TaskCardProps) {
  return (
    <li>
      <Card to={to}>
        <StatusTag $variant={variant}>{label}</StatusTag>
        <Name>{title}</Name>
        <Arrow aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Arrow>
      </Card>
    </li>
  );
}

const Arrow = styled.span`
  margin-top: auto;
  align-self: flex-end;
  display: grid;
  place-items: center;
  width: 3.2rem;
  height: 3.2rem;
  border: 1px solid ${({ theme }) => theme.colors.black[300]};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.black[700]};
  transition: background-color 0.15s ease, border-color 0.15s ease,
    color 0.15s ease;
`;

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.2rem;
  height: 100%;
  min-height: 15rem;
  padding: 2.4rem;
  border: 1px solid ${({ theme }) => theme.colors.black[200]};
  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.colors.white};
  transition: border-color 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.black[900]};
  }

  &:hover ${Arrow} {
    border-color: ${({ theme }) => theme.colors.black[900]};
    background-color: ${({ theme }) => theme.colors.black[900]};
    color: ${({ theme }) => theme.colors.white};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.oak};
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    min-height: 0;
    padding: 2rem;
  }
`;

const Name = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSizes[18]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.lineHeights.base};
`;
