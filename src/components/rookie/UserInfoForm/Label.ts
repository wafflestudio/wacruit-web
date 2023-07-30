// import 안 꼬이게 따로 배치함

import styled from "styled-components";

export const Label = styled.label<{
  name: string;
}>`
  grid-area: ${(props) => props.name};

  position: relative;

  display: flex;
  flex-direction: column;
  gap: 6px;

  color: #404040;
  font-size: 20px;

  > span {
    font-weight: 500;
  }

  input {
    width: 100%;
    height: 40px;
    padding: 0 12px;

    border-radius: 5px;
    border: 1px solid #d9d9d9;

    background: #f6f6f6;
  }

  input::placeholder {
    color: #d9d9d9;
  }

  input:focus {
    background: #e6e6e6;
    outline: none;
  }
`;
