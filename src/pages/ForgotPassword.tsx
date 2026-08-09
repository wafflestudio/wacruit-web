import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Headerv2 from "../shared/ui/header/HeaderV2";
import { useRouteNavigation } from "../shared/routes/useRouteNavigation";
import {
  postPasswordResetEmail,
  postPasswordReset,
  postPasswordResetVerify,
} from "../apis/auth/auth.api";

type Step = 1 | 2 | 3 | 4;

const parseApiError = (err: unknown, fallback: string): Promise<string> => {
  if (err instanceof Response) {
    return err
      .json()
      .then((body: { detail: string | { msg: string }[] }) => {
        if (typeof body.detail === "string") return body.detail;
        if (Array.isArray(body.detail)) return body.detail[0]?.msg ?? fallback;
        return fallback;
      })
      .catch(() => fallback);
  }
  return Promise.resolve(fallback);
};

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

export default function ForgotPassword() {
  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [timerActive, setTimerActive] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { toLogin } = useRouteNavigation();

  useEffect(() => {
    if (!timerActive) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timerActive]);

  const startTimer = () => {
    setTimeLeft(300);
    setTimerActive(false);
    setTimeout(() => setTimerActive(true), 0);
  };

  const handleSendCode = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError("이메일을 입력해주세요.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("올바른 이메일 주소를 입력해주세요.");
      return;
    }
    setEmail(trimmedEmail);
    setIsLoading(true);
    setError("");
    try {
      await postPasswordResetEmail({ email: trimmedEmail });
      startTimer();
      setStep(2);
    } catch (err) {
      setError(
        await parseApiError(
          err,
          "이메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.",
        ),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setError("");
    try {
      await postPasswordResetEmail({ email });
      setCode("");
      startTimer();
    } catch (err) {
      setError(
        await parseApiError(
          err,
          "이메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.",
        ),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (code.length !== 6) {
      setError("인증 번호 6자리를 입력해주세요.");
      return;
    }
    if (!/^\d+$/.test(code)) {
      setError("인증 번호는 숫자만 입력해주세요.");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      await postPasswordResetVerify({ email, code });
      setStep(3);
    } catch (err) {
      setError(
        await parseApiError(err, "인증에 실패했습니다. 다시 시도해주세요."),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword.length < 8 || newPassword.length > 50) {
      setError("비밀번호는 8자 이상 50자 이하로 입력해주세요.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      await postPasswordReset({ email, code, new_password: newPassword });
      setStep(4);
    } catch (err) {
      setError(
        await parseApiError(
          err,
          "비밀번호 변경에 실패했습니다. 다시 시도해주세요.",
        ),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section>
      <Headerv2 />
      <ContentWrapper>
        {step === 1 && (
          <>
            <SectionTitle>비밀번호 찾기</SectionTitle>
            <ContentSection
              as="form"
              onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                void handleSendCode();
              }}
            >
              <InputSection>
                <InputWrapper>
                  <Label htmlFor="forgot-email">이메일</Label>
                  <StyledInput
                    id="forgot-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="가입한 이메일을 입력해주세요."
                    autoComplete="email"
                  />
                </InputWrapper>
                {error && <ErrorMessage>{error}</ErrorMessage>}
              </InputSection>
              <ButtonSection>
                <StyledButton
                  type="submit"
                  $variant="primary"
                  disabled={isLoading}
                >
                  {isLoading ? "전송 중..." : "인증 번호 받기"}
                </StyledButton>
              </ButtonSection>
            </ContentSection>
          </>
        )}

        {step === 2 && (
          <>
            <SectionTitle>인증 번호 확인</SectionTitle>
            <ContentSection
              as="form"
              onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                void handleVerifyCode();
              }}
            >
              <InputSection>
                <GuideText>
                  <strong>{email}</strong>로 인증 번호를 전송했습니다.
                </GuideText>
                <InputWrapper>
                  <Label htmlFor="forgot-code">인증 번호</Label>
                  <StyledInput
                    id="forgot-code"
                    type="text"
                    inputMode="numeric"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="6자리 숫자를 입력해주세요."
                    maxLength={6}
                    autoComplete="one-time-code"
                  />
                </InputWrapper>
                <TimerRow>
                  <TimerText>{formatTime(timeLeft)}</TimerText>
                  <ResendButton
                    type="button"
                    onClick={() => void handleResendCode()}
                    disabled={timerActive || isLoading}
                  >
                    인증 번호 다시 받기
                  </ResendButton>
                </TimerRow>
                {error && <ErrorMessage>{error}</ErrorMessage>}
              </InputSection>
              <ButtonSection>
                <StyledButton
                  type="submit"
                  $variant="primary"
                  disabled={isLoading}
                >
                  {isLoading ? "확인 중..." : "인증하기"}
                </StyledButton>
              </ButtonSection>
            </ContentSection>
          </>
        )}

        {step === 3 && (
          <>
            <SectionTitle>새 비밀번호 설정</SectionTitle>
            <ContentSection
              as="form"
              onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                void handleResetPassword();
              }}
            >
              <InputSection>
                <InputWrapper>
                  <Label htmlFor="forgot-new-password">새 비밀번호</Label>
                  <StyledInput
                    id="forgot-new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="8자 이상 50자 이하로 입력해주세요."
                    autoComplete="new-password"
                  />
                </InputWrapper>
                <InputWrapper>
                  <Label htmlFor="forgot-confirm-password">비밀번호 확인</Label>
                  <StyledInput
                    id="forgot-confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="비밀번호를 다시 입력해주세요."
                    autoComplete="new-password"
                  />
                </InputWrapper>
                {error && <ErrorMessage>{error}</ErrorMessage>}
              </InputSection>
              <ButtonSection>
                <StyledButton
                  type="submit"
                  $variant="primary"
                  disabled={isLoading}
                >
                  {isLoading ? "변경 중..." : "비밀번호 변경"}
                </StyledButton>
              </ButtonSection>
            </ContentSection>
          </>
        )}

        {step === 4 && (
          <>
            <SectionTitle>변경 완료</SectionTitle>
            <ContentSection>
              <SuccessMessage>
                비밀번호가 성공적으로 변경되었습니다.
              </SuccessMessage>
              <ButtonSection>
                <StyledButton
                  type="button"
                  $variant="primary"
                  onClick={toLogin}
                >
                  로그인하러 가기
                </StyledButton>
              </ButtonSection>
            </ContentSection>
          </>
        )}
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
  gap: 24px;
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

const StyledButton = styled.button<{ $variant: "primary" | "secondary" }>`
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

  ${({ $variant, theme }) =>
    $variant === "primary"
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSizes[13]};
  color: ${({ theme }) => theme.colors.pink};
  margin: 0;
  align-self: stretch;
  text-align: center;
`;

const GuideText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes[14]};
  color: ${({ theme }) => theme.colors.black[700]};
  margin: 0;
  line-height: 1.6;
  align-self: stretch;
  text-align: center;

  strong {
    display: block;
    word-break: break-all;
  }
`;

const TimerRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const TimerText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes[13]};
  color: ${({ theme }) => theme.colors.black[500]};
  font-variant-numeric: tabular-nums;
`;

const ResendButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: ${({ theme }) => theme.fontSizes[13]};
  color: ${({ theme }) => theme.colors.black[700]};
  text-decoration: underline;
  cursor: pointer;
  font-family: "Pretendard Variable";

  &:disabled {
    color: ${({ theme }) => theme.colors.black[300]};
    cursor: not-allowed;
    text-decoration: none;
  }
`;

const SuccessMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSizes[14]};
  color: ${({ theme }) => theme.colors.black[700]};
  margin: 0;
  line-height: 1.6;
  align-self: stretch;
`;
