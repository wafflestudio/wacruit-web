import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserRegisterRequest } from "../types/apiTypes";
import { useEffect, useState } from "react";
import { postUser } from "../apis/user";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/home/Header/Header";
import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "../apis/auth";

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
    queryFn: () =>
      checkAuth()
        .then((res) =>
          res === "invalid" ? Promise.reject("invalid") : Promise.resolve(res),
        )
        .catch((e) => Promise.reject(e)),
    retry: 2,
  });

  useEffect(() => {
    if (!isLoading) {
      if (error) {
        alert("문제가 발생했습니다. 다시 로그인을 시도해주세요.");
        navigate("/");
        return;
      }
      if (ssoState) {
        if (ssoState === "need_register") {
          setNeedRegister(true);
          return;
        }
        void queryClient.invalidateQueries(["auth"]);
        navigate(getRedirectPath(params.recruit_id ?? "home"));
        return;
      }
    }
  }, [params.recruit_id, ssoState, error, isLoading, navigate, queryClient]);

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
  padding: 0 6rem;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 2rem;
`;

const RegisterIcon = styled.img`
  margin-top: 4.8rem;
  margin-bottom: 2rem;
  align-self: center;
`;

const RegisterTitle = styled.div`
  color: #1e1e1e;
  text-align: center;
  font-size: 3.2rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 1.6rem;
`;

const NameInput = styled.div`
  display: flex;
  gap: 2rem;
  > input {
    width: 15rem;
    height: 4rem;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 160%; /* 2.56rem */
    letter-spacing: 0.064rem;
    border-radius: 0.2rem;
    border: 0.1rem solid #404040;
    background: #fff;
    padding: 0.7rem 1.2rem;
    &::placeholder {
      color: #d9d9d9;
    }
  }
`;

const RegisterLabel = styled.div`
  margin-top: 1.6rem;
  margin-bottom: 0.6rem;
  color: #404040;
  font-size: 2rem;
  font-weight: 400;
  line-height: 160%; /* 3.2rem */
  letter-spacing: 0.08rem;
`;
const RegisterInput = styled.input`
  width: 32rem;
  height: 4rem;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 160%; /* 2.56rem */
  letter-spacing: 0.064rem;
  border-radius: 0.2rem;
  border: 0.1rem solid #404040;
  background: #fff;
  padding: 0.7rem 1.2rem;
  &::placeholder {
    color: #d9d9d9;
  }
`;
const RegisterCaution = styled.div`
  margin-top: 1.7rem;
  color: #969696;
  font-size: 1rem;
  font-weight: 400;
  line-height: 160%; /* 1.6rem */
  letter-spacing: 0.04rem;
  align-self: center;
  margin-bottom: 10.3rem;
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
  height: 6.8rem;
  justify-content: center;
  align-items: center;
  color: white;
  color: #fff;
  font-size: 1.8rem;
  font-weight: 600;
  letter-spacing: 0.09rem;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  cursor: pointer;
`;
