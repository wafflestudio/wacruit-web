import {
  UserInfoFormContext,
  UserInfoFormProps,
} from "./UserInfoFormContext.tsx";
import { LabeledInput } from "./LabeledInput.tsx";
import styled from "styled-components";
import { forwardRef } from "react";

const UserInfoForm = forwardRef<HTMLFormElement, UserInfoFormProps>(
  (props, ref) => (
    <UserInfoFormContext.Provider value={props}>
      <Container onSubmit={(e) => e.preventDefault()} ref={ref}>
        <Group>
          <GroupTitle>학교</GroupTitle>
          <LabeledInput
            name="university"
            placeholder="서울대학교"
            maxLength={50}
          >
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
        </Group>
        <Group>
          <GroupTitle>초대 이메일</GroupTitle>
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
            디스코드 초대 이메일
          </LabeledInput>
          <LabeledInput
            name="notion_email"
            placeholder="example@gmail.com"
            type="email"
          >
            노션 초대 이메일
          </LabeledInput>
        </Group>
      </Container>
    </UserInfoFormContext.Provider>
  ),
);
export default UserInfoForm;

const Container = styled.form`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2.4rem 4rem;

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Group = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
`;

const GroupTitle = styled.legend`
  margin-bottom: 1.4rem;
  padding: 0;
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSizes[16]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;
