import { styled } from "styled-components";
import { spacer, spacerProps } from "./spacer";

export const Text = styled.p`
  margin: 0;
  font-size: 18px;
  line-height: 160%;
`;

export const BoldText = styled(Text)`
  font-weight: bold;
`;

export const HorizontalLine = styled.hr<spacerProps>`
  ${spacer}
  height: 1px;
`;
