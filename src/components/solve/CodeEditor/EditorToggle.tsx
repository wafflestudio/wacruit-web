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
  gap: 1.5rem;

  background: none;
  border: none;
  font-size: 1.8rem;
  color: #342d29;
  cursor: pointer;
`;

const Slot = styled.div`
  width: 8.4rem;
  height: 3.6rem;
  box-sizing: border-box;
  padding-left: 0.2rem;
  position: relative;

  border: 0.4rem solid #373737;
  border-radius: 1.8rem;
`;

const TRANS_TIME = "0.2s";

const Circle = styled.div<{ value: boolean }>`
  width: 2.4rem;
  height: 2.4rem;

  position: absolute;
  top: 0.2rem;
  left: ${(props) => (props.value ? "0.2rem" : "4.8rem")};
  transition: left ${TRANS_TIME} ease-in-out;

  border: 0.4rem solid #373737;
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
  padding-right: 1rem;
  width: ${(props) => (props.value ? "100%" : "0")};
`;

const OffText = styled(Text)<{ value: boolean }>`
  justify-content: flex-start;

  padding-left: 1rem;
  width: ${(props) => (props.value ? "0" : "100%")};
`;
