import {
  UserInfoFormContext,
  UserInfoFormProps,
} from "./UserInfoFormContext.tsx";
import { LabeledInput } from "./LabeledInput.tsx";
import styled from "styled-components";
import { forwardRef } from "react";

/*
const admissionOptions = [
  // 23학번 아래 10개 학번 + 기타
  ...Array.from({ length: 10 }, (_, i) => 23 - i).map((i) => `${i}학번`),
  "기타",
];
*/

const UserInfoForm = forwardRef<HTMLFormElement, UserInfoFormProps>(
  (props, ref) => (
    <UserInfoFormContext.Provider value={props}>
      <Container onSubmit={(e) => e.preventDefault()} ref={ref}>
        <LabeledInput name="university" placeholder="서울대학교" maxLength={50}>
          대학교
        </LabeledInput>
        <LabeledInput name="college" placeholder="공과대학" maxLength={50}>
          단과대
        </LabeledInput>
        <LabeledInput
          name="department"
          placeholder="컴퓨터공학부"
          maxLength={50}
        >
          학과/부
        </LabeledInput>
        <LabeledInput
          name="github_email"
          placeholder="example@gmail.com"
          type="email"
        >
          깃허브 이메일
        </LabeledInput>
        <LabeledInput
          name="slack_email"
          placeholder="example@gmail.com"
          type="email"
        >
          슬랙 초대 이메일
        </LabeledInput>
        <LabeledInput
          name="notion_email"
          placeholder="example@gmail.com"
          type="email"
        >
          노션 초대 이메일
        </LabeledInput>
        <Sep />

        {/* 선택 창이 다른 입력보다 위에 렌더링 되어야하므로 뒤쪽에 배치
        ㄷ
        <LabeledSelect name="admission" options={admissionOptions}>
          학번
        </LabeledSelect>
        <LabeledSelect name="status" options={["재학", "휴학", "졸업", "기타"]}>
          소속 상태
        </LabeledSelect>
         */}
      </Container>
    </UserInfoFormContext.Provider>
  ),
);
export default UserInfoForm;

export const Container = styled.form`
  display: grid;
  grid-template-areas:
    "university .      sep github_email"
    "college    .      sep slack_email"
    "department      .      sep notion_email";

  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 1.6rem;
  margin-bottom: 13rem;
`;
export const Sep = styled.hr`
  grid-area: sep;

  width: 0;
  height: 100%;

  border-width: 0 0.1rem;
`;
