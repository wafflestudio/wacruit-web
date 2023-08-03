import styled from "styled-components";

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function EditorToggle(props: Props) {
  return (
    <Wrapper onClick={() => props.onChange(!props.value)}>
      <span>Code Assistant</span>
      <Slot>
        <OnText value={props.value}>on</OnText>
        <OffText value={props.value}>off</OffText>
        <Circle value={props.value} />
      </Slot>
    </Wrapper>
  );
}

const Wrapper = styled.button`
  grid-column: 4;

  display: flex;
  align-items: center;
  gap: 15px;

  background: none;
  border: none;
  font-size: 18px;
  color: #342d29;
  cursor: pointer;
`;

const Slot = styled.div`
  width: 84px;
  height: 36px;
  box-sizing: border-box;
  padding-left: 2px;
  position: relative;

  border: 4px solid #373737;
  border-radius: 18px;
`;

const TRANS_TIME = "0.2s";

const Circle = styled.div<{ value: boolean }>`
  width: 24px;
  height: 24px;

  position: absolute;
  top: 2px;
  left: ${(props) => (props.value ? "2px" : "48px")};
  transition: left ${TRANS_TIME} ease-in-out;

  border: 4px solid #373737;
  border-radius: 50%;

  background: #f0745f;
`;

const Text = styled.span`
  position: absolute;
  height: 100%;
  overflow: hidden;

  display: flex;
  align-items: center;

  transition: width ${TRANS_TIME} ease-in-out;
`;

const OnText = styled(Text)<{ value: boolean }>`
  justify-content: flex-end;

  right: 0;
  padding-right: 10px;
  width: ${(props) => (props.value ? "100%" : "0")};
`;

const OffText = styled(Text)<{ value: boolean }>`
  justify-content: flex-start;

  padding-left: 10px;
  width: ${(props) => (props.value ? "0" : "100%")};
`;
