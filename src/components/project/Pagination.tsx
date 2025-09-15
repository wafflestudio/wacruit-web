import styled from "styled-components";

const PaginationWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  width: fit-content;
  margin: 0 auto;
`;

const ArrowIcon = styled.button<{ disabled?: boolean; $dir: "left" | "right" }>`
  width: 2.4rem;
  height: 2.4rem;
  padding: 0;
  border: 0;
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.black[300] : theme.colors.black[900]};
  mask: url("/icon/NextArrow.svg") center / contain no-repeat;
  -webkit-mask: url("/icon/NextArrow.svg") center / contain no-repeat;
  transform: ${({ $dir }) => ($dir === "left" ? "rotate(180deg)" : "none")};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
`;

const PageNumber = styled.button<{ active: boolean }>`
  cursor: pointer;
  width: 4rem;
  height: 4rem;
  border-radius: 0.4rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ active, theme }) =>
    active ? theme.colors.black[200] : "transparent"};

  color: ${({ active, theme }) => (active ? theme.colors.black[900] : "#000")};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes[16]};
  font-weight: ${({ active, theme }) =>
    active ? theme.fontWeights.bold : theme.fontWeights.medium};
  line-height: ${({ theme }) => theme.lineHeights.base};
  letter-spacing: -0.016rem;
`;

interface Props {
  currentPage: number;
  totalPages: number;
  onChange: (p: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onChange,
}: Props) {
  return (
    <PaginationWrap>
      <ArrowIcon
        $dir="left"
        disabled={currentPage === 1}
        onClick={() => currentPage > 1 && onChange(currentPage - 1)}
      />
      {Array.from({ length: totalPages }, (_, i) => (
        <PageNumber
          key={i}
          active={i + 1 === currentPage}
          onClick={() => onChange(i + 1)}
        >
          {i + 1}
        </PageNumber>
      ))}
      <ArrowIcon
        $dir="right"
        disabled={currentPage === totalPages}
        onClick={() => currentPage < totalPages && onChange(currentPage + 1)}
      />
    </PaginationWrap>
  );
}
