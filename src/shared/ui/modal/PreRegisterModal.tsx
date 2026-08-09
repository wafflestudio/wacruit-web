import { FormEvent, useState } from "react";
import styled from "styled-components";
import { usePreRegisterQuery } from "../../../apis/preregister/preregister.query";
import { PreRegisterUserCreate } from "../../../apis/preregister/preregister.types";

type Field = {
  name: keyof PreRegisterUserCreate;
  label: string;
  placeholder: string;
  type: "text" | "email" | "tel";
  maxLength: number;
  required: boolean;
};

const FIELDS: Field[] = [
  {
    name: "name",
    label: "이름",
    placeholder: "홍길동",
    type: "text",
    maxLength: 50,
    required: true,
  },
  {
    name: "email",
    label: "메일",
    placeholder: "waffle@wafflestudio.com",
    type: "email",
    maxLength: 100,
    required: true,
  },
  {
    name: "phone_number",
    label: "전화번호",
    placeholder: "010-1234-5678",
    type: "tel",
    maxLength: 30,
    required: true,
  },
  {
    name: "university",
    label: "대학교",
    placeholder: "서울대학교",
    type: "text",
    maxLength: 50,
    required: false,
  },
  {
    name: "college",
    label: "단과대",
    placeholder: "공과대학",
    type: "text",
    maxLength: 50,
    required: false,
  },
  {
    name: "department",
    label: "전공",
    placeholder: "컴퓨터공학부",
    type: "text",
    maxLength: 50,
    required: false,
  },
];

// 선택 항목도 입력값 자체는 빈 문자열로 들고 있다가 전송할 때만 걸러낸다
type FormValues = Record<keyof PreRegisterUserCreate, string>;

const EMPTY_FORM: FormValues = {
  name: "",
  email: "",
  phone_number: "",
  university: "",
  college: "",
  department: "",
};

export const PreRegisterModal = ({
  generation,
  onClose,
}: {
  generation: string;
  onClose: () => void;
}) => {
  const [form, setForm] = useState(EMPTY_FORM);

  const { usePostPreRegisterUser } = usePreRegisterQuery();
  const { mutate, isLoading, isSuccess, isError } = usePostPreRegisterUser();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    // 비어 있는 선택 항목은 undefined가 되어 JSON에서 통째로 빠진다
    const optional = (value: string) => value.trim() || undefined;

    mutate({
      name: form.name.trim(),
      email: form.email.trim(),
      phone_number: form.phone_number.trim(),
      university: optional(form.university),
      college: optional(form.college),
      department: optional(form.department),
    });
  };

  if (isSuccess) {
    return (
      <Article>
        <SuccessHeader>
          <Title>모집 알림 신청이 완료되었어요!</Title>
          <Description>
            {generation}기 모집이 시작되면 입력해주신 메일로 알려드릴게요.
          </Description>
        </SuccessHeader>
        <SubmitButton type="button" onClick={onClose}>
          확인
        </SubmitButton>
      </Article>
    );
  }

  return (
    <Article as="form" onSubmit={onSubmit}>
      <Header>
        <TitleRow>
          <Title>루키 모집 알림 신청</Title>
          <CloseButton
            type="button"
            onClick={onClose}
            disabled={isLoading}
            aria-label="닫기"
          >
            <img src="/icon/CloseModal.svg" alt="" />
          </CloseButton>
        </TitleRow>
        <Description>
          {generation}기 모집이 시작되면 메일로 알림을 드려요.
        </Description>
      </Header>
      <FieldGroup>
        {FIELDS.map(
          ({ name, label, placeholder, type, maxLength, required }) => (
            <Label key={name}>
              <span>
                {label}
                {required && <RequiredMark aria-hidden="true">*</RequiredMark>}
              </span>
              <input
                name={name}
                value={form[name]}
                onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                placeholder={placeholder}
                type={type}
                maxLength={maxLength}
                disabled={isLoading}
                required={required}
              />
            </Label>
          ),
        )}
      </FieldGroup>
      {isError && (
        <ErrorMessage>
          모집 알림 신청에 실패했어요. 잠시 후 다시 시도해주세요.
        </ErrorMessage>
      )}
      <SubmitButton type="submit" disabled={isLoading}>
        {isLoading ? "등록 중..." : "완료"}
      </SubmitButton>
    </Article>
  );
};

const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 44rem;
  max-width: calc(100vw - 4rem);
  max-height: calc(100vh - 8rem);
  overflow-y: auto;
  padding: 3.2rem;
  border-radius: 1.6rem;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black[900]};
  text-align: left;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const SuccessHeader = styled(Header)`
  gap: 1rem;
  text-align: center;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
`;

const CloseButton = styled.button`
  display: flex;
  flex-shrink: 0;
  width: 2.8rem;
  height: 2.8rem;
  margin-right: -0.6rem;
  /* 기하학적 중앙보다 살짝 내려와 보여 2px 올린다 */
  position: relative;
  top: -0.2rem;
  border-radius: 0.4rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  img {
    width: 100%;
    height: 100%;
  }

  &:hover:enabled {
    background-color: ${({ theme }) => theme.colors.black[100]};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes[24]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.lineHeights.base};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes[16]};
  color: ${({ theme }) => theme.colors.black[700]};
  line-height: ${({ theme }) => theme.lineHeights.base};
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  input {
    height: 4rem;
    padding: 0 1.2rem;
    border: 1px solid ${({ theme }) => theme.colors.black[300]};
    border-radius: 0.4rem;
    background-color: ${({ theme }) => theme.colors.black[100]};
    font-size: ${({ theme }) => theme.fontSizes[14]};
  }

  input::placeholder {
    color: ${({ theme }) => theme.colors.black[500]};
  }

  input:focus {
    border-color: ${({ theme }) => theme.colors.black[700]};
    outline: none;
  }

  input:disabled {
    color: ${({ theme }) => theme.colors.black[500]};
  }
`;

const RequiredMark = styled.span`
  margin-left: 0.2rem;
  color: ${({ theme }) => theme.colors.pink};
`;

const ErrorMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSizes[13]};
  color: ${({ theme }) => theme.colors.pink};
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1.2rem 0;
  border-radius: 0.4rem;
  background-color: ${({ theme }) => theme.colors.black[900]};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes[16]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover:enabled {
    background-color: ${({ theme }) => theme.colors.black[700]};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
