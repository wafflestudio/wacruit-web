import {
  UserInfoFormContext,
  UserInfoFormProps,
} from "./UserInfoFormContext.tsx";
import { LabeledSelect } from "./LabeledSelect.tsx";
import { LabeledInput } from "./LabeledInput.tsx";
import styled from "styled-components";

const admissionOptions = [
  // 23학번 아래 10개 학번 + 기타
  ...Array.from({ length: 10 }, (_, i) => 23 - i).map((i) => `${i}학번`),
  "기타",
];
export default function UserInfoForm(props: UserInfoFormProps) {
  return (
    <UserInfoFormContext.Provider value={props}>
      <Container>
        <LabeledInput k="university" placeholder="서울대학교">
          대학교
        </LabeledInput>
        <LabeledInput k="college" placeholder="공과대학">
          단과대
        </LabeledInput>
        <LabeledInput k="major" placeholder="컴퓨터공학부">
          학과/부
        </LabeledInput>
        <LabeledInput k="githubId" placeholder="id">
          깃허브 아이디
        </LabeledInput>
        <LabeledInput k="slackEmail" placeholder="example@gmail.com">
          슬랙 초대 이메일
        </LabeledInput>
        <LabeledInput k="notionEmail" placeholder="example@gmail.com">
          노션 초대 이메일
        </LabeledInput>
        <Sep />

        {/* 선택 창이 다른 입력보다 위에 렌더링 되어야하므로 뒤쪽에 배치 */}
        <LabeledSelect k="admission" options={admissionOptions}>
          학번
        </LabeledSelect>
        <LabeledSelect k="status" options={["재학", "휴학", "졸업", "기타"]}>
          소속 상태
        </LabeledSelect>
      </Container>
    </UserInfoFormContext.Provider>
  );
}

export const Container = styled.div`
  display: grid;
  grid-template-areas:
    "admission  status sep githubId"
    "university .      sep slackEmail"
    "college    .      sep notionEmail"
    "major      .      sep .";
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  gap: 16px;
  margin-bottom: 130px;
`;
export const Sep = styled.hr`
  grid-area: sep;

  width: 0;
  height: 100%;

  border-width: 0 1px;
`;