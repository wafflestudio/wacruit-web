import styled from "styled-components";

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSizes[14]};

  > span {
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }

  input {
    width: 100%;
    padding: 1rem 1.4rem;
    border: 1px solid ${({ theme }) => theme.colors.black[300]};
    border-radius: 0.4rem;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black[900]};
    font-family: inherit;
    font-size: ${({ theme }) => theme.fontSizes[14]};
    line-height: ${({ theme }) => theme.lineHeights.base};
  }

  input::placeholder {
    color: ${({ theme }) => theme.colors.black[500]};
  }

  input:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.oak};
  }
`;
