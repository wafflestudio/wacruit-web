import styled from "styled-components";
import { useState } from "react";
import Headerv2 from "../shared/ui/header/HeaderV2";
import { useRouteNavigation } from "../shared/routes/useRouteNavigation";

const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) => (
  <InputWrapper>
    <Label>{label}</Label>
    <StyledInput
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </InputWrapper>
);

const Button = ({
  children,
  variant = "primary",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick: () => void;
}) => (
  <StyledButton variant={variant} onClick={onClick}>
    {children}
  </StyledButton>
);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toSignup } = useRouteNavigation();

  const handleLogin = () => {
    // TODO: API 연결 시 로그인 로직 구현
    console.log("로그인:", { email, password });
  };

  const handleSignup = () => {
    toSignup();
  };

  return (
    <Section>
      <Headerv2 />
      <ContentWrapper>
        <SectionTitle>로그인</SectionTitle>

        <ContentSection>
          <InputSection>
            <Input
              label="이메일"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력해주세요."
            />
            <Input
              label="비밀번호"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요."
            />
          </InputSection>

          <ButtonSection>
            <Button variant="primary" onClick={handleLogin}>
              로그인
            </Button>
            <Button variant="secondary" onClick={handleSignup}>
              회원가입
            </Button>
          </ButtonSection>
        </ContentSection>
      </ContentWrapper>
    </Section>
  );
}

const Section = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  max-width: 340px;
  padding: 0 20px;
  margin: auto;
  box-sizing: border-box;
  align-items: center;
`;

const SectionTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes[32]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.black[900]};
  line-height: ${({ theme }) => theme.lineHeights.base};
  letter-spacing: -1%;
  margin: 0;
  white-space: nowrap;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  align-self: stretch;
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  align-self: stretch;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  align-self: stretch;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.black[900]};
`;

const StyledInput = styled.input`
  display: flex;
  padding: 10px 14px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.black[300]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-family: "Pretendard Variable";
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #e69754;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.black[500]};
  }
`;

const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

const StyledButton = styled.button<{ variant: "primary" | "secondary" }>`
  display: flex;
  padding: 10px 14px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: "Pretendard Variable";
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 150%;
  letter-spacing: -0.14px;

  ${({ variant, theme }) =>
    variant === "primary"
      ? `
        background: ${theme.colors.black[900]};
        color: ${theme.colors.black[100]};
        border: 1px solid ${theme.colors.black[900]};
      `
      : `
        background: ${theme.colors.white};
        color: ${theme.colors.black[900]};
        border: 1px solid ${theme.colors.black[900]};
      `}
`;
