import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Headerv2 from "../shared/ui/header/HeaderV2";
import {
  getToken,
  postLogin,
  setToken,
  setRefreshToken,
  postCheckEmail,
} from "../apis/auth/auth.api";
import { postUser } from "../apis/user/user.api";
import { PATH } from "../shared/routes/constants";

const formatPhoneNumber = (value: string) => {
  return value.replace(/\D/g, "").slice(0, 11);
};

const ERROR_MSG_MAP: Record<string, string> = {
  "not a valid email": "올바른 이메일 형식이 아닙니다.",
};

const parseApiError = (body: {
  detail: string | Array<{ loc: (string | number)[]; msg: string }>;
}): string => {
  if (typeof body.detail === "string") return body.detail;
  if (Array.isArray(body.detail) && body.detail.length > 0) {
    const first = body.detail[0];
    const matched = Object.entries(ERROR_MSG_MAP).find(([key]) =>
      first.msg.includes(key),
    );
    if (matched) return matched[1];
  }
  return "회원가입에 실패했습니다. 다시 시도해주세요.";
};

const Input = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  autoComplete?: string;
}) => (
  <InputWrapper>
    <Label htmlFor={id}>{label}</Label>
    <StyledInput
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
    />
  </InputWrapper>
);

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [emailChecked, setEmailChecked] = useState(false);
  const [emailCheckMessage, setEmailCheckMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (getToken()) navigate(PATH.HOME_V2, { replace: true });
  }, [navigate]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailChecked(false);
    setEmailCheckMessage("");
  };

  const handleCheckEmail = async () => {
    if (!email) {
      setEmailCheckMessage("이메일을 입력해주세요.");
      return;
    }

    try {
      await postCheckEmail({ email });
      setEmailChecked(true);
      setEmailCheckMessage("사용 가능한 이메일입니다.");
    } catch (err) {
      setEmailChecked(false);
      if (err instanceof Response) {
        try {
          const body = await err.json();
          setEmailCheckMessage(parseApiError(body));
        } catch {
          setEmailCheckMessage("이메일 확인에 실패했습니다.");
        }
      } else {
        setEmailCheckMessage("이메일 확인에 실패했습니다.");
      }
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(formatPhoneNumber(e.target.value));
  };

  const handleSignup = async () => {
    if (
      !email ||
      !password ||
      !passwordConfirm ||
      !lastName ||
      !firstName ||
      !phoneNumber
    ) {
      setError("모든 필수 항목을 입력해주세요.");
      return;
    }

    if (!emailChecked) {
      setError("이메일 중복 확인을 해주세요.");
      return;
    }

    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await postUser({
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        email,
        password,
      });

      const loginResponse = await postLogin({ email, password });
      setToken(loginResponse.access_token);
      setRefreshToken(loginResponse.refresh_token);
      queryClient.invalidateQueries(["auth"]);
      navigate(PATH.HOME_V2);
    } catch (err) {
      if (err instanceof Response) {
        try {
          const body = await err.json();
          setError(parseApiError(body));
        } catch {
          setError("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
      } else {
        setError("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section>
      <Headerv2 />
      <ContentWrapper>
        <SectionTitle>회원가입</SectionTitle>

        <ContentSection
          as="form"
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            handleSignup();
          }}
        >
          <InputSection>
            <InputWrapper>
              <Label htmlFor="signup-email">이메일</Label>
              <EmailRow>
                <StyledInput
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="이메일을 입력해주세요."
                  autoComplete="email"
                />
                <CheckButton type="button" onClick={handleCheckEmail}>
                  중복 확인
                </CheckButton>
              </EmailRow>
              {emailCheckMessage && (
                <CheckMessage $success={emailChecked}>
                  {emailCheckMessage}
                </CheckMessage>
              )}
            </InputWrapper>
            <Input
              label="비밀번호"
              id="signup-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요."
              autoComplete="new-password"
            />
            <Input
              label="비밀번호 확인"
              id="signup-password-confirm"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="비밀번호를 다시 입력해주세요."
              autoComplete="new-password"
            />
            <NameRow>
              <InputWrapper>
                <Label htmlFor="signup-last-name">성</Label>
                <StyledInput
                  id="signup-last-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="성"
                  autoComplete="family-name"
                />
              </InputWrapper>
              <InputWrapper>
                <Label htmlFor="signup-first-name">이름</Label>
                <StyledInput
                  id="signup-first-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="이름"
                  autoComplete="given-name"
                />
              </InputWrapper>
            </NameRow>
            <InputWrapper>
              <Label htmlFor="signup-phone">전화번호</Label>
              <StyledInput
                id="signup-phone"
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="01012345678"
                autoComplete="tel"
              />
            </InputWrapper>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </InputSection>

          <ButtonSection>
            <StyledButton type="submit" disabled={isLoading}>
              {isLoading ? "가입 중..." : "회원가입"}
            </StyledButton>
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
  letter-spacing: -0.01em;
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

const NameRow = styled.div`
  display: flex;
  gap: 10px;
  align-self: stretch;

  & > div {
    flex: 1;
    min-width: 0;
  }
`;

const EmailRow = styled.div`
  display: flex;
  gap: 8px;
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
  flex: 1;
  min-width: 0;
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

const CheckButton = styled.button`
  padding: 10px 14px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.black[900]};
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSizes[13]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-family: "Pretendard Variable";
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.black[100]};
  }
`;

const CheckMessage = styled.p<{ $success: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes[13]};
  color: ${({ $success, theme }) =>
    $success ? theme.colors.green : theme.colors.pink};
  margin: 0;
`;

const ErrorMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSizes[13]};
  color: ${({ theme }) => theme.colors.pink};
  margin: 0;
`;

const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

const StyledButton = styled.button`
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
  background: ${({ theme }) => theme.colors.black[900]};
  color: ${({ theme }) => theme.colors.black[100]};
  border: 1px solid ${({ theme }) => theme.colors.black[900]};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
