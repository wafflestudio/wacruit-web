import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserRegisterRequest } from "../types/apiTypes";
import { useEffect, useState } from "react";
import { postUser } from "../apis/user";
import { checkSSO } from "../apis/auth";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/home/Header/Header";
import { useQuery } from "@tanstack/react-query";

const getRedirectPath = (to: string) => {
  if (to === "home") {
    return "/";
  } else {
    return `/recruiting/${to}`;
  }
};

export default function Sso() {
  const navigate = useNavigate();
  const params = useParams();
  const queryClient = useQueryClient();
  const [needRegister, setNeedRegister] = useState(false);
  const [registerInput, setRegisterInput] = useState<UserRegisterRequest>({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  });
  const { mutate } = useMutation(
    (input: UserRegisterRequest) => postUser(input),
    {
      onSuccess: () => {
        void queryClient.invalidateQueries(["auth"]);
        navigate(getRedirectPath(params.recruit_id ?? "home"));
      },
    },
  );

  const {
    data: ssoState,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["sso"],
    queryFn: () => checkSSO(),
    retry: 4,
  });

  useEffect(() => {
    if (!isLoading) {
      if (error) {
        alert("로그인 정보가 잘못되었습니다.");
        navigate("/");
        return;
      }
      if (!ssoState) {
        setNeedRegister(true);
        return;
      }
      if (ssoState) {
        void queryClient.invalidateQueries(["auth"]);
        navigate(getRedirectPath(params.recruit_id ?? "home"));
        return;
      }
    }
  }, [params.recruit_id, ssoState, error, isLoading]);

  return (
    <>
      <Header />
      <RegisterContainer>
        {!needRegister ? (
          <div />
        ) : (
          <RegisterForm
            onSubmit={(e) => {
              e.preventDefault();
              for (const key in registerInput) {
                if (registerInput[key as keyof typeof registerInput] === "") {
                  alert("모든 항목을 입력해주세요.");
                  return;
                }
              }
              if (!registerInput.email.includes("@")) {
                alert("이메일 형식이 올바르지 않습니다.");
                return;
              }
              mutate(registerInput);
            }}
          >
            <RegisterIcon src={"/icon/register/Register.svg"} />
            <RegisterTitle>추가 정보 입력</RegisterTitle>
            <RegisterLabel>이름</RegisterLabel>
            <NameInput>
              <RegisterInput
                type="text"
                value={registerInput.last_name}
                placeholder="김"
                onChange={(e) =>
                  setRegisterInput({
                    ...registerInput,
                    last_name: e.target.value,
                  })
                }
              />
              <RegisterInput
                type="text"
                value={registerInput.first_name}
                placeholder="와플"
                onChange={(e) =>
                  setRegisterInput({
                    ...registerInput,
                    first_name: e.target.value,
                  })
                }
              />
            </NameInput>
            <RegisterLabel>이메일</RegisterLabel>
            <RegisterInput
              type="text"
              value={registerInput.email}
              placeholder="example@gmail.com"
              onChange={(e) =>
                setRegisterInput({ ...registerInput, email: e.target.value })
              }
            />
            <RegisterLabel>전화번호</RegisterLabel>
            <RegisterInput
              type="text"
              value={registerInput.phone_number}
              placeholder="01012345678"
              onChange={(e) =>
                setRegisterInput({
                  ...registerInput,
                  phone_number: e.target.value,
                })
              }
            />
            <RegisterCaution>
              전화번호와 이메일 주소는 연락 및 공지 목적으로 쓰입니다.
            </RegisterCaution>
            <RegisterSubmit
              $active={!Object.values(registerInput).includes("")}
              type="submit"
              value="완료"
            />
          </RegisterForm>
        )}
      </RegisterContainer>
    </>
  );
}

const RegisterContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: gray;
`;

const RegisterForm = styled.form`
  position: relative;
  padding: 0 60px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 20px;
`;

const RegisterIcon = styled.img`
  margin-top: 48px;
  margin-bottom: 20px;
  align-self: center;
`;

const RegisterTitle = styled.div`
  color: #1e1e1e;
  text-align: center;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 16px;
`;

const NameInput = styled.div`
  display: flex;
  gap: 20px;
  > input {
    width: 150px;
    height: 40px;
    font-size: 16px;
    font-weight: 400;
    line-height: 160%; /* 25.6px */
    letter-spacing: 0.64px;
    border-radius: 2px;
    border: 1px solid #404040;
    background: #fff;
    padding: 7px 12px;
    &::placeholder {
      color: #d9d9d9;
    }
  }
`;

const RegisterLabel = styled.div`
  margin-top: 16px;
  margin-bottom: 6px;
  color: #404040;
  font-size: 20px;
  font-weight: 400;
  line-height: 160%; /* 32px */
  letter-spacing: 0.8px;
`;
const RegisterInput = styled.input`
  width: 320px;
  height: 40px;
  font-size: 16px;
  font-weight: 400;
  line-height: 160%; /* 25.6px */
  letter-spacing: 0.64px;
  border-radius: 2px;
  border: 1px solid #404040;
  background: #fff;
  padding: 7px 12px;
  &::placeholder {
    color: #d9d9d9;
  }
`;
const RegisterCaution = styled.div`
  margin-top: 17px;
  color: #969696;
  font-size: 10px;
  font-weight: 400;
  line-height: 160%; /* 16px */
  letter-spacing: 0.4px;
  align-self: center;
  margin-bottom: 103px;
`;

const RegisterSubmit = styled.input<{
  $active: boolean;
}>`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  border: none;
  background: ${(props) => (props.$active ? "#F0745F" : "#d9d9d9")};
  display: flex;
  height: 68px;
  justify-content: center;
  align-items: center;
  color: white;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.9px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  cursor: pointer;
`;
